import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LoadingSpinner = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
          {language === 'en' ? 'Loading...' : 'लोड हो रहा है...'}
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          {language === 'en' ? 'Please wait while we get things ready' : 'कृपया प्रतीक्षा करें, हम चीजों को तैयार कर रहे हैं'}
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;