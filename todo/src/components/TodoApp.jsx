import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useTasks } from '../hooks/useTasks'
import Header from './layout/Header'
import TaskForm from './tasks/TaskForm'
import TaskList from './tasks/TaskList'
import Dashboard from './tasks/Dashboard'

const TodoApp = () => {
  const { user } = useAuth()
  const { tasks, loading, refetch } = useTasks()
  const [activeView, setActiveView] = useState('tasks')
  const [searchTerm, setSearchTerm] = useState('')

  // Filter tasks based on search term
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (task.notes && task.notes.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  // Calculate stats for dashboard
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    completionRate: tasks.length > 0 
      ? Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100)
      : 0
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {activeView === 'dashboard' ? (
          <Dashboard stats={stats} tasks={tasks} />
        ) : (
          <>
            <TaskForm onTaskAdded={refetch} />
            <TaskList
              tasks={filteredTasks}
              loading={loading}
              searchTerm={searchTerm}
            />
          </>
        )}
      </main>
    </div>
  )
}

export default TodoApp