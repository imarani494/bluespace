import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import { useLanguage } from "../contexts/LanguageContext";

const TaskList = ({ tasks, searchTerm, onUpdateTask, onDeleteTask }) => {
  const { t, language, translateTaskContent } = useLanguage();
  const [translatedTasks, setTranslatedTasks] = useState([]);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationProgress, setTranslationProgress] = useState(0);

  
  useEffect(() => {
    const translateAllTasks = async () => {
      if (language === "en") {
        setTranslatedTasks(tasks);
        return;
      }

      setIsTranslating(true);
      setTranslationProgress(0);

      try {
      
        const progressInterval = setInterval(() => {
          setTranslationProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return 90;
            }
            return prev + 10;
          });
        }, 200);

        const translated = await Promise.all(
          tasks.map(async (task, index) => {
          
            setTranslationProgress((index / tasks.length) * 80);

            return {
              ...task,
              displayTitle: await translateTaskContent(task.title || ""),
              displayNotes: task.notes
                ? await translateTaskContent(task.notes)
                : null
            };
          })
        );

        clearInterval(progressInterval);
        setTranslationProgress(100);

        
        setTimeout(() => {
          setTranslatedTasks(translated);
          setIsTranslating(false);
          setTranslationProgress(0);
        }, 300);
      } catch (error) {
        console.error("Translation error:", error);
        setTranslatedTasks(tasks);
        setIsTranslating(false);
        setTranslationProgress(0);
      }
    };

    if (tasks && tasks.length > 0) {
      translateAllTasks();
    } else {
      setTranslatedTasks([]);
    }
  }, [tasks, language, translateTaskContent]);


  const filteredTasks = translatedTasks.filter((task) => {
    const title = task.displayTitle || task.title || "";
    const notes = task.displayNotes || task.notes || "";
    const search = searchTerm || "";

    return (
      title.toLowerCase().includes(search.toLowerCase()) ||
      notes.toLowerCase().includes(search.toLowerCase())
    );
  });

  if (isTranslating) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-center w-full max-w-md">
         
          <div className="mb-6">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${translationProgress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
              <span>
                {language === "en" ? "Translating..." : "अनुवाद हो रहा है..."}
              </span>
              <span>{Math.round(translationProgress)}%</span>
            </div>
          </div>

         
          <div className="flex justify-center space-x-2 mb-4">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                style={{ animationDelay: `${index * 0.1}s` }}
              ></div>
            ))}
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {language === "en"
              ? "Translating your tasks..."
              : "आपके कार्यों का अनुवाद हो रहा है..."}
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-xs mt-2">
            {language === "en"
              ? "This will only take a moment..."
              : "यह केवल एक पल लेगा..."}
          </p>
        </div>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center">
          <svg
            className="w-10 h-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {t("tasks.noTasks")}
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          {t("tasks.addFirstTask")}
        </p>
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center">
          <svg
            className="w-10 h-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {t("ui.noResults")}
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          {t("ui.tryDifferent")}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
     
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t("tasks.title")}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {filteredTasks.length} {language === "en" ? "tasks" : "कार्य"}
          </p>
        </div>
      </div>

 
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="transition-all duration-200 hover:translate-x-1"
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
