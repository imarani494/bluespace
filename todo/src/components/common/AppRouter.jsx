import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import AuthForm from '../auth/AuthForm';
import TodoApp from '../tasks/TodoApp';
import LoadingSpinner from './LoadingSpinner';

const AppRouter = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return user ? <TodoApp /> : <AuthForm />;
};

export default AppRouter;