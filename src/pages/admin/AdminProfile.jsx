import React from 'react';
import { FiUser, FiMail, FiShield, FiKey, FiCalendar } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

export const AdminProfile = () => {
  const { user } = useAuth();

  return (
    <div className="d-flex flex-column gap-4" style={{ maxWidth: 760 }}>
      <div>
        <h1 className="h4 fw-bold mb-1" style={{ color: '#1F0E2A' }}>
          Organizer & Admin Profile
        </h1>
        <p className="text-muted small mb-0">
          Administrator account credentials and organization settings.
        </p>
      </div>

      <div className="admin-card p-4">
        <div className="d-flex align-items-center gap-4 pb-4 border-bottom mb-4">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'}
            alt=""
            className="rounded-circle"
            style={{ width: 80, height: 80, objectFit: 'cover', border: '3px solid #F43F8C' }}
          />
          <div>
            <span className="badge px-3 py-1 mb-1 rounded-pill" style={{ backgroundColor: '#F43F8C', color: '#fff' }}>
              PLATFORM ADMINISTRATOR
            </span>
            <h2 className="h5 fw-bold mb-0" style={{ color: '#1F0E2A' }}>
              {user?.name || 'Elena Vance'}
            </h2>
            <div className="text-muted small">{user?.email || 'admin@eventra.com'}</div>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label small fw-semibold text-secondary">Display Name</label>
            <input type="text" className="form-control" defaultValue={user?.name || 'Elena Vance'} />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-semibold text-secondary">Work Email</label>
            <input type="email" className="form-control" defaultValue={user?.email || 'admin@eventra.com'} />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-semibold text-secondary">Admin Role Clearance</label>
            <input type="text" disabled className="form-control bg-light" defaultValue="Global Super Administrator" />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-semibold text-secondary">API Secret Token Key</label>
            <input type="password" disabled className="form-control bg-light" defaultValue="evt_sec_live_9841804812" />
          </div>
        </div>

        <div className="mt-4 pt-3 border-top text-end">
          <button type="button" className="btn btn-accent-pink px-4">
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};
