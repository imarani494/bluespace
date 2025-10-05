import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";

const Header = ({
  activeView,
  setActiveView,
  searchTerm,
  setSearchTerm,
  onCalendarToggle
}) => {
  const { user, signOut } = useAuth();
  const { t, toggleLanguage, language } = useLanguage();
  const { toggleTheme, isDark } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-white/95 dark:bg-slate-800/95 shadow-lg border-b border-slate-200/80 dark:border-slate-700/80 sticky top-0 z-50 backdrop-blur-2xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
        <div className="flex justify-between items-center h-16">
        
          <div className="flex items-center space-x-8">
           
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl blur-md opacity-75"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-xl">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

         
            <nav className="hidden lg:flex items-center space-x-2">
              <button
                onClick={() => setActiveView("tasks")}
                className={`group relative px-6 py-3 text-sm font-semibold rounded-2xl transition-all duration-300 ${
                  activeView === "tasks"
                    ? "text-white shadow-2xl"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/50"
                }`}
              >
                {activeView === "tasks" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl"></div>
                )}
                <div className="relative flex items-center space-x-3">
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
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  <span>{t("tasks.title")}</span>
                </div>
              </button>
              <button
                onClick={() => setActiveView("dashboard")}
                className={`group relative px-6 py-3 text-sm font-semibold rounded-2xl transition-all duration-300 ${
                  activeView === "dashboard"
                    ? "text-white shadow-2xl"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/50"
                }`}
              >
                {activeView === "dashboard" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl"></div>
                )}
                <div className="relative flex items-center space-x-3">
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
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <span>{t("dashboard.title")}</span>
                </div>
              </button>
            </nav>
          </div>

      
          {activeView === "tasks" && (
            <div className="flex-1 max-w-2xl mx-8 hidden lg:block">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-slate-400"
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
                <input
                  type="text"
                  placeholder={t("ui.searchPlaceholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3.5 border border-slate-300/80 dark:border-slate-600/80 rounded-2xl bg-white/80 dark:bg-slate-700/80 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md"
                />
              </div>
            </div>
          )}

       
          <div className="flex items-center space-x-4">
          
            <button
              onClick={toggleLanguage}
              className="group relative flex items-center space-x-2 px-4 py-2.5 bg-slate-100/80 dark:bg-slate-700/80 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-2xl transition-all duration-300 font-medium text-sm border border-slate-200/60 dark:border-slate-600/60 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105"
              title={
                language === "en" ? "Switch to Hindi" : "Switch to English"
              }
            >
              <span className="text-base">🌐</span>
              <span className="hidden sm:inline font-semibold"></span>
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-md">
                {language === "en" ? "EN" : "HI"}
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg transition-all duration-200 font-medium text-sm border border-slate-200 dark:border-slate-600 shadow-sm hover:shadow-md"
              title={
                isDark
                  ? language === "en"
                    ? "Switch to light mode"
                    : "लाइट मोड में बदलें"
                  : language === "en"
                  ? "Switch to dark mode"
                  : "डार्क मोड में बदलें"
              }
            >
              {isDark ? (
                <span className="text-base">☀️</span>
              ) : (
                <span className="text-base">🌙</span>
              )}
              <span className="hidden sm:inline">
                {isDark
                  ? language === "en"
                    ? "Light"
                    : "लाइट"
                  : language === "en"
                  ? "Dark"
                  : "डार्क"}
              </span>
            </button>

            {/* User Menu */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {user?.email?.split("@")[0]}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {user?.email}
                </p>
              </div>
              <button
                onClick={handleSignOut}
                className="group relative flex items-center space-x-2 bg-slate-100/80 dark:bg-slate-700/80 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 px-4 py-2.5 rounded-2xl transition-all duration-300 font-medium text-sm border border-slate-200/60 dark:border-slate-600/60 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span className="font-semibold">{t("auth.logout")}</span>
              </button>
            </div>

            {/* Mobile Menu Button with Cross */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 bg-slate-100/80 dark:bg-slate-700/80 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 rounded-2xl transition-all duration-300 border border-slate-200/60 dark:border-slate-600/60 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105"
            >
              {isMobileMenuOpen ? (
                // Cross icon when menu is open
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger icon when menu is closed
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {activeView === "tasks" && (
          <div className="lg:hidden pb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-slate-400"
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
              <input
                type="text"
                placeholder={t("ui.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-12 pr-4 py-3.5 border border-slate-300/80 dark:border-slate-600/80 rounded-2xl bg-white/80 dark:bg-slate-700/80 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md"
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200/50 dark:border-slate-700/50 py-6 backdrop-blur-sm bg-white/80 dark:bg-slate-800/80 rounded-2xl mt-2">
            <div className="flex flex-col space-y-6">
              <div className="flex items-center justify-between px-4">
                <div className="text-left">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {user?.email?.split("@")[0]}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {user?.email}
                  </p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 px-4 py-2.5 rounded-2xl transition-all duration-300 font-medium text-sm border border-slate-200 dark:border-slate-600 shadow-lg hover:shadow-xl"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="font-semibold">{t("auth.logout")}</span>
                </button>
              </div>

              {/* Mobile Navigation */}
              <div className="flex space-x-3 px-4">
                <button
                  onClick={() => {
                    setActiveView("tasks");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex-1 px-6 py-3 text-sm font-semibold rounded-2xl transition-all duration-300 ${
                    activeView === "tasks"
                      ? "text-white shadow-2xl bg-gradient-to-r from-blue-500 to-purple-600"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/50 border border-slate-200 dark:border-slate-600"
                  }`}
                >
                  {t("tasks.title")}
                </button>
                <button
                  onClick={() => {
                    setActiveView("dashboard");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex-1 px-6 py-3 text-sm font-semibold rounded-2xl transition-all duration-300 ${
                    activeView === "dashboard"
                      ? "text-white shadow-2xl bg-gradient-to-r from-blue-500 to-purple-600"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/50 border border-slate-200 dark:border-slate-600"
                  }`}
                >
                  {t("dashboard.title")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
