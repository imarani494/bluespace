import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    notes: task.notes || "",
    dueDate: task.due_date || "",
    priority: task.priority || "medium"
  });
  const { t } = useLanguage();

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
        return "bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800";
      case "medium":
        return "bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800";
      case "low":
        return "bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800";
      default:
        return "bg-gradient-to-r from-slate-500/20 to-slate-600/20 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700";
    }
  };

  const getPriorityText = (priority) => {
    const safePriority = priority || "medium";
    return t(`priority.${safePriority}`) || safePriority;
  };

  if (isEditing) {
    return (
      <div className="edit-form-animation bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 p-6 shadow-2xl">
        <div className="space-y-4">
          <input
            type="text"
            value={editData.title}
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
            placeholder={t("tasks.titlePlaceholder")}
          />

          <textarea
            value={editData.notes}
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, notes: e.target.value }))
            }
            className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
            placeholder={t("tasks.notesPlaceholder")}
            rows="3"
          />

          <div className="flex justify-between items-center">
            <select
              value={editData.priority}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, priority: e.target.value }))
              }
              className="px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg backdrop-blur-sm transition-all duration-300"
            >
              <option value="low">{t("priority.low")}</option>
              <option value="medium">{t("priority.medium")}</option>
              <option value="high">{t("priority.high")}</option>
            </select>

            <div className="flex space-x-3">
              <button
                onClick={() => setIsEditing(false)}
                className="btn-cancel-animation px-6 py-2 bg-slate-500/20 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-500/30 transition-all duration-300 backdrop-blur-sm"
              >
                {t("ui.cancel")}
              </button>
              <button
                onClick={handleSave}
                className="btn-save-animation px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105"
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
    <div
      className={`
      task-card-animation
      relative bg-gradient-to-br from-white/60 to-white/40 dark:from-slate-800/60 dark:to-slate-900/40 
      backdrop-blur-xl rounded-2xl border border-white/30 dark:border-slate-700/30 p-6 
      shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1
      ${task.status === "completed" ? "opacity-75" : "opacity-100"}
    `}
    >
      {/* Glow effect for priority */}
      <div
        className={`
        priority-glow-animation
        absolute inset-0 rounded-2xl blur-xl -z-10
        ${
          task.priority === "high"
            ? "bg-red-500/20"
            : task.priority === "medium"
            ? "bg-yellow-500/20"
            : "bg-green-500/20"
        }
      `}
      />

      <div className="flex items-start space-x-4">
        {/* Animated checkbox */}
        <button
          onClick={handleStatusToggle}
          className={`
            checkbox-animation
            flex-shrink-0 w-6 h-6 rounded-lg border-2 mt-1 transition-all duration-300 
            backdrop-blur-sm transform hover:scale-110 active:scale-95
            ${
              task.status === "completed"
                ? "bg-gradient-to-r from-green-500 to-emerald-500 border-green-500 shadow-lg shadow-green-500/30"
                : "border-slate-300 dark:border-slate-600 hover:border-green-400 bg-white/50 dark:bg-slate-700/50"
            }
          `}
        >
          {task.status === "completed" && (
            <div className="checkmark-animation w-4 h-4 mx-auto text-white">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3
                className={`
                text-slide-in
                text-lg font-semibold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent
                ${task.status === "completed" ? "line-through" : ""}
              `}
              >
                {task.title}
              </h3>

              {task.notes && (
                <p className="fade-in-delayed text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {task.notes}
                </p>
              )}

              <div className="fade-in-stagger flex items-center space-x-3 mt-4">
                {task.due_date && (
                  <div className="badge-animation flex items-center space-x-2 text-xs bg-blue-500/10 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-full border border-blue-200 dark:border-blue-800 backdrop-blur-sm transition-all duration-300 hover:scale-105">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{formatDate(task.due_date)}</span>
                  </div>
                )}

                <span
                  className={`
                  badge-animation
                  text-xs px-3 py-1.5 rounded-full font-medium backdrop-blur-sm transition-all duration-300 hover:scale-105
                  ${getPriorityColor(task.priority)}
                `}
                >
                  {getPriorityText(task.priority)}
                </span>

                <span
                  className={`
                  badge-animation
                  text-xs px-3 py-1.5 rounded-full font-medium backdrop-blur-sm transition-all duration-300 hover:scale-105
                  ${
                    task.status === "completed"
                      ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
                      : "bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                  }
                `}
                >
                  {task.status === "completed"
                    ? t("tasks.completed")
                    : t("tasks.pending")}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="fade-in-delayed flex items-center space-x-1 ml-4">
              <button
                onClick={() => setIsEditing(true)}
                className="btn-edit-animation p-2 text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300 backdrop-blur-sm rounded-lg hover:bg-blue-500/10 hover:scale-110 hover:rotate-6"
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
                className="btn-delete-animation p-2 text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-all duration-300 backdrop-blur-sm rounded-lg hover:bg-red-500/10 hover:scale-110 hover:-rotate-6"
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
