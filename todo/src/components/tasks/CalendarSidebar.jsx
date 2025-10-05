
import React, { useState, useMemo } from "react";
import { useTasks } from "../contexts/TaskContext";
import { useLanguage } from "../contexts/LanguageContext";

const CalendarSidebar = ({ onTaskAdded, onClose }) => {
  const { tasks, addTask } = useTasks();
  const { t, language } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    notes: "",
    priority: "medium"
  });

  
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();


  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();


  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();


  const calendarDays = useMemo(() => {
    const days = [];

  
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

  
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      days.push(date);
    }

    return days;
  }, [currentMonth, currentYear, firstDayOfMonth, daysInMonth]);

  
  const getTasksForDate = (date) => {
    if (!date) return [];

    return tasks.filter((task) => {
      if (!task.due_date) return false;
      const taskDate = new Date(task.due_date);
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });
  };


  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

 
  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

 
  const handleDateSelect = (date) => {
    if (!date) return;
    setSelectedDate(date);
    setShowTaskForm(true);
    setNewTask((prev) => ({
      ...prev,
      dueDate: date.toISOString().split("T")[0] 
    }));
  };


  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    try {
      await addTask({
        title: newTask.title,
        notes: newTask.notes,
        dueDate: selectedDate.toISOString(),
        priority: newTask.priority,
        status: "pending"
      });

      setNewTask({
        title: "",
        notes: "",
        priority: "medium"
      });
      setShowTaskForm(false);

      if (onTaskAdded) {
        onTaskAdded();
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  
  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

 
  const isSelected = (date) => {
    if (!date || !selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };


  const monthNames =
    language === "en"
      ? [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ]
      : [
          "जनवरी",
          "फरवरी",
          "मार्च",
          "अप्रैल",
          "मई",
          "जून",
          "जुलाई",
          "अगस्त",
          "सितंबर",
          "अक्टूबर",
          "नवंबर",
          "दिसंबर"
        ];

 
  const dayNames =
    language === "en"
      ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      : ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"];

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/30 p-6 h-fit sticky top-8">
    
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
          {t("ui.calendar")}
        </h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
        >
          <svg
            className="w-5 h-5"
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
      </div>

    
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
          {monthNames[currentMonth]} {currentYear}
        </h3>

        <button
          onClick={nextMonth}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      
      <div className="grid grid-cols-7 gap-1 mb-4">
      
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-slate-500 dark:text-slate-400 py-2"
          >
            {day}
          </div>
        ))}

      
        {calendarDays.map((date, index) => {
          const tasksForDate = date ? getTasksForDate(date) : [];
          const hasTasks = tasksForDate.length > 0;

          return (
            <button
              key={index}
              onClick={() => handleDateSelect(date)}
              disabled={!date}
              className={`
                relative h-12 rounded-xl text-sm font-medium transition-all duration-200
                ${!date ? "invisible" : ""}
                ${
                  isToday(date)
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                    : isSelected(date)
                    ? "bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                }
              `}
            >
              {date && date.getDate()}

            
              {hasTasks && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {tasksForDate.slice(0, 3).map((task, taskIndex) => (
                    <div
                      key={taskIndex}
                      className={`w-1 h-1 rounded-full ${
                        task.priority === "high"
                          ? "bg-red-500"
                          : task.priority === "medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>

   
      {showTaskForm && selectedDate && (
        <div className="bg-slate-50/80 dark:bg-slate-700/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-200 dark:border-slate-600">
          <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">
            {language === "en"
              ? `Add task for ${selectedDate.toLocaleDateString()}`
              : `${selectedDate.toLocaleDateString()} के लिए कार्य जोड़ें`}
          </h4>

          <form onSubmit={handleCreateTask} className="space-y-3">
            <input
              type="text"
              value={newTask.title}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder={t("tasks.titlePlaceholder")}
              className="w-full px-3 py-2 bg-white/50 dark:bg-slate-600/50 border border-slate-200 dark:border-slate-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />

            <div className="flex space-x-2">
              <select
                value={newTask.priority}
                onChange={(e) =>
                  setNewTask((prev) => ({ ...prev, priority: e.target.value }))
                }
                className="flex-1 px-3 py-2 bg-white/50 dark:bg-slate-600/50 border border-slate-200 dark:border-slate-500 rounded-lg"
              >
                <option value="low">{t("priority.low")}</option>
                <option value="medium">{t("priority.medium")}</option>
                <option value="high">{t("priority.high")}</option>
              </select>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {t("tasks.addTask")}
              </button>
            </div>
          </form>
        </div>
      )}

   
      <div className="mt-6">
        <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">
          {language === "en" ? "Upcoming Tasks" : "आगामी कार्य"}
        </h4>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {tasks
            .filter(
              (task) => task.due_date && new Date(task.due_date) >= new Date()
            )
            .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
            .slice(0, 5)
            .map((task) => (
              <div
                key={task.id}
                className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600"
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    task.priority === "high"
                      ? "bg-red-500"
                      : task.priority === "medium"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                    {task.title}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {new Date(task.due_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}

          {tasks.filter(
            (task) => task.due_date && new Date(task.due_date) >= new Date()
          ).length === 0 && (
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">
              {language === "en" ? "No upcoming tasks" : "कोई आगामी कार्य नहीं"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarSidebar;
