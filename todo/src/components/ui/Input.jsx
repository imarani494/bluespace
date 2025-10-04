import React from "react";

const Input = ({ label, error, icon, className = "", ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={`
            w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            bg-white/50 dark:bg-gray-700/50
            text-gray-900 dark:text-white
            placeholder-gray-500 dark:placeholder-gray-400
            backdrop-blur-sm
            ${
              error
                ? "border-red-300 dark:border-red-500 focus:ring-red-500"
                : ""
            }
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default Input;
