import { useState } from "react";
import { useAudioRecorder } from "../hooks/useAudioRecorder";
import { FaMicrophone } from "react-icons/fa";

export default function AudioTest() {
  const [base64Data, setBase64Data] = useState(null);
  const { isRecording, startRecording, stopRecording } = useAudioRecorder();

  const handleRecording = async () => {
    if (!isRecording) {
      console.log("Starting recording...");
      try {
        await startRecording();
      } catch (error) {
        console.error("Start recording failed:", error);
      }
    } else {
      console.log("Manually stopping recording...");
      try {
        const base64Audio = await stopRecording();
        console.log(
          "Base64 Audio Data:",
          base64Audio?.substring(0, 100) + "..."
        );
        setBase64Data(base64Audio);
      } catch (error) {
        console.error("Stop recording failed:", error);
      }
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Audio Recorder Test</h1>

      <div className="space-y-4">
        <button
          onClick={handleRecording}
          className={`p-4 rounded-full ${
            isRecording
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white transition-colors`}
          title={
            isRecording ? "Click to stop recording" : "Click to start recording"
          }
        >
          <FaMicrophone
            className={`w-6 h-6 ${isRecording ? "animate-pulse" : ""}`}
          />
        </button>

        <div className="text-sm text-gray-600">
          Status:{" "}
          {isRecording ? "Recording... (Click mic to stop)" : "Not Recording"}
        </div>

        {base64Data && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <p className="font-mono text-sm break-all">
              Base64 Preview (first 100 chars):
              <br />
              {base64Data.substring(0, 100)}...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
