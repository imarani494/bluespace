import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeDebug = () => {
  const { theme, isDark } = useTheme();
  
  return (
    <div className="fixed top-20 left-4 z-50 bg-black text-white p-4 rounded-lg text-xs">
      <div>Theme: {theme}</div>
      <div>isDark: {isDark.toString()}</div>
      <div>HTML Class: {document.documentElement.className}</div>
    </div>
  );
};

export default ThemeDebug;