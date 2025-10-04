import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useLocalStorage("todo-language", "en");

  // Complete translations - no API needed
  const translations = {
    en: {
      auth: {
        signIn: "Sign In",
        signUp: "Sign Up",
        email: "Email Address",
        password: "Password",
        logout: "Logout",
        welcomeBack: "Welcome Back",
        createAccount: "Create Account",
        forgotPassword: "Forgot Password?"
      },
      tasks: {
        title: "Tasks",
        addTask: "Add Task",
        titlePlaceholder: "What needs to be done?",
        notesPlaceholder: "Add notes...",
        edit: "Edit",
        delete: "Delete",
        save: "Save",
        cancel: "Cancel",
        markComplete: "Mark Complete",
        markIncomplete: "Mark Incomplete",
        confirmDelete: "Are you sure you want to delete this task?",
        addNote: "Add Note",
        notes: "Notes",
        titleRequired: "Please enter a task title"
      },
      status: {
        all: "All",
        pending: "Pending",
        completed: "Completed"
      },
      ui: {
        loading: "Loading...",
        noTasks: "No tasks yet",
        addFirstTask: "Add your first task to get started!",
        searchPlaceholder: "Search tasks...",
        noResults: "No tasks found",
        tryDifferent: "Try different search terms",
        dashboard: "Dashboard",
        overview: "Overview of your productivity",
        showing: "Showing",
        of: "of",
        for: "for"
      }
    },
    hi: {
      auth: {
        signIn: "साइन इन करें",
        signUp: "साइन अप करें",
        email: "ईमेल पता",
        password: "पासवर्ड",
        logout: "लॉगआउट",
        welcomeBack: "वापसी पर स्वागत है",
        createAccount: "खाता बनाएं",
        forgotPassword: "पासवर्ड भूल गए?"
      },
      tasks: {
        title: "कार्य",
        addTask: "कार्य जोड़ें",
        titlePlaceholder: "क्या करना है?",
        notesPlaceholder: "नोट्स जोड़ें...",
        edit: "संपादित करें",
        delete: "हटाएं",
        save: "सहेजें",
        cancel: "रद्द करें",
        markComplete: "पूर्ण चिह्नित करें",
        markIncomplete: "अपूर्ण चिह्नित करें",
        confirmDelete: "क्या आप वाकई इस कार्य को हटाना चाहते हैं?",
        addNote: "नोट जोड़ें",
        notes: "नोट्स",
        titleRequired: "कृपया कार्य शीर्षक दर्ज करें"
      },
      status: {
        all: "सभी",
        pending: "लंबित",
        completed: "पूर्ण"
      },
      ui: {
        loading: "लोड हो रहा है...",
        noTasks: "अभी तक कोई कार्य नहीं",
        addFirstTask: "शुरू करने के लिए अपना पहला कार्य जोड़ें!",
        searchPlaceholder: "कार्य खोजें...",
        noResults: "कोई कार्य नहीं मिला",
        tryDifferent: "अलग खोज शब्द आज़माएं",
        dashboard: "डैशबोर्ड",
        overview: "आपकी उत्पादकता का अवलोकन",
        showing: "दिखा रहा है",
        of: "का",
        for: "के लिए"
      }
    }
  };

  const t = (key) => {
    const keys = key.split(".");
    let value = translations[language];

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(`Translation missing for: ${key}`);
        // Fallback to English
        let fallbackValue = translations.en;
        for (const k of keys) {
          fallbackValue = fallbackValue?.[k];
        }
        return fallbackValue || key;
      }
    }

    return value || key;
  };

  const toggleLanguage = () => {
    const newLang = language === "en" ? "hi" : "en";
    console.log("🔄 Switching to:", newLang);
    setLanguage(newLang);
  };

  const value = {
    language,
    setLanguage,
    t,
    toggleLanguage,
    loading: false // No loading since we're not using API
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
