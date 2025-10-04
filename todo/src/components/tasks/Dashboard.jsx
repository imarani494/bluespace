import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Dashboard = ({ stats }) => {
  const { t } = useLanguage();

  const StatCard = ({ title, value, subtitle, icon, color, trend }) => (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/20 transition-all duration-300 hover:shadow-xl hover:scale-105">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {value}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {subtitle}
          </p>
        </div>
        <div className={`p-3 rounded-xl ${color} text-white text-2xl`}>
          {icon}
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          <span className={`text-sm ${trend.color}`}>{trend.value}</span>
        </div>
      )}
    </div>
  );

  const ProgressBar = ({ percentage, color }) => (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
      <div
        className={`h-2 rounded-full transition-all duration-1000 ${color}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          {t('dashboard.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('dashboard.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t('dashboard.totalTasks')}
          value={stats.total}
          subtitle={t('dashboard.allTasks')}
          icon="📊"
          color="bg-blue-500"
        />
        <StatCard
          title={t('dashboard.completed')}
          value={stats.completed}
          subtitle={t('dashboard.done')}
          icon="✅"
          color="bg-green-500"
        />
        <StatCard
          title={t('dashboard.pending')}
          value={stats.pending}
          subtitle={t('dashboard.toDo')}
          icon="⏳"
          color="bg-yellow-500"
        />
        <StatCard
          title={t('dashboard.completionRate')}
          value={`${stats.completionRate}%`}
          subtitle={t('dashboard.efficiency')}
          icon="📈"
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/20">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('dashboard.progress')}
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {t('dashboard.completion')}
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {stats.completionRate}%
              </span>
            </div>
            <ProgressBar
              percentage={stats.completionRate}
              color="bg-gradient-to-r from-blue-500 to-purple-600"
            />
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/20">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('dashboard.insights')}
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {t('dashboard.productivity')}
              </span>
              <span className={`text-sm font-medium ${
                stats.completionRate >= 70 ? 'text-green-600' : 
                stats.completionRate >= 40 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {stats.completionRate >= 70 ? t('dashboard.excellent') :
                 stats.completionRate >= 40 ? t('dashboard.good') : t('dashboard.needsImprovement')}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {t('dashboard.activeTasks')}
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {stats.pending}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {t('dashboard.avgCompletion')}
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {stats.total > 0 ? Math.round(stats.completed / stats.total * 100) : 0}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;