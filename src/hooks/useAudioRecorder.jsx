import { useState, useRef } from "react";

async function convertToWav(audioBlob) {
  return new Promise(async (resolve, reject) => {
    try {
      // Create audio context with desired sample rate
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)({
        sampleRate: 16000, // Match API requirements
      });

      // Convert blob to array buffer
      const arrayBuffer = await audioBlob.arrayBuffer();

      // Decode the audio data
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      // Create WAV file
      const wavBuffer = audioBufferToWav(audioBuffer);
      const wavBlob = new Blob([wavBuffer], { type: "audio/wav" });

      resolve(wavBlob);
    } catch (error) {
      reject(error);
    }
  });
}

// New helper function to convert AudioBuffer to WAV
function audioBufferToWav(audioBuffer) {
  const numOfChan = audioBuffer.numberOfChannels;
  const length = audioBuffer.length * numOfChan * 2;
  const buffer = new ArrayBuffer(44 + length);
  const view = new DataView(buffer);
  const channels = [];
  let sample = 0;
  let offset = 0;
  let pos = 0;

  // Get channels
  for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
    channels.push(audioBuffer.getChannelData(i));
  }

  // Write WAV header
  writeString(view, 0, "RIFF");
  view.setUint32(4, 36 + length, true);
  writeString(view, 8, "WAVE");
  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numOfChan, true);
  view.setUint32(24, audioBuffer.sampleRate, true);
  view.setUint32(28, audioBuffer.sampleRate * 2 * numOfChan, true);
  view.setUint16(32, numOfChan * 2, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, "data");
  view.setUint32(40, length, true);

  // Write PCM samples
  for (let i = 0; i < audioBuffer.length; i++) {
    for (let channel = 0; channel < numOfChan; channel++) {
      sample = Math.max(-1, Math.min(1, channels[channel][i]));
      sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;
      view.setInt16(44 + pos, sample, true);
      pos += 2;
    }
  }

  return buffer;
}

// Helper function to write strings to DataView
function writeString(view, offset, string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

function exportWAV(buffer, sampleRate) {
  let numberOfChannels = buffer.numberOfChannels;
  let sampleLength = buffer.length;
  let bytes = new Uint8Array(44 + sampleLength * 2 * numberOfChannels);
  let view = new DataView(bytes.buffer);

  /* RIFF identifier */
  writeUTFBytes(view, 0, "RIFF");
  /* RIFF chunk length */
  view.setUint32(4, 44 + sampleLength * 2 * numberOfChannels - 8, true);

  /* RIFF type */
  writeUTFBytes(view, 8, "WAVE");
  /* format chunk identifier */
  writeUTFBytes(view, 12, "fmt ");
  /* format chunk length */
  view.setUint32(16, 16, true);
  /* sample format (raw) */
  view.setUint16(20, 1, true);
  /* channel count */
  view.setUint16(22, numberOfChannels, true);
  /* sample rate */
  view.setUint32(24, sampleRate, true);
  /* byte rate (sample rate * block align) */
  view.setUint32(28, sampleRate * 4, true);
  /* block align (channel count * bytes per sample) */
  view.setUint16(32, numberOfChannels * 2, true);
  /* bits per sample */
  view.setUint16(34, 16, true);
  /* data chunk identifier */
  writeUTFBytes(view, 36, "data");
  /* data chunk length */
  view.setUint32(40, sampleLength * 2 * numberOfChannels, true);

  floatTo16BitPCM(view, 44, buffer);

  return new Blob([bytes], { type: "audio/wav" });
}

function floatTo16BitPCM(output, offset, input) {
  for (let i = 0; i < input.length; i++, offset += 2) {
    let s = Math.max(-1, Math.min(1, input[i]));
    output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
}

function writeUTFBytes(view, offset, string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

export function useAudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });

      mediaRecorder.current = new MediaRecorder(stream, {
        mimeType: "audio/webm",
        audioBitsPerSecond: 128000,
      });

      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
      throw error;
    }
  };

  const stopRecording = () => {
    return new Promise((resolve, reject) => {
      if (
        !mediaRecorder.current ||
        mediaRecorder.current.state === "inactive"
      ) {
        reject(new Error("No recording in progress"));
        return;
      }

      mediaRecorder.current.onstop = async () => {
        try {
          // Create a Blob from the recently recorded chunks
          const audioBlob = new Blob(audioChunks.current, {
            type: "audio/webm",
          });

          // Convert to WAV
          const wavBlob = await convertToWav(audioBlob);

          // Create base64 from WAV
          const fileReader = new FileReader();
          fileReader.onloadend = () => {
            const base64Audio = fileReader.result.split(",")[1];
            resolve(base64Audio);
          };
          fileReader.onerror = reject;
          fileReader.readAsDataURL(wavBlob);

          // Clear for next recording
          audioChunks.current = [];
        } catch (error) {
          console.error("Conversion error:", error);
          reject(error);
        }
      };

      mediaRecorder.current.stop();
      setIsRecording(false);

      // Stop all tracks
      if (mediaRecorder.current.stream) {
        mediaRecorder.current.stream
          .getTracks()
          .forEach((track) => track.stop());
      }
    });
  };

  return {
    isRecording,
    startRecording,
    stopRecording,
  };
}
