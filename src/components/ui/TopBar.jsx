import { useState, useRef, useEffect } from "react";
import { useTranslation } from "../../hooks/TranslationContext";
import { IoLanguage } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी" },
  { code: "kn", name: "ಕನ್ನಡ" },
  { code: "te", name: "తెలుగు" },
  { code: "ta", name: "தமிழ்" },
  { code: "bn", name: "বাংলা" },
  { code: "as", name: "অসমীযা়" },
  { code: "brx", name: "बड़ो" },
  { code: "gu", name: "ગુજરાતી" },
  { code: "ml", name: "മലയാളം" },
  { code: "mni", name: "মৈতৈলোন্" },
  { code: "mr", name: "मराठी" },
  { code: "or", name: "ଓଡ଼ିଆ" },
  { code: "pa", name: "ਪੰਜਾਬੀ" },
];

function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { currentLanguage, setCurrentLanguage } = useTranslation();

  const currentLang = languages.find((lang) => lang.code === currentLanguage);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex items-center gap-2" ref={dropdownRef}>
      <img src="/bhashini-logo.png" alt="Bhashini Logo" className="h-[50px]" />
      <IoLanguage className="text-gray-700 text-xl" />

      <div className="relative">
        <div className="flex flex-row items-center justify-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex w-[150px] items-center justify-between bg-white/80 backdrop-blur-sm text-gray-700 font-medium 
           py-2 px-4 rounded-lg border-2 border-orange-400 hover:border-green-400 
           transition-all duration-300 outline-none shadow-md hover:shadow-lg h-[40px]"
          >
            <span className="flex-1 text-center">{currentLang?.name}</span>
            <MdKeyboardArrowDown
              className={`transform transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {isOpen && (
          <div
            className="absolute top-full mt-1 w-[150px] max-h-[120px] overflow-y-auto z-50
                        bg-white rounded-lg shadow-xl border border-gray-200 py-1
                        scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-gray-100"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setCurrentLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-center hover:bg-orange-50 transition-colors
                           ${
                             currentLanguage === lang.code
                               ? "bg-orange-100"
                               : ""
                           }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LanguageSelector;
