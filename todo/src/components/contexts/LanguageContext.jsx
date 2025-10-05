import React, { createContext, useContext, useState, useEffect } from "react";

const translations = {
  en: {
    auth: {
      login: "Login",
      signup: "Sign Up",
      logout: "Logout",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      noAccount: "Don't have an account?",
      haveAccount: "Already have an account?"
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
      all: "All",
      noTasks: "No tasks yet",
      addFirstTask: "Add your first task to get started!",
      deleteConfirm: "Are you sure you want to delete this task?"
    },
    dashboard: {
      title: "Dashboard",
      overview: "Overview of your productivity",
      totalTasks: "Total Tasks",
      completedTasks: "Completed",
      pendingTasks: "Pending",
      completionRate: "Completion Rate"
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
      loading: "Loading..."
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
  },

  hi: {
    auth: {
      login: "लॉगिन",
      signup: "साइन अप",
      logout: "लॉग आउट",
      email: "ईमेल",
      password: "पासवर्ड",
      confirmPassword: "पासवर्ड पुष्टि करें",
      noAccount: "खाता नहीं है?",
      haveAccount: "पहले से खाता है?"
    },
    tasks: {
      title: "कार्य",
      addTask: "कार्य जोड़ें",
      editTask: "कार्य संपादित करें",
      deleteTask: "कार्य हटाएं",
      titlePlaceholder: "क्या करना है?",
      notes: "नोट्स",
      notesPlaceholder: "नोट्स जोड़ें...",
      status: "स्थिति",
      dueDate: "नियत तारीख",
      priority: "प्राथमिकता",
      completed: "पूर्ण",
      pending: "लंबित",
      all: "सभी",
      noTasks: "अभी तक कोई कार्य नहीं",
      addFirstTask: "शुरू करने के लिए अपना पहला कार्य जोड़ें!",
      deleteConfirm: "क्या आप वाकई इस कार्य को हटाना चाहते हैं?"
    },
    dashboard: {
      title: "डैशबोर्ड",
      overview: "आपकी उत्पादकता का अवलोकन",
      totalTasks: "कुल कार्य",
      completedTasks: "पूर्ण",
      pendingTasks: "लंबित",
      completionRate: "पूर्णता दर"
    },
    ui: {
      dashboard: "डैशबोर्ड",
      calendar: "कैलेंडर",
      searchPlaceholder: "कार्य खोजें...",
      save: "सेव",
      cancel: "रद्द करें",
      update: "अपडेट",
      create: "बनाएं",
      delete: "हटाएं",
      edit: "संपादित",
      loading: "लोड हो रहा है..."
    },
    priority: {
      low: "कम",
      medium: "मध्यम",
      high: "उच्च"
    },
    app: {
      name: "टोडोप्रो",
      tagline: "उत्पादकता सरल"
    }
  }
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

  useEffect(() => {
    const savedLanguage = localStorage.getItem("todo-app-language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todo-app-language", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "hi" : "en"));
  };

  const t = (key) => {
    const keys = key.split(".");
    let value = translations[language];

    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        console.warn("Translation missing:", key);
        return key;
      }
    }

    return value;
  };

  const value = {
    language,
    toggleLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};