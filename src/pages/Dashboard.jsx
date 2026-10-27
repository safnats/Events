import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiCalendar,
  FiTag,
  FiMapPin,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiCompass,
  FiLayers,
  FiCreditCard,
  FiExternalLink
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { bookingService } from '../services/bookingService';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

export const Dashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
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

  const totalTickets = bookings.reduce((sum, b) => sum + (b.ticketQuantity || 1), 0);
  const totalSpent = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  const activeBookings = bookings.filter((b) => b.ticketValidity === 'Active');

  return (
    <div style={{ backgroundColor: '#FAF7FC', minHeight: '85vh' }} className="py-4 pb-5">
      <div className="content-container">
        {/* Welcome Banner */}
        <div
          className="rounded-4 p-4 p-md-5 mb-4 text-white position-relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #350047 0%, #230030 100%)',
            boxShadow: '0 10px 30px rgba(35, 0, 48, 0.2)'
          }}
        >
          <div className="row align-items-center g-3 position-relative" style={{ zIndex: 2 }}>
            <div className="col-md-8">
              <span
                className="badge px-3 py-1 mb-2 rounded-pill"
                style={{ backgroundColor: '#F43F8C', fontSize: '0.75rem' }}
              >
                ATTENDEE PORTAL
              </span>
              <h1 className="h2 fw-bold text-white mb-2">
                Welcome back, {user?.name || 'Attendee'}!
              </h1>
              <p className="text-white-50 mb-0">
                Manage your passes, check event itineraries, and discover upcoming live experiences.
              </p>
            </div>
            <div className="col-md-4 text-md-end">
              <Link to="/events" className="btn btn-accent-pink px-4 py-2">
                <FiCompass size={16} /> Explore Events
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="row g-3 mb-4">
          <div className="col-lg-3 col-sm-6">
            <div className="eventra-card p-4">
              <div className="text-muted small mb-1">Total Tickets Booked</div>
              <div className="h3 fw-bold mb-0" style={{ color: '#350047' }}>
                {totalTickets}
              </div>
              <div className="small text-success mt-2 d-flex align-items-center gap-1">
                <FiCheckCircle size={14} /> Ready for entry
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6">
            <div className="eventra-card p-4">
              <div className="text-muted small mb-1">Upcoming Events</div>
              <div className="h3 fw-bold mb-0" style={{ color: '#F43F8C' }}>
                {activeBookings.length}
              </div>
              <div className="small text-muted mt-2">
                Confirmed reservations
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6">
            <div className="eventra-card p-4">
              <div className="text-muted small mb-1">Total Investment</div>
              <div className="h3 fw-bold mb-0" style={{ color: '#350047' }}>
                ${totalSpent}
              </div>
              <div className="small text-muted mt-2">
                Processed receipts
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6">
            <div className="eventra-card p-4">
              <div className="text-muted small mb-1">Member Status</div>
              <div className="h3 fw-bold mb-0 text-success">
                Active VIP
              </div>
              <div className="small text-muted mt-2">
                Priority entry tier
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Bookings Section */}
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="bg-white rounded-4 p-4 border shadow-sm mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h5 fw-bold mb-0" style={{ color: '#350047' }}>
                  Upcoming Bookings & Digital Passes
                </h2>
                <Link to="/my-bookings" className="small fw-semibold" style={{ color: '#F43F8C' }}>
                  View All ({bookings.length}) &rarr;
                </Link>
              </div>

              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border spinner-border-sm text-primary" role="status" />
                </div>
              ) : activeBookings.length > 0 ? (
                <div className="d-flex flex-column gap-3">
                  {activeBookings.map((bkg) => (
                    <div
                      key={bkg.id}
                      className="p-3 rounded-3 border d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 hover-shadow transition-all"
                      style={{ backgroundColor: '#FAF7FC' }}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <ImageWithFallback
                          src={bkg.eventImage}
                          alt=""
                          className="rounded-3"
                          style={{ width: 80, height: 65, objectFit: 'cover' }}
                        />
                        <div>
                          <span
                            className="badge px-2 py-1 mb-1 rounded-pill"
                            style={{ backgroundColor: 'rgba(244, 63, 140, 0.15)', color: '#F43F8C', fontSize: '0.7rem' }}
                          >
                            Ref: {bkg.bookingReference}
                          </span>
                          <h4 className="h6 fw-bold mb-1" style={{ color: '#350047' }}>
                            {bkg.eventTitle}
                          </h4>
                          <div className="d-flex flex-wrap align-items-center gap-2 text-muted" style={{ fontSize: '0.78rem' }}>
                            <span className="d-flex align-items-center gap-1">
                              <FiCalendar size={12} /> {bkg.eventDate}
                            </span>
                            <span>&bull;</span>
                            <span className="d-flex align-items-center gap-1">
                              <FiMapPin size={12} /> {bkg.eventVenue}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex align-items-center justify-content-between justify-content-md-end gap-3 pt-2 pt-md-0 border-top border-md-top-0">
                        <div className="text-md-end">
                          <div className="fw-bold small" style={{ color: '#350047' }}>
                            {bkg.ticketQuantity}x {bkg.ticketTier}
                          </div>
                          <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                            ${bkg.totalAmount} Total
                          </div>
                        </div>

                        <Link
                          to={`/my-bookings/${bkg.id}`}
                          className="btn btn-sm btn-accent-pink px-3"
                        >
                          View Ticket
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-5">
                  <p className="text-muted small mb-3">You don't have any upcoming bookings yet.</p>
                  <Link to="/events" className="btn btn-sm btn-primary-purple">
                    Browse Events
                  </Link>
                </div>
              )}
            </div>

            {/* Recent Booking History Table */}
            <div className="bg-white rounded-4 p-4 border shadow-sm">
              <h2 className="h5 fw-bold mb-3" style={{ color: '#350047' }}>
                Recent Order History
              </h2>
              <div className="table-responsive">
                <table className="table align-middle table-hover mb-0">
                  <thead className="table-light small">
                    <tr>
                      <th>Booking Ref</th>
                      <th>Event</th>
                      <th>Date</th>
                      <th>Tickets</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="small">
                    {bookings.map((b) => (
                      <tr key={b.id}>
                        <td className="fw-semibold text-secondary">{b.bookingReference}</td>
                        <td className="fw-semibold text-truncate" style={{ maxWidth: 180, color: '#350047' }}>
                          {b.eventTitle}
                        </td>
                        <td className="text-muted">{b.bookingDate?.split(' ')[0] || b.eventDate}</td>
                        <td>{b.ticketQuantity}</td>
                        <td className="fw-bold" style={{ color: '#350047' }}>${b.totalAmount}</td>
                        <td>
                          <span className="badge bg-success bg-opacity-10 text-success px-2 py-1">
                            {b.paymentStatus}
                          </span>
                        </td>
                        <td>
                          <Link to={`/my-bookings/${b.id}`} className="text-decoration-none small" style={{ color: '#F43F8C' }}>
                            Pass &rarr;
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Links & Helpful Tools */}
          <div className="col-lg-4">
            <div className="bg-white rounded-4 p-4 border shadow-sm mb-4">
              <h3 className="h6 fw-bold mb-3" style={{ color: '#350047' }}>
                Quick Shortcuts
              </h3>
              <div className="d-flex flex-column gap-2">
                <Link
                  to="/events"
                  className="p-3 rounded-3 border d-flex align-items-center justify-content-between text-decoration-none hover-bg-light transition-all"
                  style={{ color: '#350047' }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <FiCompass style={{ color: '#F43F8C' }} />
                    <span className="small fw-semibold">Explore New Events</span>
                  </div>
                  <FiArrowRight size={14} className="text-muted" />
                </Link>

                <Link
                  to="/my-bookings"
                  className="p-3 rounded-3 border d-flex align-items-center justify-content-between text-decoration-none hover-bg-light transition-all"
                  style={{ color: '#350047' }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <FiLayers style={{ color: '#350047' }} />
                    <span className="small fw-semibold">All My Digital Tickets</span>
                  </div>
                  <FiArrowRight size={14} className="text-muted" />
                </Link>

                <Link
                  to="/contact"
                  className="p-3 rounded-3 border d-flex align-items-center justify-content-between text-decoration-none hover-bg-light transition-all"
                  style={{ color: '#350047' }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <FiCreditCard style={{ color: '#10B981' }} />
                    <span className="small fw-semibold">Support & Inquiries</span>
                  </div>
                  <FiArrowRight size={14} className="text-muted" />
                </Link>
              </div>
            </div>

            {/* Need Help Box */}
            <div
              className="rounded-4 p-4 text-white"
              style={{ background: 'linear-gradient(135deg, #350047 0%, #4c0463 100%)' }}
            >
              <h4 className="h6 fw-bold mb-2 text-white">Need Assistance?</h4>
              <p className="text-white-50 small mb-3">
                Have questions about venue access, wheelchair accommodation, or ticket transfers?
              </p>
              <Link to="/contact" className="btn btn-sm btn-accent-pink w-100">
                Contact Concierge Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
