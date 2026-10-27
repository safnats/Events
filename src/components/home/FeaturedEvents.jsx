import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiSliders } from 'react-icons/fi';
import { eventService } from '../../services/eventService';
import { EventCard } from '../events/EventCard';
import { INITIAL_CATEGORIES } from '../../data/mockData';

export const FeaturedEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const data = await eventService.getEvents({
        category: selectedCategory === 'All' ? undefined : selectedCategory
      });
      setEvents(data.slice(0, 6));
      setLoading(false);
    };

    fetchEvents();
  }, [selectedCategory]);

  return (
    <section className="py-5" style={{ backgroundColor: '#FAF7FC' }}>
      <div className="content-container">
        {/* Section Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
          <div>
            <div className="badge-pink-pill mb-2">
              Curated Selection
            </div>
            <h2 className="section-title mb-1">
              Events Worth Experiencing
            </h2>
            <p className="section-subtitle mb-0">
              Discover top-rated performances, tech summits, and cultural gatherings happening near you.
            </p>
          </div>

          <Link
            to="/events"
            className="btn btn-outline-purple d-inline-flex align-items-center gap-2 align-self-start align-self-md-auto"
          >
            Explore All Events <FiArrowRight size={16} />
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="d-flex align-items-center gap-2 overflow-auto pb-2 mb-4 scrollbar-none">
          {INITIAL_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`btn btn-sm text-nowrap rounded-pill px-3 py-2 fw-semibold transition-all ${
                  isActive
                    ? 'btn-accent-pink'
                    : 'bg-white border text-secondary hover-pink'
                }`}
                style={{
                  borderColor: isActive ? 'transparent' : '#E8E2EE',
                  boxShadow: isActive ? '0 4px 12px rgba(244, 63, 140, 0.25)' : 'none'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Event Cards Grid */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border" style={{ color: '#F43F8C' }} role="status">
              <span className="visually-hidden">Loading events...</span>
            </div>
          </div>
        ) : events.length > 0 ? (
          <div className="row g-4">
            {events.map((evt) => (
              <div key={evt.id} className="col-lg-4 col-md-6">
                <EventCard event={evt} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5 bg-white rounded-4 border p-5">
            <p className="text-muted mb-3">No events found under "{selectedCategory}".</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="btn btn-sm btn-outline-purple"
            >
              Show All Events
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
