import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  FiX,
  FiMinus,
  FiPlus,
  FiCheck,
  FiShield,
  FiCreditCard,
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiMapPin
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { bookingService } from '../../services/bookingService';

export const BookingModal = ({ event, isOpen, onClose }) => {
  const { user, isAuthenticated } = useAuth();
  const { success, error } = useNotification();
  const navigate = useNavigate();

  const [selectedTier, setSelectedTier] = useState(
    event?.ticketTypes?.[0] || { name: 'General Admission', price: event?.startingPrice || 50 }
  );
  const [quantity, setQuantity] = useState(1);
  const [attendeeName, setAttendeeName] = useState(user?.name || '');
  const [attendeeEmail, setAttendeeEmail] = useState(user?.email || '');
  const [attendeePhone, setAttendeePhone] = useState('+1 (555) 234-5678');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !event) return null;

  const unitPrice = selectedTier?.price || event.startingPrice || 50;
  const subtotal = unitPrice * quantity;
  const serviceFee = Math.round(subtotal * 0.08);
  const totalAmount = subtotal + serviceFee;

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!attendeeName.trim() || !attendeeEmail.trim()) {
      error('Please provide attendee name and contact email.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        eventId: event.id,
        eventTitle: event.title,
        eventImage: event.image,
        eventDate: event.date,
        eventTime: event.time,
        eventVenue: event.venue,
        eventLocation: event.location,
        ticketTier: selectedTier.name,
        ticketQuantity: quantity,
        unitPrice,
        serviceFee,
        totalAmount,
        attendeeName,
        attendeeEmail,
        attendeePhone
      };

      const newBooking = await bookingService.createBooking(payload);

      // Trigger celebratory confetti effect
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Confetti fallback
      }

      success(`Booking Confirmed! Reference: ${newBooking.bookingReference}`);
      onClose();

      // Navigate directly to the confirmed ticket page
      navigate(`/my-bookings/${newBooking.id}`);
    } catch (err) {
      error(err.message || 'Payment verification failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="modal show fade d-block"
      style={{
        backgroundColor: 'rgba(31, 14, 42, 0.75)',
        backdropFilter: 'blur(5px)',
        zIndex: 1055
      }}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content rounded-4 border-0 shadow-lg overflow-hidden">
          {/* Modal Header */}
          <div
            className="modal-header text-white p-4"
            style={{ backgroundColor: '#350047', borderBottom: 'none' }}
          >
            <div>
              <span
                className="badge mb-2 px-2 py-1"
                style={{ backgroundColor: '#F43F8C', fontSize: '0.72rem' }}
              >
                SECURE CHECKOUT
              </span>
              <h4 className="modal-title h5 fw-bold text-white mb-1">
                {event.title}
              </h4>
              <div className="d-flex align-items-center gap-3 text-white-50 small">
                <span className="d-flex align-items-center gap-1">
                  <FiCalendar size={13} /> {event.date} at {event.time}
                </span>
                <span>&bull;</span>
                <span className="d-flex align-items-center gap-1">
                  <FiMapPin size={13} /> {event.venue}
                </span>
              </div>
            </div>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              disabled={isSubmitting}
              aria-label="Close"
            />
          </div>

          {/* Modal Body */}
          <form onSubmit={handleBooking} className="modal-body p-4 p-md-5">
            <div className="row g-4">
              {/* Left Column: Ticket Selection & Contact */}
              <div className="col-lg-7">
                <h5 className="h6 fw-bold mb-3" style={{ color: '#350047' }}>
                  1. Select Ticket Tier
                </h5>

                <div className="d-flex flex-column gap-2 mb-4">
                  {(event.ticketTypes || [
                    { name: 'General Admission', price: event.startingPrice || 50, perks: ['Entry pass'] }
                  ]).map((tier, idx) => {
                    const isSelected = selectedTier?.name === tier.name;
                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedTier(tier)}
                        className={`p-3 rounded-3 cursor-pointer border transition-all ${
                          isSelected ? 'bg-light' : 'bg-white'
                        }`}
                        style={{
                          borderColor: isSelected ? '#F43F8C' : '#E8E2EE',
                          borderWidth: isSelected ? 2 : 1,
                          cursor: 'pointer'
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <span className="fw-bold" style={{ color: '#350047' }}>
                            {tier.name}
                          </span>
                          <span className="fw-bold fs-6" style={{ color: '#F43F8C' }}>
                            ${tier.price}
                          </span>
                        </div>
                        {tier.description && (
                          <div className="text-muted small mb-2">{tier.description}</div>
                        )}
                        {tier.perks && (
                          <div className="d-flex flex-wrap gap-1">
                            {tier.perks.map((perk, pIdx) => (
                              <span
                                key={pIdx}
                                className="badge bg-white text-secondary border small"
                                style={{ fontSize: '0.72rem' }}
                              >
                                &check; {perk}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <h5 className="h6 fw-bold mb-3" style={{ color: '#350047' }}>
                  2. Attendee Information
                </h5>

                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label small fw-semibold text-secondary">
                      Full Name
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light text-muted border-end-0">
                        <FiUser />
                      </span>
                      <input
                        type="text"
                        required
                        className="form-control"
                        value={attendeeName}
                        onChange={(e) => setAttendeeName(e.target.value)}
                        placeholder="e.g. Alex Morgan"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-secondary">
                      Email Address (Ticket Sent Here)
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light text-muted border-end-0">
                        <FiMail />
                      </span>
                      <input
                        type="email"
                        required
                        className="form-control"
                        value={attendeeEmail}
                        onChange={(e) => setAttendeeEmail(e.target.value)}
                        placeholder="alex@example.com"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-secondary">
                      Phone Number
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light text-muted border-end-0">
                        <FiPhone />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        value={attendeePhone}
                        onChange={(e) => setAttendeePhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary & Checkout Action */}
              <div className="col-lg-5">
                <div
                  className="p-4 rounded-4"
                  style={{ backgroundColor: '#FAF7FC', border: '1px solid #E8E2EE' }}
                >
                  <h5 className="h6 fw-bold mb-3" style={{ color: '#350047' }}>
                    Order Summary
                  </h5>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="small text-secondary">Selected Tier:</span>
                    <span className="fw-semibold small">{selectedTier.name}</span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="small text-secondary">Quantity:</span>
                    <div className="d-flex align-items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        className="btn btn-sm btn-outline-secondary rounded-circle p-0 d-flex align-items-center justify-content-center"
                        style={{ width: 28, height: 28 }}
                      >
                        <FiMinus size={13} />
                      </button>
                      <span className="fw-bold px-2">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.min(10, quantity + 1))}
                        disabled={quantity >= 10}
                        className="btn btn-sm btn-outline-secondary rounded-circle p-0 d-flex align-items-center justify-content-center"
                        style={{ width: 28, height: 28 }}
                      >
                        <FiPlus size={13} />
                      </button>
                    </div>
                  </div>

                  <hr className="my-3 text-muted" />

                  <div className="d-flex justify-content-between small text-muted mb-2">
                    <span>${unitPrice} &times; {quantity} tickets</span>
                    <span>${subtotal}</span>
                  </div>

                  <div className="d-flex justify-content-between small text-muted mb-3">
                    <span>Service Fee (8%)</span>
                    <span>${serviceFee}</span>
                  </div>

                  <div className="d-flex justify-content-between fw-bold fs-5 pt-2 border-top border-secondary-subtle mb-4" style={{ color: '#350047' }}>
                    <span>Total Price</span>
                    <span style={{ color: '#F43F8C' }}>${totalAmount}</span>
                  </div>

                  {/* Payment notice */}
                  <div className="d-flex align-items-center gap-2 text-muted small mb-4">
                    <FiShield style={{ color: '#10B981' }} />
                    <span style={{ fontSize: '0.78rem' }}>
                      256-bit TLS encrypted checkout. Verified live QR pass generated immediately.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-accent-pink w-100 py-3 fw-bold fs-6"
                  >
                    {isSubmitting ? (
                      <span className="d-flex align-items-center justify-content-center gap-2">
                        <span className="spinner-border spinner-border-sm" role="status" />
                        Processing Order...
                      </span>
                    ) : (
                      `Confirm & Pay $${totalAmount}`
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
