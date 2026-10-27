import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiInfo, FiStar, FiCalendar, FiUsers, FiAward } from 'react-icons/fi';
import { EVENT_IMAGES } from '../../assets/images';
import { ImageWithFallback } from '../common/ImageWithFallback';

export const Hero = () => {
  return (
    <section className="hero-wrapper">
      <div className="content-container">
        {/* TOP: Large Landscape Concert / Event Photograph */}
        <div className="hero-image-container">
          <ImageWithFallback
            src={EVENT_IMAGES.heroConcert}
            alt="Live concert crowd illuminated with vibrant stage lighting"
            className="hero-image"
          />
          {/* Subtle gradient vignette with live status badge */}
          <div className="hero-image-overlay d-flex justify-content-between align-items-end">
            <div className="d-none d-md-flex align-items-center gap-2 bg-dark bg-opacity-75 px-3 py-2 rounded-pill backdrop-blur border border-white border-opacity-10">
              <span
                className="rounded-circle d-inline-block"
                style={{ width: 8, height: 8, backgroundColor: '#10B981', boxShadow: '0 0 10px #10B981' }}
              />
              <span className="small text-white fw-medium">
                Live & Upcoming Events Season 2026-2027
              </span>
            </div>
            <div className="d-flex align-items-center gap-2 bg-dark bg-opacity-75 px-3 py-2 rounded-pill backdrop-blur border border-white border-opacity-10">
              <FiStar style={{ color: '#F43F8C' }} />
              <span className="small text-white fw-medium">Curated Experiences</span>
            </div>
          </div>
        </div>

        {/* BOTTOM: Two-Column Section directly inspired by Reference 2 */}
        <div className="row align-items-center g-4 g-lg-5 pt-2">
          {/* LEFT COLUMN: Very large, bold, dark-purple headline */}
          <div className="col-lg-6">
            <h1 className="hero-headline">
              Discover what's worth showing up for.
            </h1>
          </div>

          {/* RIGHT COLUMN: Description & Action Buttons */}
          <div className="col-lg-6">
            <p className="hero-description">
              From unforgettable concerts to inspiring conferences, discover and book experiences that bring people together.
            </p>

            <div className="d-flex flex-wrap align-items-center gap-3">
              <Link to="/events" className="btn btn-accent-pink px-4 py-3">
                Browse Events <FiArrowRight size={18} />
              </Link>
              <Link to="/about" className="btn btn-outline-purple px-4 py-3">
                Learn More <FiInfo size={17} />
              </Link>
            </div>

            {/* Quick trust metrics */}
            <div className="row g-3 mt-4 pt-3 border-top border-light-subtle">
              <div className="col-4">
                <div className="fw-bold fs-5" style={{ color: '#350047' }}>
                  250K+
                </div>
                <div className="text-muted small">Tickets Booked</div>
              </div>
              <div className="col-4">
                <div className="fw-bold fs-5" style={{ color: '#350047' }}>
                  1,400+
                </div>
                <div className="text-muted small">Verified Events</div>
              </div>
              <div className="col-4">
                <div className="fw-bold fs-5" style={{ color: '#350047' }}>
                  99.8%
                </div>
                <div className="text-muted small">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
