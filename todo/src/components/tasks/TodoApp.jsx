import React, { useState, useMemo } from "react";
import { useTasks } from "../contexts/TaskContext";
import { useLanguage } from "../contexts/LanguageContext";
import Header from "../common/Header";
import Dashboard from "./Dashboard";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import CalendarSidebar from "./CalendarSidebar";

const TodoApp = () => {
  const { tasks, loading, updateTask, deleteTask, fetchTasks } = useTasks();
  const { t, language } = useLanguage();

  const [activeView, setActiveView] = useState("tasks");
  const [searchTerm, setSearchTerm] = useState("");
  const [showTaskForm, setShowTaskForm] = useState(true);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const filteredTasks = useMemo(() => {
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.notes &&
          task.notes.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [tasks, searchTerm]);

  const handleUpdateTask = async (taskId, updates) => {
    try {
      await updateTask(taskId, updates);
    } catch (error) {
      console.error("Error updating task:", error);
      alert(
        language === "en"
          ? "Failed to update task"
          : "कार्य अपडेट करने में विफल"
      );
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
    } catch (error) {
      console.error("Error deleting task:", error);
      alert(
        language === "en" ? "Failed to delete task" : "कार्य हटाने में विफल"
      );
    }
  };

  const handleTaskAdded = () => {
    fetchTasks();
    setShowTaskForm(false);
  };

  const handleFormClose = () => {
    setShowTaskForm(false);
  };

  const handleShowForm = () => {
    setShowTaskForm(true);
  };

  const handleCalendarToggle = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-100/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-300">
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onCalendarToggle={handleCalendarToggle}
        onAddTask={handleShowForm} 
      />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          <div
            className={`${
              isCalendarOpen ? "w-2/3" : "w-full"
            } transition-all duration-300`}
          >
            {activeView === "dashboard" ? (
              <Dashboard />
            ) : (
              <div className="space-y-8">
                <div className="text-center space-y-2">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {t("tasks.title")}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    {language === "en"
                      ? "Manage your tasks efficiently"
                      : "अपने कार्यों को कुशलतापूर्वक प्रबंधित करें"}
                  </p>

                  {!showTaskForm && (
                    <button
                      onClick={handleShowForm}
                      className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      {t("tasks.addTask")}
                    </button>
                  )}
                </div>

                
                {showTaskForm && (
                  <TaskForm
                    onTaskAdded={handleTaskAdded}
                    onClose={handleFormClose}
                  />
                )}

                <TaskList
                  tasks={filteredTasks}
                  searchTerm={searchTerm}
                  onUpdateTask={handleUpdateTask}
                  onDeleteTask={handleDeleteTask}
                />
              </div>
            )}
          </div>

         
          {isCalendarOpen && (
            <div className="w-1/3 transition-all duration-300">
              <CalendarSidebar
                onTaskAdded={handleTaskAdded}
                onClose={() => setIsCalendarOpen(false)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
