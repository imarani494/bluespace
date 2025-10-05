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

  // Apply theme to DOM
  const applyTheme = (dark) => {
    const html = document.documentElement;

    // Remove both classes first
    html.classList.remove("light", "dark");

    // Add the appropriate class
    if (dark) {
      html.classList.add("dark");
      html.style.colorScheme = "dark";
    } else {
      html.classList.add("light");
      html.style.colorScheme = "light";
    }

    // Set data attribute for additional CSS targeting
    html.setAttribute("data-theme", dark ? "dark" : "light");
  };

  useEffect(() => {
    // Initialize theme
    const savedTheme = localStorage.getItem("todo-app-theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const initialTheme = savedTheme ? savedTheme === "dark" : systemPrefersDark;

    setIsDark(initialTheme);
    applyTheme(initialTheme);
  }, []);

  useEffect(() => {
    // Apply theme when isDark changes
    applyTheme(isDark);
    localStorage.setItem("todo-app-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const value = {
    isDark,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
