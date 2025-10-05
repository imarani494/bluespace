import React from "react";
import { useTasks } from "../contexts/TaskContext";
import { useLanguage } from "../contexts/LanguageContext";

const Dashboard = () => {
  const { tasks } = useTasks();
  const { t } = useLanguage();

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;
  const pendingTasks = tasks.filter((task) => task.status === "pending").length;
  const completionRate =
    tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const recentTasks = tasks
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          {t("dashboard.title")}
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          {t("dashboard.overview")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {t("dashboard.totalTasks")}
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {tasks.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {t("dashboard.completedTasks")}
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {completedTasks}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-yellow-600 dark:text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {t("dashboard.pendingTasks")}
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {pendingTasks}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-purple-600 dark:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {t("dashboard.completionRate")}
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {completionRate}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section - Simplified */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          {t("dashboard.recentActivity")}
        </h2>
        <div className="space-y-3">
          {recentTasks.length > 0 ? (
            recentTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700 last:border-0"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      task.status === "completed"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  ></div>
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    {task.title}
                  </span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {new Date(task.created_at).toLocaleDateString()}
                </span>
              </div>
            ))
          ) : (
            <p className="text-slate-500 dark:text-slate-400 text-center py-4">
              {t("tasks.noTasks")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
