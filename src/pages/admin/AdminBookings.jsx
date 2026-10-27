import React, { useState, useEffect } from 'react';
import {
  FiSearch,
  FiFilter,
  FiDownload,
  FiEye,
  FiX,
  FiCheckCircle,
  FiCalendar,
  FiMapPin,
  FiUser
} from 'react-icons/fi';
import { bookingService } from '../../services/bookingService';
import { adminService } from '../../services/adminService';
import { useNotification } from '../../context/NotificationContext';

export const AdminBookings = () => {
  const { success } = useNotification();
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      const data = await bookingService.getAllBookings();
      setBookings(data);
      setLoading(false);
    };

    fetchBookings();
  }, []);

  const filtered = bookings.filter((b) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        b.bookingReference.toLowerCase().includes(q) ||
        b.attendeeName.toLowerCase().includes(q) ||
        b.attendeeEmail.toLowerCase().includes(q) ||
        b.eventTitle.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (statusFilter !== 'All' && b.paymentStatus !== statusFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="d-flex flex-column gap-4">
      {/* Header */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
        <div>
          <h1 className="h4 fw-bold mb-1" style={{ color: '#1F0E2A' }}>
            Bookings & Order Processing
          </h1>
          <p className="text-muted small mb-0">
            Audit payments, investigate customer reservations, and generate transactional receipts.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            adminService.exportBookingsCSV();
            success('Bookings ledger exported to CSV!');
          }}
          className="btn btn-sm btn-outline-purple d-inline-flex align-items-center gap-2"
        >
          <FiDownload size={15} /> Export Transactions
        </button>
      </div>

      {/* Filters and Search */}
      <div className="admin-card p-3">
        <div className="row g-3 align-items-center">
          <div className="col-md-6 col-lg-5">
            <div className="position-relative">
              <FiSearch
                className="position-absolute text-muted"
                style={{ top: '50%', left: 14, transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                className="form-control form-control-sm ps-5"
                placeholder="Search reference, attendee, event..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ borderRadius: 8, height: 38 }}
              />
            </div>
          </div>

          <div className="col-md-4 col-lg-3">
            <select
              className="form-select form-select-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ borderRadius: 8, height: 38 }}
            >
              <option value="All">All Payment Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>

          <div className="col-md-2 col-lg-4 text-md-end text-muted small">
            Showing <strong>{filtered.length}</strong> orders
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="admin-card p-0 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light small">
              <tr>
                <th>Booking Ref</th>
                <th>Attendee</th>
                <th>Event</th>
                <th>Ticket Tier / Qty</th>
                <th>Date & Time</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>
            <tbody className="small">
              {loading ? (
                <tr>
                  <td colSpan="9" className="text-center py-4">
                    <div className="spinner-border spinner-border-sm text-primary" role="status" />
                  </td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((b) => (
                  <tr key={b.id}>
                    <td className="fw-mono fw-bold" style={{ color: '#350047' }}>
                      {b.bookingReference}
                    </td>

                    <td>
                      <div className="fw-bold" style={{ color: '#1F0E2A' }}>
                        {b.attendeeName}
                      </div>
                      <div className="text-muted" style={{ fontSize: '0.72rem' }}>
                        {b.attendeeEmail}
                      </div>
                    </td>

                    <td className="fw-semibold text-truncate" style={{ maxWidth: 200, color: '#1F0E2A' }}>
                      {b.eventTitle}
                    </td>

                    <td>
                      <div>{b.ticketTier}</div>
                      <span className="badge bg-light text-secondary border" style={{ fontSize: '0.7rem' }}>
                        {b.ticketQuantity}x Tickets
                      </span>
                    </td>

                    <td className="text-muted">
                      {b.bookingDate}
                    </td>

                    <td className="fw-bold" style={{ color: '#350047' }}>
                      ${b.totalAmount}
                    </td>

                    <td>
                      <span className="badge bg-success bg-opacity-10 text-success">
                        {b.paymentStatus}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`badge ${
                          b.bookingStatus === 'Confirmed'
                            ? 'bg-primary bg-opacity-10 text-primary'
                            : 'bg-warning bg-opacity-10 text-warning'
                        }`}
                      >
                        {b.bookingStatus}
                      </span>
                    </td>

                    <td className="text-end">
                      <button
                        type="button"
                        onClick={() => setSelectedBooking(b)}
                        className="btn btn-sm btn-light p-1 px-2 text-primary"
                        title="View Full Booking Breakdown"
                      >
                        <FiEye size={15} /> Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-4 text-muted">
                    No bookings found matching query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div
          className="modal show fade d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1055 }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow">
              <div
                className="modal-header text-white"
                style={{ backgroundColor: '#350047' }}
              >
                <h5 className="modal-title h6 fw-bold text-white mb-0">
                  Booking Receipt #{selectedBooking.bookingReference}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setSelectedBooking(null)}
                />
              </div>

              <div className="modal-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                  <span className="text-muted small">Unique Ticket ID</span>
                  <span className="fw-mono fw-bold" style={{ color: '#350047' }}>
                    {selectedBooking.ticketId}
                  </span>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted small">Event</span>
                  <span className="fw-semibold text-end" style={{ color: '#1F0E2A', maxWidth: 240 }}>
                    {selectedBooking.eventTitle}
                  </span>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted small">Attendee</span>
                  <span className="fw-semibold">{selectedBooking.attendeeName}</span>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted small">Attendee Email</span>
                  <span>{selectedBooking.attendeeEmail}</span>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted small">Ticket Tier</span>
                  <span className="badge-pink-pill">{selectedBooking.ticketTier}</span>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted small">Quantity</span>
                  <span className="fw-bold">{selectedBooking.ticketQuantity} admission(s)</span>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                  <span className="text-muted small">Total Paid</span>
                  <span className="fs-5 fw-bold" style={{ color: '#350047' }}>
                    ${selectedBooking.totalAmount}
                  </span>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted small">Ticket Validity</span>
                  <span className="badge bg-success">{selectedBooking.ticketValidity}</span>
                </div>
              </div>

              <div className="modal-footer bg-light p-3">
                <button
                  type="button"
                  className="btn btn-sm btn-secondary"
                  onClick={() => setSelectedBooking(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
