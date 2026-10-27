import React, { useState } from 'react';
import {
  FiBell,
  FiCheck,
  FiCheckCircle,
  FiTag,
  FiUserCheck,
  FiAlertCircle
} from 'react-icons/fi';
import { useNotification } from '../../context/NotificationContext';

export const AdminNotifications = () => {
  const { success } = useNotification();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'High-Demand Alert: Neon Horizon Festival',
      message: 'Tickets reached 85% capacity threshold. Recommended to open VIP tier waitlist.',
      time: '15 mins ago',
      type: 'warning',
      read: false
    },
    {
      id: 2,
      title: 'Bulk Ticket Purchase Cleared',
      message: 'Apex Capital confirmed order for 4x VIP Partner passes ($3,000). Receipt generated.',
      time: '1 hour ago',
      type: 'success',
      read: false
    },
    {
      id: 3,
      title: 'Gate Scanner Node Synchronized',
      message: 'Brooklyn Mirage Entrance Turnstile A & B updated to firmware v4.2.1.',
      time: '3 hours ago',
      type: 'info',
      read: true
    }
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    success('All alerts marked as read.');
  };

  return (
    <div className="d-flex flex-column gap-4">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h1 className="h4 fw-bold mb-1" style={{ color: '#1F0E2A' }}>
            Event Alert Center
          </h1>
          <p className="text-muted small mb-0">
            Real-time notifications regarding gate traffic, ticket inventory spikes, and settlements.
          </p>
        </div>

        <button
          type="button"
          onClick={markAllRead}
          className="btn btn-sm btn-outline-purple d-inline-flex align-items-center gap-2"
        >
          <FiCheck size={16} /> Mark All Read
        </button>
      </div>

      <div className="d-flex flex-column gap-3">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`admin-card p-4 transition-all ${!item.read ? 'border-primary' : ''}`}
            style={{
              backgroundColor: !item.read ? '#FFFFFF' : '#FAF8FB',
              borderLeftWidth: 4,
              borderLeftColor: item.type === 'warning' ? '#F59E0B' : item.type === 'success' ? '#10B981' : '#350047'
            }}
          >
            <div className="d-flex justify-content-between align-items-start mb-1">
              <h2 className="h6 fw-bold mb-0" style={{ color: '#1F0E2A' }}>
                {item.title}
              </h2>
              <span className="text-muted small" style={{ fontSize: '0.75rem' }}>
                {item.time}
              </span>
            </div>
            <p className="text-secondary small mb-0">{item.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
