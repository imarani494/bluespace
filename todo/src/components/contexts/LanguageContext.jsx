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
        noAccount: "Don't have an account?",
        hasAccount: "Already have an account?"
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
        confirmDelete: "Are you sure you want to delete this task?"
      },
      status: {
        all: "All",
        pending: "Pending",
        completed: "Completed",
        active: "Active"
      },
      dashboard: {
        title: "Dashboard",
        totalTasks: "Total Tasks",
        completedTasks: "Completed",
        pendingTasks: "Pending",
        completionRate: "Completion Rate"
      },
      ui: {
        loading: "Loading...",
        noTasks: "No tasks yet",
        addFirstTask: "Add your first task to get started!",
        searchPlaceholder: "Search tasks...",
        noResults: "No tasks found",
        tryDifferent: "Try different search terms",
        lightMode: "Light Mode",
        darkMode: "Dark Mode",
        english: "English",
        hindi: "Hindi"
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
        noAccount: "खाता नहीं है?",
        hasAccount: "पहले से खाता है?"
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
        confirmDelete: "क्या आप वाकई इस कार्य को हटाना चाहते हैं?"
      },
      status: {
        all: "सभी",
        pending: "लंबित",
        completed: "पूर्ण",
        active: "सक्रिय"
      },
      dashboard: {
        title: "डैशबोर्ड",
        totalTasks: "कुल कार्य",
        completedTasks: "पूर्ण",
        pendingTasks: "लंबित",
        completionRate: "पूर्णता दर"
      },
      ui: {
        loading: "लोड हो रहा है...",
        noTasks: "अभी तक कोई कार्य नहीं",
        addFirstTask: "शुरू करने के लिए अपना पहला कार्य जोड़ें!",
        searchPlaceholder: "कार्य खोजें...",
        noResults: "कोई कार्य नहीं मिला",
        tryDifferent: "अलग खोज शब्द आज़माएं",
        lightMode: "लाइट मोड",
        darkMode: "डार्क मोड",
        english: "अंग्रेज़ी",
        hindi: "हिंदी"
      }
    }
  };

  const t = (key) => {
    const keys = key.split(".");
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "hi" : "en"));
  };

  const value = {
    language,
    setLanguage,
    t,
    toggleLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
