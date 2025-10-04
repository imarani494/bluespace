import React, { useState } from "react";
import { useAuth } from "../../components/contexts/AuthContext";
import { useLanguage } from "../../components/contexts/LanguageContext";
import { useTheme } from "../../components/contexts/ThemeContext";
import Button from "../ui/Button";

const Header = ({ activeView, setActiveView, searchTerm, setSearchTerm }) => {
  const { user, signOut } = useAuth();
  const { t, toggleLanguage, language } = useLanguage();
  const { toggleTheme, isDark } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
        
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold">✓</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                TodoApp
              </h1>
            </div>

           
            <nav className="hidden md:ml-8 md:flex space-x-1">
              {["tasks", "dashboard"].map((view) => (
                <button
                  key={view}
                  onClick={() => setActiveView(view)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeView === view
                      ? "bg-primary text-white"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  }`}
                >
                  {view === "tasks" ? t("tasks.title") : t("dashboard.title")}
                </button>
              ))}
            </nav>
          </div>

          {activeView === "tasks" && (
            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t("ui.searchPlaceholder")}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
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
              </div>
            </div>
          )}

         
          <div className="flex items-center space-x-3">
          
            <Button
              variant="outline"
              size="small"
              onClick={toggleLanguage}
              className="hidden sm:flex"
            >
              {language === "en" ? "हिंदी" : "English"}
            </Button>

            {/* Theme Toggle */}
            <Button variant="outline" size="small" onClick={toggleTheme}>
              {isDark ? "☀️" : "🌙"}
            </Button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.email?.[0]?.toUpperCase()}
                  </span>
                </div>
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 border border-gray-200 dark:border-gray-700 z-10">
                  <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">
                    {user?.email}
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {t("auth.logout")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

       
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 pt-4 pb-3">
          <nav className="flex space-x-1">
            {["tasks", "dashboard"].map((view) => (
              <button
                key={view}
                onClick={() => setActiveView(view)}
                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium text-center ${
                  activeView === view
                    ? "bg-primary text-white"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                {view === "tasks" ? t("tasks.title") : t("dashboard.title")}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
