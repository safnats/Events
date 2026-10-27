import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCalendar } from 'react-icons/fi';

export const CallToAction = () => {
  return (
    <section className="py-5" style={{ backgroundColor: '#FAF7FC' }}>
      <div className="content-container">
        <div
          className="rounded-4 p-5 position-relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #350047 0%, #230030 100%)',
            boxShadow: '0 20px 50px rgba(35, 0, 48, 0.3)',
            color: '#FFFFFF'
          }}
        >
          {/* Decorative glow circles */}
          <div
            style={{
              position: 'absolute',
              top: '-40%',
              right: '-10%',
              width: 400,
              height: 400,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(244, 63, 140, 0.35) 0%, rgba(244, 63, 140, 0) 70%)',
              pointerEvents: 'none'
            }}
          />

          <div className="row align-items-center g-4 position-relative" style={{ zIndex: 2 }}>
            <div className="col-lg-8">
              <span
                className="badge mb-3 px-3 py-2 rounded-pill"
                style={{ backgroundColor: 'rgba(244, 63, 140, 0.25)', color: '#FF70AA', border: '1px solid rgba(244, 63, 140, 0.4)' }}
              >
                Experience The Excitement
              </span>
              <h2 className="display-6 fw-bold text-white mb-3" style={{ letterSpacing: '-0.02em' }}>
                Your Next Unforgettable Memory Begins Today.
              </h2>
              <p className="text-white-50 mb-0" style={{ fontSize: '1.1rem', maxWidth: 600 }}>
                Join over 250,000 attendees booking tickets to legendary festivals, intimate acoustic stages, and transformative summits.
              </p>
            </div>

            <div className="col-lg-4 text-lg-end">
              <div className="d-flex flex-column flex-sm-row justify-content-lg-end gap-3">
                <Link to="/events" className="btn btn-accent-pink px-4 py-3 fw-bold">
                  Browse Events <FiArrowRight size={18} />
                </Link>
                <Link to="/admin/events/create" className="btn btn-outline-light-custom px-4 py-3">
                  Host an Event
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
