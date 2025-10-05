
import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

 
  const colorPalette = {
    light: {
      bg: {
        primary: "#f8fafc",
        secondary: "#ffffff",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        glass: "rgba(255, 255, 255, 0.25)",
        card: "rgba(255, 255, 255, 0.9)"
      },
      text: {
        primary: "#1e293b",
        secondary: "#64748b",
        accent: "#0ea5a4"
      },
      accent: {
        primary: "#0ea5a4",
        secondary: "#6366f1",
        success: "#10b981",
        danger: "#ef4444",
        warning: "#f59e0b"
      }
    },
    dark: {
      bg: {
        primary: "#0f172a",
        secondary: "#1e293b",
        gradient: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
        glass: "rgba(30, 41, 59, 0.25)",
        card: "rgba(30, 41, 59, 0.8)"
      },
      text: {
        primary: "#f1f5f9",
        secondary: "#94a3b8",
        accent: "#22d3ee"
      },
      accent: {
        primary: "#22d3ee",
        secondary: "#818cf8",
        success: "#34d399",
        danger: "#f87171",
        warning: "#fbbf24"
      }
    }
  };

  const applyTheme = (dark) => {
    const html = document.documentElement;
    const colors = dark ? colorPalette.dark : colorPalette.light;

 
    html.classList.remove("light", "dark");

   
    if (dark) {
      html.classList.add("dark");
      html.style.colorScheme = "dark";
    } else {
      html.classList.add("light");
      html.style.colorScheme = "light";
    }

   
    Object.entries(colors).forEach(([category, values]) => {
      Object.entries(values).forEach(([key, value]) => {
        html.style.setProperty(`--${category}-${key}`, value);
      });
    });

    // Set data attribute for additional CSS targeting
    html.setAttribute("data-theme", dark ? "dark" : "light");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("todo-app-theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const initialTheme = savedTheme ? savedTheme === "dark" : systemPrefersDark;
    setIsDark(initialTheme);
    applyTheme(initialTheme);
  }, []);

  useEffect(() => {
    applyTheme(isDark);
    localStorage.setItem("todo-app-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const value = {
    isDark,
    toggleTheme,
    colors: isDark ? colorPalette.dark : colorPalette.light
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
