import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { useLanguage } from '../contexts/LanguageContext';
import Button from '../ui/Button';
import Input from '../ui/Input';

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [showNotes, setShowNotes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { addTask } = useTasks();
  const { t } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError(t('tasks.errorTitleRequired'));
      return;
    }

    setLoading(true);
    setError('');

    try {
      await addTask({
        title: title.trim(),
        notes: notes.trim(),
        status: 'pending'
      });

      setTitle('');
      setNotes('');
      setShowNotes(false);
      if (onTaskAdded) onTaskAdded();
    } catch (err) {
      console.error('Error adding task:', err);
      setError(err.message || t('tasks.errorAddFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 p-6 transition-all duration-300">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3 mb-4">
          <div className="flex-1">
            <Input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError('');
              }}
              onFocus={() => setShowNotes(true)}
              disabled={loading}
              placeholder={t('tasks.titlePlaceholder')}
              className="text-lg"
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            loading={loading}
            disabled={!title.trim() || loading}
            className="whitespace-nowrap shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
          >
            {t('tasks.addTask')}
          </Button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50/80 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        {showNotes && (
          <div className="mt-4 p-4 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl border border-gray-200/50 dark:border-gray-600/50 backdrop-blur-sm">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t('tasks.notesPlaceholder')}
              className="w-full px-3 py-2 bg-white/50 dark:bg-gray-600/50 border border-gray-200 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none transition-all duration-200"
              rows="3"
              disabled={loading}
            />
            <div className="flex justify-end mt-3 space-x-2">
              <Button
                type="button"
                variant="ghost"
                size="small"
                onClick={() => {
                  setShowNotes(false);
                  setError('');
                }}
                disabled={loading}
              >
                {t('tasks.cancel')}
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="small"
                loading={loading}
                disabled={!title.trim() || loading}
              >
                {t('tasks.save')}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default TaskForm;