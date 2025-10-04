import React from "react";
import { useAuth } from "../hooks/useAuth";
import LoadingSpinner from "./LoadingSpinner";
import AuthForm from "../auth/AuthForm";
import TodoApp from "../tasks/TodoApp";

const AppRouter = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner size="large" text="Loading your tasks..." />
      </div>
    );
  }

  return user ? <TodoApp /> : <AuthForm />;
};

export default AppRouter;
