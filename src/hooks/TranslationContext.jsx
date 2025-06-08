import { createContext, useContext, useState } from "react";
import axios from "axios";

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [translations, setTranslations] = useState({});

  const translateContent = async (content) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/service/translate",
        {
          text: content,
          sourceLanguage: "en",
          targetLanguage: currentLanguage,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Translation error:", error);
      return content; // fallback to original content
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
