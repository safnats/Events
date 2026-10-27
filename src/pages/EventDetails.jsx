import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiShare2,
  FiHeart,
  FiCheckCircle,
  FiShield,
  FiUser,
  FiArrowLeft,
  FiMinus,
  FiPlus,
  FiCreditCard,
  FiAward
} from 'react-icons/fi';
import { eventService } from '../services/eventService';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { BookingModal } from '../components/events/BookingModal';
import { EventCard } from '../components/events/EventCard';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { info } = useNotification();

  const [event, setEvent] = useState(null);
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Selection states
  const [selectedTierIndex, setSelectedTierIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      window.scrollTo(0, 0);
      const found = await eventService.getEventById(id);
      setEvent(found);

      if (found) {
        const all = await eventService.getEvents();
        const related = all
          .filter((e) => e.id !== found.id && e.category === found.category)
          .slice(0, 3);
        setRelatedEvents(related);
      }
      setLoading(false);
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-5 my-5">
        <div className="spinner-border" style={{ color: '#F43F8C' }} role="status">
          <span className="visually-hidden">Loading event...</span>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="content-container py-5 text-center">
        <h2 className="h4 text-dark mb-3">Event Not Found</h2>
        <p className="text-muted mb-4">The event you are looking for does not exist or has ended.</p>
        <Link to="/events" className="btn btn-primary-purple">
          Back to Events
        </Link>
      </div>
    );
  }

  const selectedTier = event.ticketTypes?.[selectedTierIndex] || {
    name: 'Standard Ticket',
    price: event.startingPrice || 50,
    available: 100
  };

  const totalPrice = (selectedTier.price || event.startingPrice) * quantity;

  const handleBookClick = () => {
    if (!isAuthenticated) {
      info('Please sign in or proceed with attendee registration to finalize your ticket.');
      navigate('/login', { state: { from: `/events/${id}` } });
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <div style={{ backgroundColor: '#FAF7FC' }} className="py-4 pb-5">
      <div className="content-container">
        {/* Back Link */}
        <div className="mb-3">
          <Link
            to="/events"
            className="text-decoration-none text-muted small d-inline-flex align-items-center gap-1 hover-pink"
          >
            <FiArrowLeft /> Back to all events
          </Link>
        </div>

        {/* Large Event Banner Image */}
        <div
          className="rounded-4 overflow-hidden mb-4 shadow-lg position-relative"
          style={{ maxHeight: 480, height: '55vh', minHeight: 320 }}
        >
          <ImageWithFallback
            src={event.image}
            alt={event.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {/* Floating actions & Category badge */}
          <div
            className="position-absolute top-0 start-0 w-100 p-4 d-flex justify-content-between align-items-center"
            style={{ background: 'linear-gradient(180deg, rgba(35, 0, 48, 0.6) 0%, transparent 100%)' }}
          >
            <span className="badge-pink-pill shadow-sm">
              {event.category}
            </span>

            <div className="d-flex align-items-center gap-2">
              <button
                type="button"
                onClick={() => setIsLiked(!isLiked)}
                className="btn btn-sm btn-light rounded-circle p-2 shadow-sm"
                aria-label="Save Event"
              >
                <FiHeart style={{ color: isLiked ? '#F43F8C' : '#6B7280', fill: isLiked ? '#F43F8C' : 'none' }} size={18} />
              </button>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  info('Event link copied to clipboard!');
                }}
                className="btn btn-sm btn-light rounded-circle p-2 shadow-sm"
                aria-label="Share Event"
              >
                <FiShare2 size={18} style={{ color: '#350047' }} />
              </button>
            </div>
          </div>
        </div>

        {/* Content & Booking Grid */}
        <div className="row g-4 g-lg-5">
          {/* Left Details Column */}
          <div className="col-lg-8">
            <div className="bg-white rounded-4 p-4 p-md-5 border mb-4">
              {/* Event Title */}
              <h1 className="h2 fw-bold mb-3" style={{ color: '#350047' }}>
                {event.title}
              </h1>

              {/* Meta information row */}
              <div className="row g-3 py-3 my-2 border-top border-bottom border-light-subtle">
                <div className="col-sm-6 d-flex align-items-center gap-3">
                  <div
                    className="p-2 rounded-3 text-white d-flex align-items-center justify-content-center"
                    style={{ backgroundColor: '#350047', width: 44, height: 44 }}
                  >
                    <FiCalendar size={20} />
                  </div>
                  <div>
                    <div className="text-muted small">Date & Time</div>
                    <div className="fw-bold small" style={{ color: '#350047' }}>
                      {event.date} &bull; {event.time}
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 d-flex align-items-center gap-3">
                  <div
                    className="p-2 rounded-3 text-white d-flex align-items-center justify-content-center"
                    style={{ backgroundColor: '#F43F8C', width: 44, height: 44 }}
                  >
                    <FiMapPin size={20} />
                  </div>
                  <div>
                    <div className="text-muted small">Venue & Location</div>
                    <div className="fw-bold small" style={{ color: '#350047' }}>
                      {event.venue}
                    </div>
                    <div className="text-muted" style={{ fontSize: '0.78rem' }}>
                      {event.address}
                    </div>
                  </div>
                </div>
              </div>

              {/* About Event Description */}
              <div className="mt-4">
                <h4 className="h5 fw-bold mb-3" style={{ color: '#350047' }}>
                  About This Experience
                </h4>
                <p className="text-secondary" style={{ lineHeight: 1.8 }}>
                  {event.fullDescription || event.description}
                </p>
              </div>

              {/* Event Highlights */}
              {event.highlights && event.highlights.length > 0 && (
                <div className="mt-4 pt-3 border-top border-light-subtle">
                  <h4 className="h5 fw-bold mb-3" style={{ color: '#350047' }}>
                    Event Highlights
                  </h4>
                  <div className="d-flex flex-column gap-2">
                    {event.highlights.map((highlight, idx) => (
                      <div key={idx} className="d-flex align-items-center gap-2">
                        <FiCheckCircle style={{ color: '#10B981', flexShrink: 0 }} />
                        <span className="small text-secondary">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Organizer Section */}
              {event.organizer && (
                <div className="mt-5 p-4 rounded-4 bg-light border d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3">
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={event.organizer.avatar}
                      alt={event.organizer.name}
                      className="rounded-circle"
                      style={{ width: 54, height: 54, objectFit: 'cover' }}
                    />
                    <div>
                      <div className="d-flex align-items-center gap-2">
                        <span className="fw-bold" style={{ color: '#350047' }}>
                          {event.organizer.name}
                        </span>
                        {event.organizer.verified && (
                          <span className="badge bg-success" style={{ fontSize: '0.65rem' }}>
                            VERIFIED
                          </span>
                        )}
                      </div>
                      <div className="text-muted small">{event.organizer.role}</div>
                    </div>
                  </div>

                  <a
                    href={`mailto:${event.organizer.email}`}
                    className="btn btn-sm btn-outline-purple"
                  >
                    Contact Organizer
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Ticket Selection & Checkout Card */}
          <div className="col-lg-4">
            <div
              className="bg-white rounded-4 p-4 border shadow-sm position-sticky"
              style={{ top: '100px' }}
            >
              <div className="d-flex justify-content-between align-items-baseline mb-3">
                <span className="text-muted small text-uppercase fw-bold">Admission</span>
                <span className="fs-4 fw-bold" style={{ color: '#350047' }}>
                  ${selectedTier.price}
                  <span className="text-muted small fw-normal"> / ticket</span>
                </span>
              </div>

              {/* Ticket Tier Options */}
              <div className="mb-4">
                <label className="form-label small fw-semibold text-secondary mb-2">
                  Choose Ticket Category:
                </label>
                <div className="d-flex flex-column gap-2">
                  {(event.ticketTypes || [
                    { name: 'Standard Pass', price: event.startingPrice, available: 100 }
                  ]).map((tier, idx) => {
                    const isSelected = selectedTierIndex === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedTierIndex(idx)}
                        className={`p-3 rounded-3 border transition-all cursor-pointer ${
                          isSelected ? 'bg-light' : ''
                        }`}
                        style={{
                          borderColor: isSelected ? '#F43F8C' : '#E8E2EE',
                          borderWidth: isSelected ? 2 : 1,
                          cursor: 'pointer'
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fw-semibold small" style={{ color: '#350047' }}>
                            {tier.name}
                          </span>
                          <span className="fw-bold small" style={{ color: '#F43F8C' }}>
                            ${tier.price}
                          </span>
                        </div>
                        <div className="text-muted mt-1" style={{ fontSize: '0.72rem' }}>
                          {tier.available} tickets left
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="form-label small fw-semibold text-secondary mb-0">
                    Quantity
                  </label>
                  <span className="text-muted" style={{ fontSize: '0.75rem' }}>
                    Max 10 per order
                  </span>
                </div>

                <div className="d-flex align-items-center justify-content-between p-2 rounded-3 border bg-light">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="btn btn-sm btn-white border rounded p-1"
                    style={{ width: 32, height: 32 }}
                  >
                    <FiMinus />
                  </button>
                  <span className="fw-bold fs-6">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    disabled={quantity >= 10}
                    className="btn btn-sm btn-white border rounded p-1"
                    style={{ width: 32, height: 32 }}
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>

              {/* Price Calculation breakdown */}
              <div className="pt-3 border-top mb-4">
                <div className="d-flex justify-content-between small text-muted mb-2">
                  <span>Tickets ({quantity}x)</span>
                  <span>${selectedTier.price * quantity}</span>
                </div>
                <div className="d-flex justify-content-between small text-muted mb-3">
                  <span>Estimated Processing Fee (8%)</span>
                  <span>${Math.round(selectedTier.price * quantity * 0.08)}</span>
                </div>
                <div className="d-flex justify-content-between fw-bold fs-5 pt-2 border-top" style={{ color: '#350047' }}>
                  <span>Total Due</span>
                  <span style={{ color: '#F43F8C' }}>
                    ${Math.round(selectedTier.price * quantity * 1.08)}
                  </span>
                </div>
              </div>

              {/* Book Tickets CTA Button */}
              <button
                type="button"
                onClick={handleBookClick}
                className="btn btn-accent-pink w-100 py-3 fw-bold mb-3 shadow-sm"
              >
                Book Tickets Now
              </button>

              <div className="text-center">
                <span className="text-muted small d-inline-flex align-items-center gap-1" style={{ fontSize: '0.75rem' }}>
                  <FiShield style={{ color: '#10B981' }} /> Guaranteed Authentic &bull; Instant Mobile Ticket
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Events Section */}
        {relatedEvents.length > 0 && (
          <div className="mt-5 pt-4">
            <h3 className="section-title h4 mb-4">More {event.category} Events</h3>
            <div className="row g-4">
              {relatedEvents.map((rel) => (
                <div key={rel.id} className="col-lg-4 col-md-6">
                  <EventCard event={rel} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <BookingModal
          event={{
            ...event,
            startingPrice: selectedTier.price,
            ticketTypes: [selectedTier]
          }}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
