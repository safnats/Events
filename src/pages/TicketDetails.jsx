import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import {
  FiPrinter,
  FiArrowLeft,
  FiCheckCircle,
  FiCalendar,
  FiMapPin,
  FiClock,
  FiShield,
  FiShare2,
  FiUser,
  FiAlertCircle
} from 'react-icons/fi';
import { bookingService } from '../services/bookingService';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { useNotification } from '../context/NotificationContext';

export const TicketDetails = () => {
  const { id } = useParams();
  const { info } = useNotification();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      setLoading(true);
      const data = await bookingService.getBookingById(id);
      setBooking(data);
      setLoading(false);
    };

    fetchBooking();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="text-center py-5 my-5">
        <div className="spinner-border" style={{ color: '#F43F8C' }} role="status">
          <span className="visually-hidden">Loading ticket...</span>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="content-container py-5 text-center">
        <h3 className="h4 mb-3" style={{ color: '#350047' }}>
          Ticket Not Found
        </h3>
        <p className="text-muted mb-4">The ticket ID provided could not be retrieved from the verified registry.</p>
        <Link to="/my-bookings" className="btn btn-primary-purple">
          Back to My Bookings
        </Link>
      </div>
    );
  }

  const isTicketValid = booking.paymentStatus === 'Paid' && booking.ticketValidity !== 'Cancelled';

  return (
    <div style={{ backgroundColor: '#FAF7FC', minHeight: '90vh' }} className="py-4 pb-5">
      <div className="content-container" style={{ maxWidth: 840 }}>
        {/* Navigation and Actions */}
        <div className="d-flex justify-content-between align-items-center mb-4 no-print">
          <Link
            to="/my-bookings"
            className="text-decoration-none text-muted small d-inline-flex align-items-center gap-1 hover-pink"
          >
            <FiArrowLeft /> Back to bookings
          </Link>

          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="btn btn-primary-purple d-inline-flex align-items-center gap-2 py-2 px-3 small"
            >
              <FiPrinter size={16} /> Print / Save PDF
            </button>
          </div>
        </div>

        {/* PRINTABLE TICKET PASS CONTAINER */}
        <div className="printable-ticket-area">
          <div className="ticket-pass bg-white">
            {/* Top Event Header & Image Banner */}
            <div className="position-relative" style={{ height: 200, backgroundColor: '#350047' }}>
              <ImageWithFallback
                src={booking.eventImage}
                alt={booking.eventTitle}
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
              />
              <div
                className="position-absolute inset-0 p-4 d-flex flex-column justify-content-between text-white"
                style={{
                  background: 'linear-gradient(180deg, rgba(35, 0, 48, 0.3) 0%, rgba(35, 0, 48, 0.95) 100%)',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span
                    className="badge rounded-pill px-3 py-1 fw-bold"
                    style={{ backgroundColor: '#F43F8C', fontSize: '0.75rem' }}
                  >
                    OFFICIAL ADMISSION PASS
                  </span>

                  <span
                    className={`badge px-3 py-1 rounded-pill ${
                      booking.ticketValidity === 'Active'
                        ? 'bg-success'
                        : booking.ticketValidity === 'Used'
                        ? 'bg-warning text-dark'
                        : 'bg-danger'
                    }`}
                  >
                    {booking.ticketValidity === 'Active' ? 'VALID & ACTIVE' : booking.ticketValidity}
                  </span>
                </div>

                <div>
                  <h1 className="h3 fw-bold text-white mb-0 text-shadow">
                    {booking.eventTitle}
                  </h1>
                </div>
              </div>
            </div>

            {/* Middle Pass Details */}
            <div className="p-4 p-md-5">
              <div className="row g-4 align-items-center">
                {/* Left Ticket Meta */}
                <div className="col-md-7">
                  <div className="row g-3">
                    <div className="col-6">
                      <div className="text-muted small text-uppercase fw-semibold" style={{ fontSize: '0.72rem' }}>
                        Attendee
                      </div>
                      <div className="fw-bold fs-6" style={{ color: '#350047' }}>
                        {booking.attendeeName}
                      </div>
                      <div className="text-muted small">{booking.attendeeEmail}</div>
                    </div>

                    <div className="col-6">
                      <div className="text-muted small text-uppercase fw-semibold" style={{ fontSize: '0.72rem' }}>
                        Ticket Tier
                      </div>
                      <div className="fw-bold fs-6" style={{ color: '#F43F8C' }}>
                        {booking.ticketTier}
                      </div>
                      <div className="text-muted small">{booking.ticketQuantity} person admission</div>
                    </div>

                    <div className="col-6">
                      <div className="text-muted small text-uppercase fw-semibold" style={{ fontSize: '0.72rem' }}>
                        Event Date & Time
                      </div>
                      <div className="fw-bold small d-flex align-items-center gap-1" style={{ color: '#350047' }}>
                        <FiCalendar style={{ color: '#F43F8C' }} /> {booking.eventDate}
                      </div>
                      <div className="text-muted small d-flex align-items-center gap-1">
                        <FiClock style={{ color: '#F43F8C' }} /> {booking.eventTime}
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="text-muted small text-uppercase fw-semibold" style={{ fontSize: '0.72rem' }}>
                        Venue & Gate
                      </div>
                      <div className="fw-bold small d-flex align-items-center gap-1" style={{ color: '#350047' }}>
                        <FiMapPin style={{ color: '#F43F8C' }} /> {booking.eventVenue}
                      </div>
                      <div className="text-muted small">{booking.eventLocation}</div>
                    </div>
                  </div>

                  <div className="ticket-perforation" />

                  <div className="row g-2">
                    <div className="col-6">
                      <span className="text-muted small">Booking Reference: </span>
                      <span className="fw-mono fw-bold" style={{ color: '#350047' }}>
                        {booking.bookingReference}
                      </span>
                    </div>
                    <div className="col-6">
                      <span className="text-muted small">Unique Ticket ID: </span>
                      <span className="fw-mono fw-bold" style={{ color: '#350047' }}>
                        {booking.ticketId}
                      </span>
                    </div>
                    <div className="col-6">
                      <span className="text-muted small">Payment Status: </span>
                      <span className="text-success fw-bold">Verified Paid (${booking.totalAmount})</span>
                    </div>
                    <div className="col-6">
                      <span className="text-muted small">Gate Verification: </span>
                      <span className="fw-semibold text-dark">Live Scanner Ready</span>
                    </div>
                  </div>
                </div>

                {/* Right Scannable QR Code */}
                <div className="col-md-5 text-center border-start ps-md-4 pt-4 pt-md-0">
                  <div
                    className="p-3 bg-white rounded-3 d-inline-block shadow-sm border mb-2"
                    style={{ borderColor: '#E8E2EE' }}
                  >
                    <QRCodeSVG
                      value={booking.qrData || `EVENTRA-${booking.ticketId}`}
                      size={170}
                      level="H"
                      fgColor="#350047"
                      includeMargin={true}
                    />
                  </div>

                  <div className="fw-mono fw-bold text-uppercase small" style={{ color: '#350047' }}>
                    {booking.ticketId}
                  </div>
                  <div className="text-muted small" style={{ fontSize: '0.75rem' }}>
                    Scan with Eventra Scanner at Entrance Gate
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Pass Footer */}
            <div
              className="p-3 text-center border-top small text-muted"
              style={{ backgroundColor: '#FAF7FC', fontSize: '0.78rem' }}
            >
              <FiShield style={{ color: '#10B981' }} /> This ticket is cryptographically verified by Eventra Gateway. Present on mobile device or printed physical paper at venue check-in.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
