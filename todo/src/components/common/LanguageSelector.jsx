
import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const LanguageSelector = () => {
  const { language, changeLanguage, availableLanguages, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = availableLanguages.find(
    (lang) => lang.code === language
  );

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 text-slate-700 dark:text-slate-200 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg"
      >
        <span className="text-lg">🌐</span>
        <span className="text-sm font-semibold bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
          {currentLanguage?.code.toUpperCase()}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-2 w-48 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-2xl shadow-2xl z-50 py-2">
            {availableLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  changeLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-all duration-200 ${
                  language === lang.code
                    ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
              >
                <span className="text-lg">{getLanguageFlag(lang.code)}</span>
                <div className="flex-1">
                  <div className="font-medium text-sm">{lang.nativeName}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {lang.name}
                  </div>
                </div>
                {language === lang.code && (
                  <svg
                    className="w-4 h-4 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Helper function for language flags
const getLanguageFlag = (code) => {
  const flags = {
    en: "🇺🇸",
    hi: "🇮🇳",
    es: "🇪🇸",
    fr: "🇫🇷"
  };
  return flags[code] || "🌐";
};

export default LanguageSelector;
