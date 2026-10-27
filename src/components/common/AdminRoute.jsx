import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiShield, FiAlertTriangle } from 'react-icons/fi';

export const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading, switchDemoRole } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border" style={{ color: '#350047' }} role="status">
          <span className="visually-hidden">Loading Admin...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return (
      <div className="content-container py-5 my-5 text-center">
        <div
          className="eventra-card p-5 mx-auto"
          style={{ maxWidth: 540, borderColor: '#FED7AA' }}
        >
          <div
            className="d-inline-flex p-3 rounded-circle mb-3"
            style={{ backgroundColor: '#FFEDD5', color: '#EA580C' }}
          >
            <FiShield size={36} />
          </div>
          <h2 className="h4 fw-bold mb-2" style={{ color: '#350047' }}>
            Administrator Access Required
          </h2>
          <p className="text-muted mb-4">
            You are currently signed in as an attendee. The requested area is reserved for Eventra event organizers and platform administrators.
          </p>
          <div className="d-flex flex-column flex-sm-row justify-content-center gap-2">
            <button
              onClick={() => switchDemoRole('admin')}
              className="btn btn-primary-purple"
            >
              Switch to Admin Demo Account
            </button>
            <button
              onClick={() => window.history.back()}
              className="btn btn-outline-purple"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
};
