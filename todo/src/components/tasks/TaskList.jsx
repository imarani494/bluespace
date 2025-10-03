import React from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import TaskItem from './TaskItem'
import LoadingSpinner from '../ui/LoadingSpinner'

const TaskList = ({ tasks, loading, searchTerm }) => {
  const { t } = useLanguage()

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📝</div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {searchTerm ? t('ui.noResults') : t('ui.noTasks')}
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          {searchTerm ? t('ui.tryDifferent') : t('ui.addFirstTask')}
        </p>
      </div>
    )
  }

  return (
    <div>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  )
}

export default TaskList