import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
  FiXCircle,
  FiX
} from 'react-icons/fi';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((type = 'info', message = '', duration = 4000) => {
    const id = Date.now() + Math.random();
    const newToast = { id, type, message };
    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  const value = {
    showToast,
    success: (msg, dur) => showToast('success', msg, dur),
    error: (msg, dur) => showToast('error', msg, dur),
    info: (msg, dur) => showToast('info', msg, dur),
    warning: (msg, dur) => showToast('warning', msg, dur)
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <div className="toast-floating-container" aria-live="polite">
        {toasts.map((toast) => {
          let icon = <FiInfo className="text-primary fs-5" />;
          let borderColor = '#F43F8C';

          if (toast.type === 'success') {
            icon = <FiCheckCircle style={{ color: '#10B981', fontSize: '1.25rem', flexShrink: 0 }} />;
            borderColor = '#10B981';
          } else if (toast.type === 'error') {
            icon = <FiXCircle style={{ color: '#EF4444', fontSize: '1.25rem', flexShrink: 0 }} />;
            borderColor = '#EF4444';
          } else if (toast.type === 'warning') {
            icon = <FiAlertCircle style={{ color: '#F59E0B', fontSize: '1.25rem', flexShrink: 0 }} />;
            borderColor = '#F59E0B';
          } else {
            icon = <FiInfo style={{ color: '#350047', fontSize: '1.25rem', flexShrink: 0 }} />;
            borderColor = '#350047';
          }

          return (
            <div
              key={toast.id}
              className="toast-alert"
              style={{ borderLeftColor: borderColor }}
            >
              {icon}
              <div style={{ flex: 1, fontSize: '0.92rem', color: '#1F0E2A', fontWeight: 500 }}>
                {toast.message}
              </div>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#9CA3AF',
                  cursor: 'pointer',
                  padding: 2
                }}
                aria-label="Close notification"
              >
                <FiX size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
