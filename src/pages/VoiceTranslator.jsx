import { useState } from "react";
import {
  FaMicrophone,
  FaVolumeUp,
  FaPlus,
  FaTimes,
  FaCheck,
} from "react-icons/fa";

const languages = [
  { code: "en", name: "English" },
  { code: "kn", name: "Kannada" },
  { code: "hi", name: "Hindi" },
  { code: "te", name: "Telugu" },
  { code: "ta", name: "Tamil" },
  { code: "ml", name: "Malayalam" },
  { code: "mr", name: "Marathi" },
  { code: "gu", name: "Gujarati" },
  { code: "bn", name: "Bengali" },
  { code: "pa", name: "Punjabi" },
  { code: "ur", name: "Urdu" },
];

function VoiceTranslator() {
  const [translators, setTranslators] = useState([]);

  const addTranslator = () => {
    setTranslators([
      ...translators,
      {
        id: Date.now(),
        sourceText: "",
        translatedText: "",
        sourceLang: "en",
        targetLang: "kn",
        isConfirmed: false, // Add this field
      },
    ]);
  };

  const handleConfirm = (id) => {
    setTranslators(
      translators.map((t) => {
        if (t.id === id) {
          // Log the selected languages
          const sourceLang = languages.find(
            (l) => l.code === t.sourceLang
          )?.name;
          const targetLang = languages.find(
            (l) => l.code === t.targetLang
          )?.name;
          console.log(`Confirmed Translation: ${sourceLang} to ${targetLang}`);

          return { ...t, isConfirmed: true };
        }
        return t;
      })
    );
  };

  const handleLanguageChange = (id, type, value) => {
    setTranslators(
      translators.map((t) => (t.id === id ? { ...t, [type]: value } : t))
    );
  };

  const removeTranslator = (id) => {
    setTranslators(translators.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-orange-500 via-white to-green-500 py-8">
      <div className="max-w-6xl mt-20 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Samvaad</h1>
          <strong className="text-gray-600">
            Empowering multilingual dialogue for inclusive mediation.{" "}
          </strong>
        </div>

        {/* Add Voice Component Button */}
        <button
          onClick={addTranslator}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-sm mb-6"
        >
          <FaPlus /> Add Voice Component
        </button>

        {/* Translators Container */}
        <div className="space-y-6">
          {translators.map((translator) => (
            <div
              key={translator.id}
              className="relative backdrop-blur-sm bg-white/30 rounded-2xl shadow-lg border border-white/50 p-4 space-y-4"
            >
              {/* Close button - Fixed positioning */}
              <button
                onClick={() =>
                  translator.isConfirmed
                    ? removeTranslator(translator.id)
                    : handleConfirm(translator.id)
                }
                className={`absolute top-1 right-1 z-10 p-1 rounded-full transition-colors ${
                  translator.isConfirmed
                    ? "bg-white/50 hover:bg-red-100"
                    : "bg-white/50 hover:bg-green-100"
                }`}
              >
                {translator.isConfirmed ? (
                  <FaTimes className="text-gray-600 hover:text-red-700" />
                ) : (
                  <FaCheck className="text-gray-600 hover:text-green-700" />
                )}
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Source text container */}
                <div className="space-y-2">
                  <select
                    value={translator.sourceLang}
                    onChange={(e) =>
                      handleLanguageChange(
                        translator.id,
                        "sourceLang",
                        e.target.value
                      )
                    }
                    disabled={translator.isConfirmed}
                    className={`w-full bg-white/50 backdrop-blur-sm text-gray-700 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      translator.isConfirmed
                        ? "opacity-75 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                  <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 min-h-[200px] relative border border-gray-200">
                    <textarea
                      className="w-full h-full bg-transparent text-gray-700 resize-none outline-none"
                      placeholder="Enter text"
                      value={translator.sourceText}
                    />
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      <button className="p-2 hover:bg-white/80 rounded-full transition-colors shadow-sm">
                        <FaMicrophone className="text-blue-600" />
                      </button>
                      <button className="p-2 hover:bg-white/80 rounded-full transition-colors shadow-sm">
                        <FaVolumeUp className="text-blue-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Target text container */}
                <div className="space-y-2">
                  <select
                    value={translator.targetLang}
                    onChange={(e) =>
                      handleLanguageChange(
                        translator.id,
                        "targetLang",
                        e.target.value
                      )
                    }
                    disabled={translator.isConfirmed}
                    className={`w-full bg-white/50 backdrop-blur-sm text-gray-700 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      translator.isConfirmed
                        ? "opacity-75 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                  <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 min-h-[200px] relative border border-gray-200">
                    <textarea
                      className="w-full h-full bg-transparent text-gray-700 resize-none outline-none"
                      placeholder="Translation"
                      value={translator.translatedText}
                      readOnly
                    />
                    <div className="absolute bottom-4 right-4">
                      <button className="p-2 hover:bg-white/80 rounded-full transition-colors shadow-sm">
                        <FaMicrophone className="text-blue-600" />
                      </button>
                      <button className="p-2 hover:bg-white/80 rounded-full transition-colors shadow-sm">
                        <FaVolumeUp className="text-blue-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {translators.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              Click the "Add Voice Component" button to start
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default VoiceTranslator;
