import React, { useState } from 'react';
import Header from './Header';
import TaskList from '../tasks/TaskList';
import TaskForm from '../tasks/TaskForm';
import { useLanguage } from '../../contexts/LanguageContext';

const Layout = () => {
  const [filter, setFilter] = useState('all');
  const { t } = useLanguage();

  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        <div className="container">
          <div className="tasks-header">
            <h1>{t('tasks.title')}</h1>
            <div className="filter-tabs">
              <button 
                className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                {t('tasks.all')}
              </button>
              <button 
                className={`filter-tab ${filter === 'pending' ? 'active' : ''}`}
                onClick={() => setFilter('pending')}
              >
                {t('tasks.pending')}
              </button>
              <button 
                className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
                onClick={() => setFilter('completed')}
              >
                {t('tasks.completed')}
              </button>
            </div>
          </div>
          
          <TaskForm />
          <TaskList filter={filter} />
        </div>
      </main>
    </div>
  );
};

export default Layout;