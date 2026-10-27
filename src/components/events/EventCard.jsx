import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiArrowRight,
  FiTag
} from 'react-icons/fi';
import { ImageWithFallback } from '../common/ImageWithFallback';

export const EventCard = ({ event }) => {
  if (!event) return null;

  // Format date nicely
  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="eventra-card h-100 d-flex flex-column">
      {/* Image Wrap */}
      <div className="event-card-img-wrap">
        <ImageWithFallback
          src={event.image}
          alt={event.title}
          className="event-card-img"
        />

        {/* Floating Category Badge */}
        <div className="event-category-float">
          <span className="badge-pink-pill shadow-sm">
            {event.category}
          </span>
        </div>

        {/* Price Tag */}
        <div className="event-price-tag">
          From ${event.startingPrice}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 d-flex flex-column flex-grow-1">
        {/* Date & Time Metadata */}
        <div className="d-flex align-items-center gap-3 text-muted mb-2 small">
          <span className="d-flex align-items-center gap-1">
            <FiCalendar style={{ color: '#F43F8C' }} />
            {formatDate(event.date)}
          </span>
          <span>&bull;</span>
          <span className="d-flex align-items-center gap-1">
            <FiClock style={{ color: '#F43F8C' }} />
            {event.time}
          </span>
        </div>

        {/* Title */}
        <h3 className="h5 fw-bold mb-2" style={{ color: '#350047', lineHeight: 1.35 }}>
          <Link
            to={`/events/${event.id}`}
            style={{ color: '#350047', textDecoration: 'none' }}
            className="hover-pink line-clamp-2"
          >
            {event.title}
          </Link>
        </h3>

        {/* Location & Venue */}
        <div className="d-flex align-items-center gap-2 text-muted small mb-3">
          <FiMapPin style={{ color: '#350047', flexShrink: 0 }} />
          <span className="text-truncate">
            {event.venue}, {event.location}
          </span>
        </div>

        {/* Description snippet */}
        <p
          className="text-muted small mb-4 flex-grow-1"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.55
          }}
        >
          {event.description}
        </p>

        {/* Card Footer with Details Action */}
        <div className="pt-3 border-top border-light-subtle d-flex align-items-center justify-content-between">
          <div>
            <div className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Ticket Price
            </div>
            <div className="fw-bold fs-5" style={{ color: '#350047' }}>
              ${event.startingPrice}
              <span className="text-muted fw-normal" style={{ fontSize: '0.75rem' }}> / person</span>
            </div>
          </div>

          <Link
            to={`/events/${event.id}`}
            className="btn btn-outline-pink py-2 px-3 small d-flex align-items-center gap-2"
          >
            View Details <FiArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};
