import React, { useState } from 'react'
import { useTasks } from '../../hooks/useTasks'
import { useLanguage } from '../../contexts/LanguageContext'
import Button from '../ui/Button'
import Input from '../ui/Input'

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const [showNotes, setShowNotes] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const { addTask } = useTasks()
  const { t } = useLanguage()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return

    setLoading(true)
    try {
      const { error } = await addTask({
        title: title.trim(),
        notes: notes.trim()
      })

      if (!error) {
        setTitle('')
        setNotes('')
        setShowNotes(false)
        onTaskAdded?.()
      }
    } catch (error) {
      console.error('Error adding task:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3 mb-3">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t('tasks.titlePlaceholder')}
            className="flex-1"
            onFocus={() => setShowNotes(true)}
            disabled={loading}
          />
          <Button
            type="submit"
            variant="primary"
            loading={loading}
            disabled={!title.trim() || loading}
          >
            {t('tasks.addTask')}
          </Button>
        </div>

        {showNotes && (
          <div className="mt-3">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t('tasks.notesPlaceholder')}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
              disabled={loading}
            />
          </div>
        )}
      </form>
    </div>
  )
}

export default TaskForm