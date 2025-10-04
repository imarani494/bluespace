import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import LoadingSpinner from '../common/LoadingSpinner';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, loading, searchTerm, onTasksUpdate }) => {
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <LoadingSpinner size="large" text={t('ui.loading')} />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl flex items-center justify-center text-4xl">
          {searchTerm ? '🔍' : '📝'}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {searchTerm ? t('ui.noResults') : t('ui.noTasks')}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
          {searchTerm ? t('ui.tryDifferent') : t('ui.addFirstTask')}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {t('ui.showing')} <span className="font-semibold text-gray-900 dark:text-white">{tasks.length}</span>{' '}
          {t('tasks.title').toLowerCase()}
          {searchTerm && (
            <> {t('ui.for')} "<span className="font-semibold">{searchTerm}</span>"</>
          )}
        </p>
        
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <span>
            {tasks.filter(t => t.status === 'completed').length} {t('status.completed').toLowerCase()}
          </span>
          <span>•</span>
          <span>
            {tasks.filter(t => t.status === 'pending').length} {t('status.pending').toLowerCase()}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onTaskUpdated={onTasksUpdate}
            onTaskDeleted={onTasksUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;