import React from 'react'
import { useLanguage } from '../../contexts/LanguageContext'

const Dashboard = ({ stats }) => {
  const { t } = useLanguage()

  const StatCard = ({ icon, value, label, color }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color} mr-4`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{label}</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t('dashboard.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Overview of your productivity and task management
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon="📊"
          value={stats.total}
          label={t('dashboard.totalTasks')}
          color="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
        />
        <StatCard
          icon="✅"
          value={stats.completed}
          label={t('dashboard.completedTasks')}
          color="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
        />
        <StatCard
          icon="⏳"
          value={stats.pending}
          label={t('dashboard.pendingTasks')}
          color="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400"
        />
        <StatCard
          icon="📈"
          value={`${stats.completionRate}%`}
          label={t('dashboard.completionRate')}
          color="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Productivity Insights
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Completion Progress</span>
            <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${stats.completionRate}%` }}
              ></div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Active Tasks</span>
            <span className="font-medium text-gray-900 dark:text-white">{stats.pending}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard