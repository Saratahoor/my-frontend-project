const BHASHINI_AUTHORIZATION = import.meta.env.VITE_BHASHINI_AUTHORIZATION;

export async function apiInitializeMeetingScheduler() {
  const res = await fetch(
    "http://localhost:3000/api/service/initialize-meeting-scheduler",
    {
      method: "POST",
      credentials: "include",
    }
  );
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data;
}

export async function translateAudio(audioInput, sourceLang, targetLang) {
  try {
    // const base64Audio = await blobToBase64(audioBlob);
    const base64Audio =
      typeof audioInput === "string"
        ? audioInput
        : await blobToBase64(audioInput);
    const payload = {
      pipelineTasks: [
        {
          taskType: "asr",
          config: {
            language: {
              sourceLanguage: sourceLang,
            },
            audioFormat: "wav", // Updated to WAV
            samplingRate: 16000,
          },
        },
        {
          taskType: "translation",
          config: {
            language: {
              sourceLanguage: sourceLang,
              targetLanguage: targetLang,
            },
          },
        },
        {
          taskType: "tts",
          config: {
            language: {
              sourceLanguage: targetLang,
            },
            gender: "female",
            samplingRate: 8000,
          },
        },
      ],
      inputData: {
        audio: [
          {
            audioContent: base64Audio,
          },
        ],
      },
    };

    // Construct and log the curl command
    //     const curlCommand = `
    // curl -X POST https://dhruva-api.bhashini.gov.in/services/inference/pipeline \\
    // -H "Authorization: ${BHASHINI_AUTHORIZATION}" \\
    // -H "Content-Type: application/json" \\
    // -d '${JSON.stringify(payload, null, 2)}'
    //     `;
    //     console.log("Curl Request:", curlCommand);

    const response = await fetch(
      "https://dhruva-api.bhashini.gov.in/services/inference/pipeline",
      {
        method: "POST",
        headers: {
          Authorization: BHASHINI_AUTHORIZATION,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    if (
      !result ||
      !result.pipelineResponse ||
      result.pipelineResponse.length === 0
    ) {
      throw new Error("Invalid API response structure");
    }

    return result;
  } catch (error) {
    console.error("Translation error:", error);
    throw error;
  }
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
