/**
 * ============================================
 * COMPONENTES UI REUTILIZABLES
 * ============================================
 * Librería de componentes para mantener consistencia
 */

import { useState } from 'react';
import { FaSpinner, FaTimes, FaCheck, FaExclamationTriangle, FaInfo } from 'react-icons/fa';

// ==================== BOTONES ====================
export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  ...props 
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-cyan-500 to-violet-600 hover:opacity-90 text-white',
    secondary: 'border border-dark-600 hover:border-cyan-500 hover:text-cyan-400',
    danger: 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30',
    success: 'bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30',
    ghost: 'hover:bg-dark-800 text-dark-400 hover:text-white'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      className={`
        ${variants[variant]} 
        ${sizes[size]} 
        rounded-xl font-medium transition-all duration-300 
        flex items-center justify-center gap-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <FaSpinner className="animate-spin" />}
      {!loading && Icon && iconPosition === 'left' && <Icon />}
      {children}
      {!loading && Icon && iconPosition === 'right' && <Icon />}
    </button>
  );
};

// ==================== INPUTS ====================
export const Input = ({ 
  label, 
  error, 
  icon: Icon, 
  className = '',
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-2 text-dark-300">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-500" />
        )}
        <input
          className={`
            w-full px-4 py-3 bg-dark-900 border rounded-xl 
            focus:outline-none focus:ring-1 transition-colors
            ${Icon ? 'pl-12' : ''}
            ${error 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
              : 'border-dark-700 focus:border-cyan-500 focus:ring-cyan-500'
            }
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
          <FaExclamationTriangle size={12} /> {error}
        </p>
      )}
    </div>
  );
};

// ==================== TEXTAREA ====================
export const Textarea = ({ 
  label, 
  error, 
  className = '',
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-2 text-dark-300">
          {label}
        </label>
      )}
      <textarea
        className={`
          w-full px-4 py-3 bg-dark-900 border rounded-xl 
          focus:outline-none focus:ring-1 transition-colors resize-none
          ${error 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
            : 'border-dark-700 focus:border-cyan-500 focus:ring-cyan-500'
          }
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
          <FaExclamationTriangle size={12} /> {error}
        </p>
      )}
    </div>
  );
};

// ==================== SELECT ====================
export const Select = ({ 
  label, 
  options = [], 
  error,
  className = '',
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-2 text-dark-300">
          {label}
        </label>
      )}
      <select
        className={`
          w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-xl 
          focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 
          transition-colors
          ${className}
        `}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};

// ==================== CARD ====================
export const Card = ({ 
  children, 
  className = '', 
  hover = true,
  padding = true,
  ...props 
}) => {
  return (
    <div
      className={`
        bg-dark-800/50 rounded-2xl border border-dark-700 
        ${hover ? 'hover:border-dark-600 transition-all duration-300' : ''}
        ${padding ? 'p-6' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

// ==================== BADGE ====================
export const Badge = ({ 
  children, 
  variant = 'default',
  size = 'md',
  className = '' 
}) => {
  const variants = {
    default: 'bg-dark-700 text-dark-300',
    primary: 'bg-cyan-500/20 text-cyan-400',
    success: 'bg-green-500/20 text-green-400',
    warning: 'bg-yellow-500/20 text-yellow-400',
    danger: 'bg-red-500/20 text-red-400',
    info: 'bg-blue-500/20 text-blue-400'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5'
  };

  return (
    <span className={`
      ${variants[variant]} 
      ${sizes[size]} 
      rounded-full font-medium
      ${className}
    `}>
      {children}
    </span>
  );
};

// ==================== MODAL ====================
export const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  size = 'md',
  showClose = true 
}) => {
  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-full mx-4'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className={`
        relative bg-dark-900 rounded-2xl w-full ${sizes[size]} 
        max-h-[90vh] overflow-hidden border border-dark-700
      `}>
        {title && (
          <div className="flex justify-between items-center p-6 border-b border-dark-700">
            <h2 className="text-xl font-bold">{title}</h2>
            {showClose && (
              <button 
                onClick={onClose}
                className="text-dark-400 hover:text-white transition-colors"
              >
                <FaTimes size={24} />
              </button>
            )}
          </div>
        )}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

// ==================== LOADING SPINNER ====================
export const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };

  return (
    <div className={`
      ${sizes[size]} 
      border-dark-600 border-t-cyan-500 
      rounded-full animate-spin
      ${className}
    `} />
  );
};

// ==================== LOADING SCREEN ====================
export const LoadingScreen = ({ message = 'Cargando...' }) => {
  return (
    <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center">
      <Spinner size="lg" />
      <p className="mt-4 text-dark-400">{message}</p>
    </div>
  );
};

// ==================== EMPTY STATE ====================
export const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  action 
}) => {
  return (
    <div className="text-center py-12">
      {Icon && <Icon className="text-5xl text-dark-600 mx-auto mb-4" />}
      <h3 className="text-lg font-medium text-dark-300 mb-2">{title}</h3>
      {description && <p className="text-dark-500 mb-4">{description}</p>}
      {action}
    </div>
  );
};

// ==================== ALERT ====================
export const Alert = ({ 
  type = 'info', 
  title, 
  message, 
  onClose 
}) => {
  const types = {
    info: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', icon: FaInfo },
    success: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', icon: FaCheck },
    warning: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', icon: FaExclamationTriangle },
    error: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', icon: FaExclamationTriangle }
  };

  const config = types[type];
  const Icon = config.icon;

  return (
    <div className={`${config.bg} ${config.border} border rounded-xl p-4 flex items-start gap-3`}>
      <Icon className={`${config.text} mt-0.5 flex-shrink-0`} />
      <div className="flex-1">
        {title && <h4 className={`font-medium ${config.text}`}>{title}</h4>}
        <p className="text-dark-300 text-sm">{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="text-dark-400 hover:text-white">
          <FaTimes />
        </button>
      )}
    </div>
  );
};

// ==================== SKELETON LOADER ====================
export const Skeleton = ({ className = '', variant = 'text' }) => {
  const variants = {
    text: 'h-4 rounded',
    title: 'h-8 rounded w-3/4',
    avatar: 'h-12 w-12 rounded-full',
    card: 'h-48 rounded-2xl',
    image: 'h-40 rounded-xl'
  };

  return (
    <div className={`
      bg-dark-700 animate-pulse 
      ${variants[variant]}
      ${className}
    `} />
  );
};

// ==================== TABS ====================
export const Tabs = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex gap-2 border-b border-dark-700 pb-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`
            px-4 py-2 rounded-lg flex items-center gap-2 transition-colors
            ${activeTab === tab.id 
              ? 'bg-cyan-500/20 text-cyan-400' 
              : 'text-dark-400 hover:bg-dark-800 hover:text-white'
            }
          `}
        >
          {tab.icon && <tab.icon />}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

// ==================== TOOLTIP ====================
export const Tooltip = ({ children, text, position = 'top' }) => {
  const [show, setShow] = useState(false);

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className={`
          absolute ${positions[position]} z-50
          px-3 py-1.5 bg-dark-800 text-white text-sm rounded-lg
          border border-dark-700 whitespace-nowrap
        `}>
          {text}
        </div>
      )}
    </div>
  );
};

export default {
  Button,
  Input,
  Textarea,
  Select,
  Card,
  Badge,
  Modal,
  Spinner,
  LoadingScreen,
  EmptyState,
  Alert,
  Skeleton,
  Tabs,
  Tooltip
};
