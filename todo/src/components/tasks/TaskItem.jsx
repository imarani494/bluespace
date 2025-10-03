import React, { useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import { useLanguage } from "../../contexts/LanguageContext";
import Button from "../ui/Button";

const TaskItem = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editNotes, setEditNotes] = useState(task.notes || "");
  const [loading, setLoading] = useState(false);

  const { updateTask, deleteTask } = useTasks();
  const { t } = useLanguage();

  const handleToggleComplete = async () => {
    setLoading(true);
    try {
      await updateTask(task.id, {
        status: task.status === "completed" ? "pending" : "completed"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!editTitle.trim()) return;

    setLoading(true);
    try {
      await updateTask(task.id, {
        title: editTitle.trim(),
        notes: editNotes.trim()
      });
      setIsEditing(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(t("tasks.confirmDelete"))) return;

    setLoading(true);
    try {
      await deleteTask(task.id);
    } finally {
      setLoading(false);
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-3">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          disabled={loading}
        />
        <textarea
          value={editNotes}
          onChange={(e) => setEditNotes(e.target.value)}
          placeholder={t("tasks.notesPlaceholder")}
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
          disabled={loading}
        />
        <div className="flex gap-2 justify-end">
          <Button
            variant="outline"
            size="small"
            onClick={() => setIsEditing(false)}
            disabled={loading}
          >
            {t("tasks.cancel")}
          </Button>
          <Button
            variant="primary"
            size="small"
            onClick={handleSaveEdit}
            loading={loading}
            disabled={!editTitle.trim() || loading}
          >
            {t("tasks.save")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-3 transition-all duration-200 ${
        task.status === "completed" ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={handleToggleComplete}
          disabled={loading}
          className={`flex-shrink-0 w-5 h-5 rounded-full border-2 mt-1 transition-all duration-200 ${
            task.status === "completed"
              ? "bg-primary border-primary"
              : "border-gray-300 dark:border-gray-600 hover:border-primary"
          } ${loading ? "opacity-50" : ""}`}
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
          <h3
            className={`text-gray-900 dark:text-white font-medium ${
              task.status === "completed" ? "line-through" : ""
            }`}
          >
            {task.title}
          </h3>
          {task.notes && (
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              {task.notes}
            </p>
          )}
          <p className="text-gray-500 dark:text-gray-500 text-xs mt-2">
            {new Date(task.created_at).toLocaleDateString()}
          </p>
        </div>

        <div className="flex gap-1 flex-shrink-0">
          <Button
            variant="ghost"
            size="small"
            onClick={() => setIsEditing(true)}
            disabled={loading}
          >
            {t("tasks.edit")}
          </Button>
          <Button
            variant="ghost"
            size="small"
            onClick={handleDelete}
            loading={loading}
            disabled={loading}
            className="text-red-600 hover:text-red-700"
          >
            {t("tasks.delete")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
