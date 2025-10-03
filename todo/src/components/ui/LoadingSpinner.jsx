import React from 'react'

const LoadingSpinner = ({ size = 'medium', className = '' }) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-4 h-4'
      case 'medium':
        return 'w-8 h-8'
      case 'large':
        return 'w-12 h-12'
      default:
        return 'w-8 h-8'
    }
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${getSizeClasses()} border-2 border-gray-300 border-t-primary rounded-full animate-spin`}
      ></div>
    </div>
  )
}

export default LoadingSpinner