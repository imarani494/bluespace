import React, { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { useLanguage } from "../contexts/LanguageContext";
import LoadingSpinner from "../common/LoadingSpinner";

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [showNotes, setShowNotes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { addTask } = useTasks();
  const { t, language } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError(t('tasks.titleRequired'));
      return;
    }

    setLoading(true);
    setError("");

    try {
      await addTask({
        title: title.trim(),
        notes: notes.trim(),
        status: "pending"
      });

      setTitle("");
      setNotes("");
      setShowNotes(false);
      if (onTaskAdded) onTaskAdded();
    } catch (err) {
      console.error("Error adding task:", err);
      setError(err.message || "Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 mb-6 mx-2 sm:mx-0 transition-all duration-300 hover:shadow-xl">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {t('tasks.addTask')}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {language === 'en' 
              ? 'Add a new task to your list' 
              : 'अपनी सूची में एक नया कार्य जोड़ें'
            }
          </p>
        </div>
        
        {/* Language Badge */}
        <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-full">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
            {language === 'en' ? 'English' : 'हिंदी'}
          </span>
          <div className={`w-2 h-2 rounded-full ${language === 'en' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Main Input Row */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder={t("tasks.titlePlaceholder")}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError("");
              }}
              onFocus={() => setShowNotes(true)}
              disabled={loading}
              className="w-full px-4 py-3.5 border border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 text-base transition-all duration-200"
            />
            
            {/* Character Counter */}
            <div className="absolute bottom-2 right-3">
              <span className={`text-xs ${title.length > 50 ? 'text-orange-500' : 'text-slate-400'}`}>
                {title.length}/100
              </span>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={!title.trim() || loading}
            className="sm:w-auto w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 text-white py-3.5 px-6 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <LoadingSpinner size="small" />
                <span className="text-sm">
                  {language === 'en' ? 'Adding...' : 'जोड़ रहे हैं...'}
                </span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-sm">{t("tasks.addTask")}</span>
              </>
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400 text-sm flex items-start space-x-2">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Notes Section */}
        {showNotes && (
          <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                {t('tasks.notes')}
              </label>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {notes.length}/500
              </span>
            </div>
            
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t("tasks.notesPlaceholder")}
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 resize-none transition-all duration-200"
              rows="3"
              disabled={loading}
            />
            
            <div className="flex justify-end mt-4 space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowNotes(false);
                  setError("");
                }}
                className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors text-sm font-medium"
                disabled={loading}
              >
                {t("tasks.cancel")}
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setNotes('');
                  setShowNotes(false);
                }}
                className="px-4 py-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 transition-colors text-sm font-medium"
                disabled={loading}
              >
                {language === 'en' ? 'Clear Notes' : 'नोट्स साफ करें'}
              </button>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        {!showNotes && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-600">
            <button
              type="button"
              onClick={() => setShowNotes(true)}
              className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>{t('tasks.addNote')}</span>
            </button>
            
            <div className="text-xs text-slate-500 dark:text-slate-400">
              ⏎ {language === 'en' ? 'Press Enter to add' : 'जोड़ने के लिए एंटर दबाएं'}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default TaskForm;