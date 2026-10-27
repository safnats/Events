import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiCalendar,
  FiMapPin,
  FiTag,
  FiArrowRight,
  FiDownload,
  FiCheckCircle,
  FiFilter
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { bookingService } from '../services/bookingService';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { useNotification } from '../context/NotificationContext';

export const MyBookings = () => {
  const { user } = useAuth();
  const { success } = useNotification();
  const [bookings, setBookings] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      setLoading(true);
      const data = await bookingService.getUserBookings(user?.email);
      setBookings(data);
      setLoading(false);
    };

    if (user?.email) {
      loadBookings();
    }
  }, [user]);

  const filtered = bookings.filter((b) => {
    if (filterStatus === 'All') return true;
    if (filterStatus === 'Confirmed') return b.bookingStatus === 'Confirmed';
    if (filterStatus === 'Used') return b.ticketValidity === 'Used';
    return true;
  });

  return (
    <div style={{ backgroundColor: '#FAF7FC', minHeight: '85vh' }} className="py-4 pb-5">
      <div className="content-container">
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div>
            <span className="badge-pink-pill mb-2">My Ticket Wallet</span>
            <h1 className="h2 fw-bold mb-1" style={{ color: '#350047' }}>
              My Bookings & Passes
            </h1>
            <p className="text-muted small mb-0">
              Manage your confirmed admissions, digital entry passes, and tax receipts.
            </p>
          </div>

          <Link to="/events" className="btn btn-primary-purple d-inline-flex align-items-center gap-2">
            Browse More Events
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="d-flex gap-2 mb-4">
          {['All', 'Confirmed', 'Used'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilterStatus(tab)}
              className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold ${
                filterStatus === tab
                  ? 'btn-accent-pink'
                  : 'bg-white border text-secondary'
              }`}
            >
              {tab === 'All' ? `All Bookings (${bookings.length})` : tab}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : filtered.length > 0 ? (
          <div className="d-flex flex-column gap-3">
            {filtered.map((bkg) => (
              <div
                key={bkg.id}
                className="eventra-card p-4 d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-4"
              >
                {/* Left Thumbnail & Event Info */}
                <div className="d-flex align-items-center gap-4 flex-grow-1">
                  <div
                    className="rounded-3 overflow-hidden flex-shrink-0"
                    style={{ width: 140, height: 95, backgroundColor: '#350047' }}
                  >
                    <ImageWithFallback
                      src={bkg.eventImage}
                      alt={bkg.eventTitle}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <div>
                    <div className="d-flex flex-wrap align-items-center gap-2 mb-1">
                      <span
                        className="badge px-2 py-1 rounded-pill"
                        style={{ backgroundColor: '#FAF7FC', color: '#350047', border: '1px solid #E8E2EE', fontSize: '0.72rem' }}
                      >
                        Ref: {bkg.bookingReference}
                      </span>
                      <span className="badge bg-success bg-opacity-10 text-success" style={{ fontSize: '0.72rem' }}>
                        {bkg.paymentStatus}
                      </span>
                      <span className="badge bg-primary bg-opacity-10 text-primary" style={{ fontSize: '0.72rem' }}>
                        {bkg.bookingStatus}
                      </span>
                    </div>

                    <h3 className="h5 fw-bold mb-1" style={{ color: '#350047' }}>
                      <Link
                        to={`/my-bookings/${bkg.id}`}
                        style={{ color: '#350047', textDecoration: 'none' }}
                        className="hover-pink"
                      >
                        {bkg.eventTitle}
                      </Link>
                    </h3>

                    <div className="d-flex flex-wrap align-items-center gap-3 text-muted small">
                      <span className="d-flex align-items-center gap-1">
                        <FiCalendar style={{ color: '#F43F8C' }} />
                        {bkg.eventDate} at {bkg.eventTime}
                      </span>
                      <span>&bull;</span>
                      <span className="d-flex align-items-center gap-1">
                        <FiMapPin style={{ color: '#F43F8C' }} />
                        {bkg.eventVenue}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Middle: Ticket info & total */}
                <div className="d-flex align-items-center justify-content-between justify-content-lg-end gap-4 border-top border-lg-top-0 pt-3 pt-lg-0">
                  <div className="text-start text-lg-end">
                    <div className="text-muted small">Tier & Quantity</div>
                    <div className="fw-semibold small" style={{ color: '#350047' }}>
                      {bkg.ticketQuantity}x {bkg.ticketTier}
                    </div>
                  </div>

                  <div className="text-end">
                    <div className="text-muted small">Total Paid</div>
                    <div className="fw-bold fs-5" style={{ color: '#F43F8C' }}>
                      ${bkg.totalAmount}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="d-flex align-items-center gap-2">
                    <Link
                      to={`/my-bookings/${bkg.id}`}
                      className="btn btn-accent-pink px-3 py-2 d-inline-flex align-items-center gap-2"
                    >
                      View Ticket <FiArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-4 p-5 text-center border">
            <h3 className="h5 fw-bold mb-2" style={{ color: '#350047' }}>
              No Bookings Found
            </h3>
            <p className="text-muted small mb-4">
              You haven't reserved tickets for any events in this view yet.
            </p>
            <Link to="/events" className="btn btn-primary-purple">
              Explore Events Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
