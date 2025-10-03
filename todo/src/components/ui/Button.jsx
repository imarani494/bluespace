import React from 'react'
import LoadingSpinner from './LoadingSpinner'

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary text-white hover:bg-primary-dark focus:ring-primary'
      case 'secondary':
        return 'bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary'
      case 'outline':
        return 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-primary'
      case 'ghost':
        return 'text-gray-600 hover:bg-gray-100 focus:ring-gray-500'
      default:
        return 'bg-primary text-white hover:bg-primary-dark focus:ring-primary'
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'px-3 py-2 text-sm'
      case 'medium':
        return 'px-4 py-2.5 text-sm'
      case 'large':
        return 'px-6 py-3 text-base'
      default:
        return 'px-4 py-2.5 text-sm'
    }
  }

  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const classes = `${baseClasses} ${getVariantClasses()} ${getSizeClasses()} ${className}`

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <LoadingSpinner size="small" className="mr-2" />}
      {children}
    </button>
  )
}

export default Button