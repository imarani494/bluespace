import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title, // Store original title for editing
    notes: task.notes || "",
    dueDate: task.due_date || "",
    priority: task.priority || "medium"
  });
  const { t, language } = useLanguage();

  // Use translated content for display
  const displayTitle = task.displayTitle || task.title;
  const displayNotes = task.displayNotes || task.notes;

  const handleStatusToggle = async () => {
    await onUpdate(task.id, {
      status: task.status === "completed" ? "pending" : "completed"
    });
  };

  const handleSave = async () => {
    await onUpdate(task.id, editData);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm(t("tasks.deleteConfirm"))) {
      onDelete(task.id);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString();
  };

  const getPriorityColor = (priority) => {
    const safePriority = priority || "medium";
    switch (safePriority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200";
    }
  };

  const getPriorityText = (priority) => {
    const safePriority = priority || "medium";
    return t(`priority.${safePriority}`) || safePriority;
  };

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 mb-4">
        <div className="space-y-4">
          <input
            type="text"
            value={editData.title}
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={t("tasks.titlePlaceholder")}
          />

          <textarea
            value={editData.notes}
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, notes: e.target.value }))
            }
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder={t("tasks.notesPlaceholder")}
            rows="3"
          />

          <div className="flex justify-between items-center">
            <select
              value={editData.priority}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, priority: e.target.value }))
              }
              className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="low">{t("priority.low")}</option>
              <option value="medium">{t("priority.medium")}</option>
              <option value="high">{t("priority.high")}</option>
            </select>

            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors"
              >
                {t("ui.cancel")}
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {t("ui.save")}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 mb-4">
      <div className="flex items-start space-x-3">
        <button
          onClick={handleStatusToggle}
          className={`flex-shrink-0 w-5 h-5 rounded border-2 mt-1 transition-colors ${
            task.status === "completed"
              ? "bg-green-500 border-green-500"
              : "border-slate-300 dark:border-slate-600 hover:border-green-400"
          }`}
        >
          {task.status === "completed" && (
            <svg
              className="w-3 h-3 text-white mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3
                className={`text-lg font-semibold text-slate-900 dark:text-white ${
                  task.status === "completed" ? "line-through" : ""
                }`}
              >
                {displayTitle}
              </h3>

              {displayNotes && (
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {displayNotes}
                </p>
              )}

              <div className="flex items-center space-x-3 mt-3">
                {task.due_date && (
                  <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded">
                    {formatDate(task.due_date)}
                  </span>
                )}

                <span
                  className={`text-xs px-2 py-1 rounded ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  {getPriorityText(task.priority)}
                </span>

                <span
                  className={`text-xs px-2 py-1 rounded ${
                    task.status === "completed"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                  }`}
                >
                  {task.status === "completed"
                    ? t("tasks.completed")
                    : t("tasks.pending")}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                title={t("ui.edit")}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>

              <button
                onClick={handleDelete}
                className="p-1 text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                title={t("ui.delete")}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
