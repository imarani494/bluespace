import React from "react";
import Button from "./Button";

const Modal = ({ isOpen, onClose, title, children, actions }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div
            className="absolute inset-0 bg-gray-500/75 dark:bg-gray-900/75 backdrop-blur-sm"
            onClick={onClose}
          />
        </div>

        <div className="relative inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/20 dark:border-gray-700/20">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {title}
            </h3>
          )}

          <div className="mt-2">{children}</div>

          {actions && (
            <div className="mt-6 flex justify-end space-x-3">{actions}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
