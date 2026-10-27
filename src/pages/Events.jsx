import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  FiSearch,
  FiFilter,
  FiMapPin,
  FiDollarSign,
  FiCalendar,
  FiRotateCcw,
  FiAlertCircle
} from 'react-icons/fi';
import { eventService } from '../services/eventService';
import { EventCard } from '../components/events/EventCard';
import { INITIAL_CATEGORIES } from '../data/mockData';

export const Events = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL query parameter synchronization
  const initialCategory = searchParams.get('category') || 'All';

  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [location, setLocation] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    if (initialCategory && initialCategory !== category) {
      setCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      const data = await eventService.getEvents();
      setAllEvents(data);
      setLoading(false);
    };
    loadEvents();
  }, []);

  // Unique locations from events
  const locationsList = useMemo(() => {
    const locs = allEvents.map((e) => e.location.split(',')[0].trim());
    return ['All', ...new Set(locs)];
  }, [allEvents]);

  // Filter logic
  const filteredEvents = useMemo(() => {
    return allEvents.filter((event) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = event.title.toLowerCase().includes(q);
        const matchesLoc = event.location.toLowerCase().includes(q);
        const matchesVenue = event.venue.toLowerCase().includes(q);
        const matchesDesc = event.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesLoc && !matchesVenue && !matchesDesc) return false;
      }

      // Category
      if (category !== 'All' && event.category.toLowerCase() !== category.toLowerCase()) {
        return false;
      }

      // Location
      if (location !== 'All' && !event.location.toLowerCase().includes(location.toLowerCase())) {
        return false;
      }

      // Price Range
      if (priceRange === 'under-50' && event.startingPrice >= 50) return false;
      if (priceRange === '50-150' && (event.startingPrice < 50 || event.startingPrice > 150)) return false;
      if (priceRange === '150-plus' && event.startingPrice <= 150) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.startingPrice - b.startingPrice;
      if (sortBy === 'price-high') return b.startingPrice - a.startingPrice;
      if (sortBy === 'popular') return (b.ticketsSold || 0) - (a.ticketsSold || 0);
      return new Date(a.date) - new Date(b.date);
    });
  }, [allEvents, searchQuery, category, location, priceRange, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setCategory('All');
    setLocation('All');
    setPriceRange('All');
    setSortBy('date');
    setSearchParams({});
  };

  return (
    <div style={{ backgroundColor: '#FAF7FC', minHeight: '90vh' }} className="py-4 pb-5">
      <div className="content-container">
        {/* Banner Section */}
        <div
          className="rounded-4 p-4 p-md-5 mb-4 text-white position-relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #350047 0%, #4c0463 100%)',
            boxShadow: '0 12px 30px rgba(53, 0, 71, 0.2)'
          }}
        >
          <div className="position-relative" style={{ zIndex: 2 }}>
            <span
              className="badge px-3 py-1 mb-2 rounded-pill"
              style={{ backgroundColor: '#F43F8C', fontSize: '0.75rem' }}
            >
              EXPLORE THE SCENE
            </span>
            <h1 className="display-6 fw-bold text-white mb-2" style={{ letterSpacing: '-0.02em' }}>
              All Live & Upcoming Events
            </h1>
            <p className="text-white-50 mb-0" style={{ maxWidth: 650, fontSize: '1.05rem' }}>
              Find the perfect event across music festivals, tech summits, executive forums, and hands-on masterclasses.
            </p>
          </div>
        </div>

        {/* Search & Filters Bar */}
        <div className="bg-white rounded-4 p-4 shadow-sm border mb-4">
          <div className="row g-3">
            {/* Search Input */}
            <div className="col-lg-4 col-md-6">
              <label className="form-label small fw-semibold text-muted">Search Events</label>
              <div className="position-relative">
                <FiSearch
                  className="position-absolute text-muted"
                  style={{ top: '50%', left: 14, transform: 'translateY(-50%)' }}
                />
                <input
                  type="text"
                  className="form-control ps-5"
                  placeholder="Artist, conference, city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ borderRadius: 10, height: 44 }}
                />
              </div>
            </div>

            {/* Category Select */}
            <div className="col-lg-2 col-md-6">
              <label className="form-label small fw-semibold text-muted">Category</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  if (e.target.value !== 'All') {
                    setSearchParams({ category: e.target.value });
                  } else {
                    setSearchParams({});
                  }
                }}
                style={{ borderRadius: 10, height: 44 }}
              >
                {INITIAL_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Select */}
            <div className="col-lg-2 col-md-6">
              <label className="form-label small fw-semibold text-muted">Location</label>
              <select
                className="form-select"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{ borderRadius: 10, height: 44 }}
              >
                {locationsList.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="col-lg-2 col-md-6">
              <label className="form-label small fw-semibold text-muted">Price Range</label>
              <select
                className="form-select"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                style={{ borderRadius: 10, height: 44 }}
              >
                <option value="All">All Prices</option>
                <option value="under-50">Under $50</option>
                <option value="50-150">$50 - $150</option>
                <option value="150-plus">$150+</option>
              </select>
            </div>

            {/* Sort By */}
            <div className="col-lg-2 col-md-6">
              <label className="form-label small fw-semibold text-muted">Sort By</label>
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ borderRadius: 10, height: 44 }}
              >
                <option value="date">Date: Upcoming</option>
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Active Filter Tags & Reset */}
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mt-3 pt-3 border-top">
            <div className="d-flex align-items-center gap-2 small text-muted">
              <span>
                Showing <strong>{filteredEvents.length}</strong> {filteredEvents.length === 1 ? 'event' : 'events'}
              </span>
              {(searchQuery || category !== 'All' || location !== 'All' || priceRange !== 'All') && (
                <span className="badge bg-light text-secondary border">Filters Active</span>
              )}
            </div>

            {(searchQuery || category !== 'All' || location !== 'All' || priceRange !== 'All') && (
              <button
                type="button"
                onClick={resetFilters}
                className="btn btn-sm btn-link text-decoration-none text-danger d-inline-flex align-items-center gap-1 p-0"
              >
                <FiRotateCcw size={13} /> Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Event Grid */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border" style={{ color: '#F43F8C' }} role="status">
              <span className="visually-hidden">Loading events...</span>
            </div>
          </div>
        ) : filteredEvents.length > 0 ? (
          <>
            <div className="row g-4">
              {filteredEvents.slice(0, visibleCount).map((event) => (
                <div key={event.id} className="col-lg-4 col-md-6">
                  <EventCard event={event} />
                </div>
              ))}
            </div>

            {/* Pagination / Load More button */}
            {visibleCount < filteredEvents.length && (
              <div className="text-center mt-5">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="btn btn-primary-purple px-4 py-2"
                >
                  Load More Events ({filteredEvents.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-4 p-5 text-center border my-4">
            <div
              className="d-inline-flex p-3 rounded-circle mb-3"
              style={{ backgroundColor: '#FCE7F3', color: '#F43F8C' }}
            >
              <FiAlertCircle size={36} />
            </div>
            <h3 className="h5 fw-bold" style={{ color: '#350047' }}>
              No Events Found Matching Your Search
            </h3>
            <p className="text-muted small mx-auto mb-4" style={{ maxWidth: 450 }}>
              Try adjusting your category, price range, or search keywords to find other amazing experiences.
            </p>
            <button onClick={resetFilters} className="btn btn-accent-pink px-4 py-2">
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
