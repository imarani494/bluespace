import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";

const Header = ({
  activeView,
  setActiveView,
  searchTerm,
  setSearchTerm,
  onAddTask
}) => {
  const { user, signOut } = useAuth();
  const {
    language,
    setLanguage,
    t,
    availableLanguages = [],
    currentLanguage
  } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  // Safe access to currentLanguage properties
  const safeCurrentLanguage = currentLanguage || {
    code: "en",
    flag: "🇺🇸",
    name: "English",
    nativeName: "English"
  };

  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-700/60 sticky top-0 z-40 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center space-x-8">
            {/* Enhanced Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-[#0ea5a4] to-[#6366f1] rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">TP</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
                  {t("app.name")}
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t("app.tagline")}
                </p>
              </div>
            </div>

            {/* Enhanced Navigation */}
            <nav className="hidden md:flex space-x-2">
              <button
                onClick={() => setActiveView("dashboard")}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  activeView === "dashboard"
                    ? "bg-[#0ea5a4]/10 text-[#0ea5a4] dark:text-[#0ea5a4] shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
                }`}
              >
                {t("ui.dashboard")}
              </button>
              <button
                onClick={() => setActiveView("tasks")}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  activeView === "tasks"
                    ? "bg-[#0ea5a4]/10 text-[#0ea5a4] dark:text-[#0ea5a4] shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
                }`}
              >
                {t("tasks.title")}
              </button>
            </nav>
          </div>

          {/* Right side - Enhanced Controls */}
          <div className="flex items-center space-x-3">
            {/* Enhanced Search Bar */}
            {activeView === "tasks" && (
              <div className="relative">
                <input
                  type="text"
                  placeholder={t("ui.searchPlaceholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 px-4 py-2 pl-10 bg-white/50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-600/60 rounded-2xl text-slate-700 dark:text-slate-300 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0ea5a4]/30 focus:border-[#0ea5a4] backdrop-blur-sm transition-all duration-200 shadow-sm hover:shadow-md"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            )}

            {/* Enhanced Add Task Button */}
            <button
              onClick={onAddTask}
              className="bg-gradient-to-r from-[#0ea5a4] to-[#6366f1] hover:from-[#07877f] hover:to-[#5b5cf0] text-white px-4 py-2 rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center space-x-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span>{t("tasks.addTask")}</span>
            </button>

            {/* Enhanced Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/50 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            {/* Enhanced Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/50 rounded-2xl transition-all duration-200 font-medium shadow-sm hover:shadow-md flex items-center space-x-2"
              >
                <span>{safeCurrentLanguage.flag}</span>
                <span className="hidden sm:block">
                  {safeCurrentLanguage.code.toUpperCase()}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    showLanguageDropdown ? "rotate-180" : ""
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

              {/* Language Dropdown */}
              {showLanguageDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/60 dark:border-slate-700/60 py-2 z-50">
                  {availableLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setShowLanguageDropdown(false);
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-3 ${
                        language === lang.code
                          ? "bg-[#0ea5a4]/10 text-[#0ea5a4]"
                          : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <div className="flex-1">
                        <div className="font-medium">{lang.nativeName}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {lang.name}
                        </div>
                      </div>
                      {language === lang.code && (
                        <svg
                          className="w-4 h-4 text-[#0ea5a4]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Enhanced User Menu */}
            {user && (
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {user.email}
                  </p>
                </div>
                <button
                  onClick={signOut}
                  className="px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/50 rounded-2xl transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                >
                  {t("auth.logout")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {showLanguageDropdown && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowLanguageDropdown(false)}
        />
      )}
    </header>
  );
};

export default Header;
