import { useState, useEffect } from "react";

function AnimatedResponse({ text }) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.split(" ").length) {
      const timer = setTimeout(() => {
        setDisplayedText(
          text
            .split(" ")
            .slice(0, currentIndex + 1)
            .join(" ")
        );
        setCurrentIndex(currentIndex + 1);
      }, 100); // Adjust this value to control speed (100ms is moderate)

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text]);

  return <span>{displayedText}</span>;
}

export default AnimatedResponse;
