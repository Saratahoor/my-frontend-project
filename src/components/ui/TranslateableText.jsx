import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "../../hooks/TranslationContext";

function TranslatableText({ children }) {
  const [translatedText, setTranslatedText] = useState(children);
  const [isLoading, setIsLoading] = useState(false);

  const { currentLanguage, translateContent } = useTranslation();

  useEffect(() => {
    const handleTranslation = async () => {
      if (currentLanguage !== "en") {
        try {
          setIsLoading(true);
          const response = await translateContent(children);
          const translatedContent =
            response.pipelineResponse[0].output[0].target;
          setTranslatedText(translatedContent);
        } catch (error) {
          console.error("Translation error:", error);
          setTranslatedText(children);
        } finally {
          setIsLoading(false);
        }
      } else {
        setTranslatedText(children);
      }
    };

    handleTranslation();
  }, [currentLanguage, children, translateContent]);

  return (
    <div className="relative inline-block">
      {isLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative"
        >
          {/* Blurred original text */}
          <span className="blur-sm opacity-50">{children}</span>

          {/* Loading indicator */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-4 rounded-full border-2 border-blue-600 border-t-transparent animate-spin"></div>
          </div>
        </motion.div>
      ) : (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {translatedText}
        </motion.span>
      )}
    </div>
  );
}

export default TranslatableText;
