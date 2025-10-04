import React, { useState, useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTasks } from '../hooks/useTasks';
import Header from '../common/Header';
import Dashboard from './Dashboard';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { useLanguage } from '../contexts/LanguageContext';

const TodoApp = () => {
  const { user } = useAuth();
  const { tasks, loading, fetchTasks } = useTasks();
  const [activeView, setActiveView] = useState('tasks');
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useLanguage();

  const filteredTasks = useMemo(() => {
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.notes && task.notes.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [tasks, searchTerm]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'completed').length;
    const pending = tasks.filter((t) => t.status === 'pending').length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, pending, completionRate };
  }, [tasks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-100/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-300">
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {activeView === 'dashboard' ? (
          <Dashboard stats={stats} />
        ) : (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {t('tasks.title')}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {t('ui.overview')}
              </p>
            </div>

            <TaskForm onTaskAdded={fetchTasks} />
            <TaskList
              tasks={filteredTasks}
              loading={loading}
              searchTerm={searchTerm}
              onTasksUpdate={fetchTasks}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default TodoApp;