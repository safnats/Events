import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiCompass } from 'react-icons/fi';

export const NotFound = () => {
  return (
    <div
      style={{
        backgroundColor: '#FAF7FC',
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center'
      }}
      className="py-5 text-center"
    >
      <div className="content-container">
        <div className="eventra-card p-5 mx-auto bg-white border" style={{ maxWidth: 540 }}>
          <div
            className="display-1 fw-bold mb-2"
            style={{ color: '#F43F8C', letterSpacing: '-0.04em' }}
          >
            404
          </div>
          <h1 className="h3 fw-bold mb-3" style={{ color: '#350047' }}>
            Page Not Found
          </h1>
          <p className="text-muted small mb-4">
            The page you are looking for may have moved, expired, or been rescheduled to another venue.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/" className="btn btn-primary-purple d-inline-flex align-items-center gap-2">
              <FiHome /> Back to Home
            </Link>
            <Link to="/events" className="btn btn-outline-pink d-inline-flex align-items-center gap-2">
              <FiCompass /> Browse Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
