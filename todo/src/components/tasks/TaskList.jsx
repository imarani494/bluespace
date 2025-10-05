import React from "react";
import TaskItem from "./TaskItem";
import { useLanguage } from "../contexts/LanguageContext";

const TaskList = ({ tasks, searchTerm, onUpdateTask, onDeleteTask }) => {
  const { t } = useLanguage();

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.notes?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (tasks.length === 0) {
    return (
      <div className="animate-fade-in text-center py-16">
        <div className="animate-float w-28 h-28 mx-auto mb-6 bg-gradient-to-br from-blue-100/50 to-purple-100/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-2xl">
          <div className="animate-pulse-slow w-14 h-14 text-blue-500/80">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-3">
          {t("tasks.noTasks")}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          {t("tasks.addFirstTask")}
        </p>
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <div className="animate-fade-in text-center py-16">
        <div className="animate-float-delayed w-28 h-28 mx-auto mb-6 bg-gradient-to-br from-orange-100/50 to-red-100/50 dark:from-orange-900/20 dark:to-red-900/20 rounded-3xl flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-2xl">
          <div className="animate-pulse w-14 h-14 text-orange-500/80">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-3">
          {t("ui.noResults") || "No tasks found"}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          {t("ui.tryDifferent") || "Try adjusting your search terms"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
  
      <div className="animate-slide-in-left flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl backdrop-blur-sm border border-white/20">
        <h2 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
          {t("tasks.title")}
          <span className="counter-animation ml-2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
            {filteredTasks.length}
          </span>
        </h2>

        <div className="animate-fade-in-delayed flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {filteredTasks.length} tasks
          </span>
        </div>
      </div>

    
      <div className="space-y-4">
        {filteredTasks.map((task, index) => (
          <div
            key={task.id}
            className="task-item-animation"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <TaskItem
              task={task}
              onUpdate={onUpdateTask}
              onDelete={onDeleteTask}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
