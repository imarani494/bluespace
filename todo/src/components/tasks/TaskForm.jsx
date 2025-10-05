import React, { useState } from "react";
import { useTasks } from "../contexts/TaskContext";
import { useLanguage } from "../contexts/LanguageContext";

const TaskForm = ({ onTaskAdded, onClose }) => {
  const { addTask } = useTasks();
  const { t, language } = useLanguage();

  const [formData, setFormData] = useState({
    title: "",
    notes: "",
    dueDate: "",
    priority: "medium"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError(
        language === "en" ? "Task title is required" : "कार्य शीर्षक आवश्यक है"
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const taskData = {
        title: formData.title.trim(),
        notes: formData.notes.trim() || null,
        dueDate: formData.dueDate || null,
        priority: formData.priority,
        status: "pending"
      };

      await addTask(taskData);
      setFormData({
        title: "",
        notes: "",
        dueDate: "",
        priority: "medium"
      });
      if (onTaskAdded) onTaskAdded();
    } catch (error) {
      console.error("Error adding task:", error);
      setError(
        error.message ||
          (language === "en" ? "Failed to add task" : "कार्य जोड़ने में विफल")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (error) setError("");
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  return (
    <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/20 p-8 mb-8 relative">
  
      {onClose && (
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-slate-100/80 dark:bg-slate-700/80 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-lg group"
          title={language === "en" ? "Close" : "बंद करें"}
        >
          <svg
            className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}

   
     

      {error && (
        <div className="bg-red-50/90 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 mb-6 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-red-600 dark:text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <span className="text-red-800 dark:text-red-200 text-sm font-medium">
              {error}
            </span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
            {t("tasks.title")} *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-4 border border-slate-300/80 dark:border-slate-600/80 rounded-2xl bg-white/50 dark:bg-slate-700/50 text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 backdrop-blur-sm transition-all duration-300 placeholder-slate-500 dark:placeholder-slate-400 shadow-sm hover:shadow-md"
            placeholder={t("tasks.titlePlaceholder")}
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              {t("tasks.dueDate")}
            </label>
            <input
              type="datetime-local"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full px-4 py-4 border border-slate-300/80 dark:border-slate-600/80 rounded-2xl bg-white/50 dark:bg-slate-700/50 text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              {t("tasks.priority")}
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-4 border border-slate-300/80 dark:border-slate-600/80 rounded-2xl bg-white/50 dark:bg-slate-700/50 text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md"
              disabled={loading}
            >
              <option value="low">{t("priority.low")}</option>
              <option value="medium">{t("priority.medium")}</option>
              <option value="high">{t("priority.high")}</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
            {t("tasks.notes")}
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-4 border border-slate-300/80 dark:border-slate-600/80 rounded-2xl bg-white/50 dark:bg-slate-700/50 text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 backdrop-blur-sm transition-all duration-300 resize-none placeholder-slate-500 dark:placeholder-slate-400 shadow-sm hover:shadow-md"
            placeholder={t("tasks.notesPlaceholder")}
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !formData.title.trim()}
          className="w-full group relative py-5 px-4 border border-transparent text-lg font-bold rounded-2xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 active:scale-95 backdrop-blur-sm overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

          <span className="relative flex items-center justify-center">
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {language === "en" ? "Adding Task..." : "कार्य जोड़ रहे हैं..."}
              </>
            ) : (
              <>
                {t("tasks.addTask")}
                <svg
                  className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </>
            )}
          </span>
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
