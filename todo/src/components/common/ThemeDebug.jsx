import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const ThemeDebug = () => {
  const { isDark } = useTheme();

  return (
    <div className="fixed top-4 left-4 z-50 bg-black text-white p-3 rounded-lg text-xs">
      <div> {isDark.toString()}</div>
      <div> {document.documentElement.className}</div>
      <div> {localStorage.getItem("todo-app-theme")}</div>
    </div>
  );
};

export default ThemeDebug;
