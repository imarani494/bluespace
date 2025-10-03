import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import Layout from '../layout/Layout';
import AuthForm from '../auth/AuthForm';
import LoadingSpinner from '../ui/LoadingSpinner';

const AppRouter = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <LoadingSpinner />
      </div>
    );
  }

  return user ? <Layout /> : <AuthForm mode="login" />;
};

export default AppRouter;