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
      setError(t("tasks.titleRequired"));
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
      if (onClose) onClose();
    } catch (error) {
      console.error("Error adding task:", error);
      setError(
        error.message || t("tasks.addTaskError") || "Failed to add task"
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

  const handleCancel = () => {
    setFormData({
      title: "",
      notes: "",
      dueDate: "",
      priority: "medium"
    });
    setError("");
    if (onClose) onClose();
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        {t("tasks.addTask")}
      </h2>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-red-400 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-red-800 dark:text-red-200 text-sm">
              {error}
            </span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            {t("tasks.title")} *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={t("tasks.titlePlaceholder")}
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t("tasks.dueDate")}
            </label>
            <input
              type="datetime-local"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t("tasks.priority")}
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            >
              <option value="low">{t("priority.low")}</option>
              <option value="medium">{t("priority.medium")}</option>
              <option value="high">{t("priority.high")}</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            {t("tasks.notes")}
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder={t("tasks.notesPlaceholder")}
            disabled={loading}
          />
        </div>

        <div className="flex gap-3">
          {onClose && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="flex-1 bg-slate-500 hover:bg-slate-600 text-white py-2 px-4 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t("ui.cancel")}
            </button>
          )}
          <button
            type="submit"
            disabled={loading || !formData.title.trim()}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                {t("ui.loading")}
              </>
            ) : (
              t("tasks.addTask")
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
