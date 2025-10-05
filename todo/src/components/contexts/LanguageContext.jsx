import React, { createContext, useContext, useState, useEffect } from "react";

// Only keep English translations as base
const baseTranslations = {
  en: {
    auth: {
      login: "Login",
      signup: "Sign Up",
      logout: "Logout",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      noAccount: "Don't have an account?",
      haveAccount: "Already have an account?",
      welcomeBack: "Welcome back to your productivity hub",
      createAccount: "Create your account to get started",
      processing: "Processing...",
      loading: "Loading...",
      accountCreated: "Account created! Please login."
    },
    tasks: {
      title: "Tasks",
      addTask: "Add Task",
      editTask: "Edit Task",
      deleteTask: "Delete Task",
      titlePlaceholder: "What needs to be done?",
      notes: "Notes",
      notesPlaceholder: "Add notes...",
      status: "Status",
      dueDate: "Due Date",
      priority: "Priority",
      completed: "Completed",
      pending: "Pending",
      inProgress: "In Progress",
      all: "All",
      noTasks: "No tasks yet",
      addFirstTask: "Add your first task to get started!",
      deleteConfirm: "Are you sure you want to delete this task?",
      titleRequired: "Task title is required",
      addTaskError: "Failed to add task",
      taskManagement: "Task Management",
      manageTasks: "Manage your tasks efficiently"
    },
    dashboard: {
      title: "Dashboard",
      overview: "Overview of your productivity",
      totalTasks: "Total Tasks",
      completedTasks: "Completed",
      pendingTasks: "Pending",
      inProgressTasks: "In Progress",
      completionRate: "Completion Rate",
      recentActivity: "Recent Activity"
    },
    ui: {
      dashboard: "Dashboard",
      calendar: "Calendar",
      searchPlaceholder: "Search tasks...",
      save: "Save",
      cancel: "Cancel",
      update: "Update",
      create: "Create",
      delete: "Delete",
      edit: "Edit",
      loading: "Loading...",
      noResults: "No tasks found",
      tryDifferent: "Try adjusting your search terms",
      showing: "Showing",
      of: "of"
    },
    priority: {
      low: "Low",
      medium: "Medium",
      high: "High"
    },
    app: {
      name: "TodoPro",
      tagline: "Productivity Simplified"
    }
  }
};

// Language configuration
const languageConfig = {
  en: { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  hi: { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" }
};

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [translations, setTranslations] = useState(baseTranslations);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationCache, setTranslationCache] = useState({});

  useEffect(() => {
    const savedLanguage = localStorage.getItem("todo-app-language");
    if (savedLanguage && languageConfig[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todo-app-language", language);
  }, [language]);

  // Dynamic translation using Google Translate API
  const translateText = async (text, targetLang = language) => {
    if (!text || targetLang === "en") return text;

    // Check cache first
    const cacheKey = `${text}_${targetLang}`;
    if (translationCache[cacheKey]) {
      return translationCache[cacheKey];
    }

    try {
      setIsTranslating(true);

      // Use Google Translate API
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(
          text
        )}`
      );

      if (!response.ok) {
        throw new Error("Translation API failed");
      }

      const data = await response.json();
      let translatedText = data[0].map((item) => item[0]).join("");

      // Clean up the translation
      translatedText = translatedText.trim();

      // Cache the translation
      setTranslationCache((prev) => ({
        ...prev,
        [cacheKey]: translatedText
      }));

      return translatedText;
    } catch (error) {
      console.warn("Translation failed:", error);
      return text; // Return original text if translation fails
    } finally {
      setIsTranslating(false);
    }
  };

  // Translate entire object recursively
  const translateObject = async (obj, targetLang) => {
    if (targetLang === "en") return obj;

    const translated = {};

    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === "string") {
        translated[key] = await translateText(value, targetLang);
      } else if (typeof value === "object" && value !== null) {
        translated[key] = await translateObject(value, targetLang);
      } else {
        translated[key] = value;
      }
    }

    return translated;
  };

  // Load or translate language when changed
  useEffect(() => {
    const loadLanguage = async () => {
      if (language === "en") {
        setTranslations(baseTranslations);
        return;
      }

      setIsTranslating(true);
      try {
        // Check if we already have this language translated
        if (translations[language]) {
          return; // Already translated
        }

        // Translate the entire English base to target language
        const translatedBase = await translateObject(
          baseTranslations.en,
          language
        );

        setTranslations((prev) => ({
          ...prev,
          [language]: translatedBase
        }));
      } catch (error) {
        console.error("Failed to load language:", error);
        // Fallback to English
        setTranslations(baseTranslations);
      } finally {
        setIsTranslating(false);
      }
    };

    loadLanguage();
  }, [language]);

  // Get available languages
  const getAvailableLanguages = () => {
    return Object.keys(languageConfig).map((code) => ({
      code,
      ...languageConfig[code]
    }));
  };

  const setLanguageWithTranslation = async (newLang) => {
    if (newLang === language) return;
    setLanguage(newLang);
  };

  const toggleLanguage = () => {
    const newLang = language === "en" ? "hi" : "en";
    setLanguageWithTranslation(newLang);
  };

  // Translation function for task content (for individual task titles/notes)
  const translateTaskContent = async (text, targetLang = language) => {
    if (!text || targetLang === "en") return text;
    return await translateText(text, targetLang);
  };

  const t = (key, fallback) => {
    const keys = key.split(".");
    let value = translations[language];

    // Try to get translation for current language
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        // Fallback to English
        value = baseTranslations.en;
        for (const k of keys) {
          if (value && value[k] !== undefined) {
            value = value[k];
          } else {
            console.warn("Translation missing:", key);
            return fallback || key.split(".").pop();
          }
        }
        break;
      }
    }

    return value || fallback || key.split(".").pop();
  };

  const value = {
    language,
    setLanguage: setLanguageWithTranslation,
    toggleLanguage,
    t,
    translateTaskContent,
    translateText,
    isTranslating,
    availableLanguages: getAvailableLanguages(),
    currentLanguage: languageConfig[language] || languageConfig.en
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
