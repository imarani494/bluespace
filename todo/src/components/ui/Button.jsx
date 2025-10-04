import React from "react";
import LoadingSpinner from "../common/LoadingSpinner";

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const getVariantClasses = () => {
    const base =
      "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95";

    const variants = {
      primary:
        "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 focus:ring-blue-500 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40",
      secondary:
        "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 focus:ring-gray-500 border border-gray-200 dark:border-gray-600",
      outline:
        "border border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:ring-blue-500",
      ghost:
        "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700/50 focus:ring-gray-500",
      danger:
        "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-lg shadow-red-500/25 hover:shadow-red-500/40"
    };

    const sizes = {
      small: "px-3 py-2 text-sm",
      medium: "px-4 py-2.5 text-sm",
      large: "px-6 py-3 text-base"
    };

    return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  };

  return (
    <button
      className={getVariantClasses()}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <LoadingSpinner size="small" className="mr-2" />}
      {children}
    </button>
  );
};

export default Button;
