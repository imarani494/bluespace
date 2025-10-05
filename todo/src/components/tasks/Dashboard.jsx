import React, { useState, useEffect } from "react";
import { useTasks } from "../contexts/TaskContext";
import { useLanguage } from "../contexts/LanguageContext";

const Dashboard = () => {
  const { tasks } = useTasks();
  const { t, language, translateTaskContent } = useLanguage();
  const [translatedTasks, setTranslatedTasks] = useState([]);
  const [isTranslating, setIsTranslating] = useState(false);


  useEffect(() => {
    const translateTaskTitles = async () => {
      if (language === "en") {
        setTranslatedTasks(tasks);
        return;
      }

      setIsTranslating(true);
      try {
        const translated = await Promise.all(
          tasks.map(async (task) => ({
            ...task,
            displayTitle: await translateTaskContent(task.title || "")
          }))
        );
        setTranslatedTasks(translated);
      } catch (error) {
        console.error("Translation error:", error);
        setTranslatedTasks(tasks);
      } finally {
        setIsTranslating(false);
      }
    };

    if (tasks && tasks.length > 0) {
      translateTaskTitles();
    } else {
      setTranslatedTasks([]);
    }
  }, [tasks, language, translateTaskContent]);

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;
  const pendingTasks = tasks.filter((task) => task.status === "pending").length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === "inProgress"
  ).length;
  const completionRate =
    tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const recentTasks = translatedTasks
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  const inProgressTasksList = translatedTasks
    .filter((task) => task.status === "inProgress")
    .slice(0, 5);

 
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString(
        language === "hi" ? "hi-IN" : "en-US",
        {
          day: "numeric",
          month: "short",
          year: "numeric"
        }
      );
    } catch {
      return "Invalid date";
    }
  };

  if (isTranslating) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {language === "en" ? "Updating dashboard..." : "डैशबोर्ड अपडेट हो रहा है..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
     
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t("dashboard.title")}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t("dashboard.overview")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200">
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t("dashboard.totalTasks")}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {tasks.length}
              </p>
            </div>
          </div>
        </div>

  
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200">
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t("dashboard.completedTasks")}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {completedTasks}
              </p>
            </div>
          </div>
        </div>

      
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200">
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t("dashboard.pendingTasks")}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {pendingTasks}
              </p>
            </div>
          </div>
        </div>

       
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200">
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t("dashboard.completionRate")}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {completionRate}%
              </p>
            </div>
          </div>
        </div>
      </div>

     
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("dashboard.inProgressTasks")}
            </h2>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-lg">
              {inProgressTasks}
            </span>
          </div>
          <div className="space-y-3">
            {inProgressTasksList.length > 0 ? (
              inProgressTasksList.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-800/30"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {task.displayTitle || task.title}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(task.created_at)}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {t("tasks.noTasks")}
                </p>
              </div>
            )}
          </div>
        </div>

     
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("dashboard.recentActivity")}
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {recentTasks.length} {language === "en" ? "tasks" : "कार्य"}
            </span>
          </div>
          <div className="space-y-3">
            {recentTasks.length > 0 ? (
              recentTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-600"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        task.status === "completed"
                          ? "bg-green-500"
                          : task.status === "inProgress"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                      }`}
                    ></div>
                    <div className="min-w-0 flex-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block truncate">
                        {task.displayTitle || task.title}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                        {t(`tasks.${task.status}`)}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {formatDate(task.created_at)}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {t("tasks.noTasks")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

     
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {language === "en" ? "Progress Summary" : "प्रगति सारांश"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-800/30">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{completedTasks}</div>
            <div className="text-sm text-green-700 dark:text-green-300">{t("tasks.completed")}</div>
          </div>
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-800/30">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{inProgressTasks}</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">{t("tasks.inProgress")}</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg border border-yellow-100 dark:border-yellow-800/30">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{pendingTasks}</div>
            <div className="text-sm text-yellow-700 dark:text-yellow-300">{t("tasks.pending")}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;