import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};

export const LanguageProvider = ({ children }) => {
  // Store as string, not JSON
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
        forgotPassword: "Forgot Password?",
        hasAccount: "Already have an account?",
        noAccount: "Don't have an account?"
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
        errorTitleRequired: "Please enter a task title",
        errorAddFailed: "Failed to add task",
        errorUpdateFailed: "Failed to update task",
        errorDeleteFailed: "Failed to delete task"
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
      },
      dashboard: {
        title: "Dashboard",
        subtitle: "Overview of your productivity",
        totalTasks: "Total Tasks",
        allTasks: "All tasks",
        completed: "Completed",
        done: "Tasks done",
        pending: "Pending",
        toDo: "To do",
        completionRate: "Completion Rate",
        efficiency: "Efficiency",
        progress: "Progress Overview",
        completion: "Task Completion",
        insights: "Productivity Insights",
        productivity: "Productivity Level",
        excellent: "Excellent",
        good: "Good",
        needsImprovement: "Needs Improvement",
        activeTasks: "Active Tasks",
        avgCompletion: "Average Completion"
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
        forgotPassword: "पासवर्ड भूल गए?",
        hasAccount: "पहले से खाता है?",
        noAccount: "खाता नहीं है?"
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
        errorTitleRequired: "कृपया कार्य शीर्षक दर्ज करें",
        errorAddFailed: "कार्य जोड़ने में विफल",
        errorUpdateFailed: "कार्य अपडेट करने में विफल",
        errorDeleteFailed: "कार्य हटाने में विफल"
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
      },
      dashboard: {
        title: "डैशबोर्ड",
        subtitle: "आपकी उत्पादकता का अवलोकन",
        totalTasks: "कुल कार्य",
        allTasks: "सभी कार्य",
        completed: "पूर्ण",
        done: "कार्य पूर्ण",
        pending: "लंबित",
        toDo: "करने के लिए",
        completionRate: "पूर्णता दर",
        efficiency: "दक्षता",
        progress: "प्रगति अवलोकन",
        completion: "कार्य पूर्णता",
        insights: "उत्पादकता अंतर्दृष्टि",
        productivity: "उत्पादकता स्तर",
        excellent: "उत्कृष्ट",
        good: "अच्छा",
        needsImprovement: "सुधार की आवश्यकता",
        activeTasks: "सक्रिय कार्य",
        avgCompletion: "औसत पूर्णता"
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
