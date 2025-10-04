import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { useLanguage } from '../contexts/LanguageContext';
import Button from '../ui/Button';
import LoadingSpinner from '../common/LoadingSpinner';

const TaskItem = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editNotes, setEditNotes] = useState(task.notes || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { updateTask, deleteTask } = useTasks();
  const { t } = useLanguage();

  const handleToggleComplete = async () => {
    setLoading(true);
    setError('');

    try {
      const newStatus = task.status === 'completed' ? 'pending' : 'completed';
      await updateTask(task.id, { status: newStatus });
      if (onTaskUpdated) onTaskUpdated();
    } catch (err) {
      console.error('Error updating task:', err);
      setError(err.message || t('tasks.errorUpdateFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!editTitle.trim()) {
      setError(t('tasks.errorTitleRequired'));
      return;
    }

    setLoading(true);
    setError('');

    try {
      await updateTask(task.id, {
        title: editTitle.trim(),
        notes: editNotes.trim()
      });
      setIsEditing(false);
      if (onTaskUpdated) onTaskUpdated();
    } catch (err) {
      console.error('Error updating task:', err);
      setError(err.message || t('tasks.errorUpdateFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(t('tasks.confirmDelete'))) return;

    setLoading(true);
    setError('');

    try {
      await deleteTask(task.id);
      if (onTaskDeleted) onTaskDeleted();
    } catch (err) {
      console.error('Error deleting task:', err);
      setError(err.message || t('tasks.errorDeleteFailed'));
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditTitle(task.title);
    setEditNotes(task.notes || '');
    setError('');
  };

  if (isEditing) {
    return (
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-blue-200 dark:border-blue-800 transition-all duration-300">
        <div className="space-y-4">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => {
              setEditTitle(e.target.value);
              setError('');
            }}
            className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-medium text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
            placeholder={t('tasks.titlePlaceholder')}
            disabled={loading}
            autoFocus
          />
          
          <textarea
            value={editNotes}
            onChange={(e) => setEditNotes(e.target.value)}
            placeholder={t('tasks.notesPlaceholder')}
            className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none transition-all duration-200"
            rows="3"
            disabled={loading}
          />

          {error && (
            <div className="p-3 bg-red-50/80 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <Button
              variant="ghost"
              onClick={cancelEdit}
              disabled={loading}
            >
              {t('tasks.cancel')}
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveEdit}
              loading={loading}
              disabled={!editTitle.trim() || loading}
            >
              {t('tasks.save')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/20 transition-all duration-300 hover:shadow-xl hover:scale-105 ${
      task.status === 'completed' ? 'opacity-75' : ''
    }`}>
      <div className="flex items-start space-x-4">
        <button
          onClick={handleToggleComplete}
          disabled={loading}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 mt-1 ${
            task.status === 'completed'
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
          } ${loading ? 'opacity-50' : ''}`}
        >
          {loading ? (
            <LoadingSpinner size="small" />
          ) : task.status === 'completed' ? (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : null}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3
                className={`text-lg font-medium cursor-pointer transition-colors duration-200 ${
                  task.status === 'completed'
                    ? 'text-gray-500 dark:text-gray-400 line-through'
                    : 'text-gray-900 dark:text-white'
                }`}
                onClick={handleToggleComplete}
              >
                {task.title}
              </h3>
              
              {task.notes && (
                <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {task.notes}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2 ml-4">
              <Button
                variant="ghost"
                size="small"
                onClick={() => setIsEditing(true)}
                disabled={loading}
                title={t('tasks.edit')}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </Button>
              
              <Button
                variant="ghost"
                size="small"
                onClick={handleDelete}
                disabled={loading}
                title={t('tasks.delete')}
                className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
              >
                {loading ? (
                  <LoadingSpinner size="small" />
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                )}
              </Button>
            </div>
          </div>

          <div className="mt-3 flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
            <span>
              {new Date(task.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
            {task.updated_at !== task.created_at && (
              <span>
                • Edited {new Date(task.updated_at).toLocaleDateString()}
              </span>
            )}
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              task.status === 'completed'
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
            }`}>
              {task.status === 'completed' ? t('status.completed') : t('status.pending')}
            </span>
          </div>

          {error && (
            <div className="mt-3 p-2 bg-red-50/80 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-xs">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;