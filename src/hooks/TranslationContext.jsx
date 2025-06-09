import { createContext, useContext, useState } from "react";
import axios from "axios";

const BHASHINI_NMT_URL =
  "https://dhruva-api.bhashini.gov.in/services/inference/pipeline";

const BHASHINI_SERVICE_ID = import.meta.env.VITE_BHASHINI_SERVICE_ID;
const BHASHINI_AUTHORIZATION = import.meta.env.VITE_BHASHINI_AUTHORIZATION;

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [translations, setTranslations] = useState({});

  const translateContent = async (content) => {
    // try {
    //   const response = await axios.post(
    //     "http://localhost:3000/api/service/translate",
    //     {
    //       text: content,
    //       sourceLanguage: "en",
    //       targetLanguage: currentLanguage,
    //     }
    //   );
    //   return response.data;
    // } catch (error) {
    //   console.error("Translation error:", error);
    //   return content; // fallback to original content
    // }
    try {
      const response = await axios.post(
        BHASHINI_NMT_URL,
        {
          pipelineTasks: [
            {
              taskType: "translation",
              config: {
                language: {
                  sourceLanguage: "en",
                  targetLanguage: currentLanguage,
                },
                serviceId: BHASHINI_SERVICE_ID,
              },
            },
          ],
          inputData: {
            input: [
              {
                source: content,
              },
            ],
          },
        },
        {
          headers: {
            Authorization: BHASHINI_AUTHORIZATION,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Translation error:", error);
      throw error;
    }
  };

  return (
    <TranslationContext.Provider
      value={{
        currentLanguage,
        setCurrentLanguage,
        translations,
        setTranslations,
        translateContent,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
