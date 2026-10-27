import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiCheckCircle,
  FiAward,
  FiUsers,
  FiGlobe,
  FiArrowRight,
  FiStar,
  FiHeart
} from 'react-icons/fi';
import { EVENT_IMAGES } from '../assets/images';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

export const About = () => {
  return (
    <div style={{ backgroundColor: '#FAF7FC' }} className="py-5">
      <div className="content-container">
        {/* Intro Hero Section */}
        <div className="row align-items-center g-5 mb-5 pb-4">
          <div className="col-lg-6">
            <span className="badge-pink-pill mb-2">Our Story & Craft</span>
            <h1 className="display-5 fw-bold mb-3" style={{ color: '#350047', letterSpacing: '-0.02em' }}>
              We bring people together for experiences worth showing up for.
            </h1>
            <p className="text-secondary mb-4" style={{ fontSize: '1.1rem', lineHeight: 1.75 }}>
              Founded in 2024, Eventra (E-Event) was built with an uncompromising vision: that live human gatherings—whether an electric festival crowd of 10,000 or an intimate 50-person design masterclass—are essential to culture, connection, and human progress.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Link to="/events" className="btn btn-accent-pink px-4 py-3">
                Explore Events <FiArrowRight />
              </Link>
              <Link to="/contact" className="btn btn-outline-purple px-4 py-3">
                Talk With Us
              </Link>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="position-relative">
              <div
                className="rounded-4 overflow-hidden shadow-lg"
                style={{ height: 420, backgroundColor: '#350047' }}
              >
                <ImageWithFallback
                  src={EVENT_IMAGES.heroAbout}
                  alt="Crowd celebration"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Floating Stat Card */}
              <div
                className="position-absolute bg-white p-3 rounded-4 shadow-lg border d-flex align-items-center gap-3"
                style={{ bottom: -25, left: 30, maxWidth: 280, borderColor: '#E8E2EE' }}
              >
                <div
                  className="p-3 rounded-circle text-white d-flex align-items-center justify-content-center"
                  style={{ backgroundColor: '#F43F8C', width: 48, height: 48 }}
                >
                  <FiHeart size={22} />
                </div>
                <div>
                  <div className="fw-bold fs-5" style={{ color: '#350047' }}>250,000+</div>
                  <div className="text-muted small">Passionate attendees empowered</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission and Vision Grid */}
        <div className="row g-4 mb-5 pt-4">
          <div className="col-md-6">
            <div className="eventra-card p-4 p-md-5 h-100 bg-white">
              <div
                className="p-3 rounded-3 d-inline-flex mb-3 text-white"
                style={{ backgroundColor: '#350047' }}
              >
                <FiStar size={24} />
              </div>
              <h2 className="h4 fw-bold mb-3" style={{ color: '#350047' }}>
                Our Mission
              </h2>
              <p className="text-secondary" style={{ lineHeight: 1.7 }}>
                To empower event organizers with cutting-edge ticketing infrastructure and real-time gate analytics, while giving attendees frictionless, transparent access to the world’s most exhilarating live music, tech conferences, and artistic summits.
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="eventra-card p-4 p-md-5 h-100 bg-white">
              <div
                className="p-3 rounded-3 d-inline-flex mb-3 text-white"
                style={{ backgroundColor: '#F43F8C' }}
              >
                <FiGlobe size={24} />
              </div>
              <h2 className="h4 fw-bold mb-3" style={{ color: '#350047' }}>
                Our Vision
              </h2>
              <p className="text-secondary" style={{ lineHeight: 1.7 }}>
                A globally connected live events ecosystem where scalpers and fraudulent tickets are entirely obsolete, where artists receive fair proceeds, and where every attendee steps through the gates with zero anxiety and total anticipation.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Eventra Pillars */}
        <div className="py-4 mb-5">
          <div className="text-center max-w-700 mx-auto mb-5" style={{ maxWidth: 640 }}>
            <span className="badge-pink-pill mb-2">The Eventra Advantage</span>
            <h2 className="section-title mb-2">Why Discerning Organizers & Attendees Choose Us</h2>
          </div>

          <div className="row g-4">
            {[
              {
                title: 'End-to-End Encryption',
                desc: 'Every ticket contains dynamic cryptographic QR signatures that eliminate counterfeiting.'
              },
              {
                title: 'High-Volume Turnstiles',
                desc: 'Instant 0.2-second gate verification scanner apps keep entrance lines fast and breezy.'
              },
              {
                title: 'Transparent Pricing',
                desc: 'No sudden 30% checkout surprise charges. What you see is what you pay.'
              },
              {
                title: 'Global Community',
                desc: 'Spanning major cultural hubs from New York, London, and Berlin to Tokyo and San Francisco.'
              }
            ].map((pillar, idx) => (
              <div key={idx} className="col-lg-3 col-sm-6">
                <div className="eventra-card p-4 h-100 bg-white border">
                  <FiCheckCircle size={24} style={{ color: '#F43F8C' }} className="mb-3" />
                  <h3 className="h6 fw-bold mb-2" style={{ color: '#350047' }}>
                    {pillar.title}
                  </h3>
                  <p className="text-muted small mb-0" style={{ lineHeight: 1.6 }}>
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photomontage Showcase */}
        <div className="mb-5">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="rounded-4 overflow-hidden" style={{ height: 260 }}>
                <ImageWithFallback
                  src={EVENT_IMAGES.music3}
                  alt="Concert stage"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="rounded-4 overflow-hidden" style={{ height: 260 }}>
                <ImageWithFallback
                  src={EVENT_IMAGES.tech2}
                  alt="Tech conference"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="rounded-4 overflow-hidden" style={{ height: 260 }}>
                <ImageWithFallback
                  src={EVENT_IMAGES.art2}
                  alt="Art biennale"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div
          className="rounded-4 p-5 text-center text-white"
          style={{ background: 'linear-gradient(135deg, #350047 0%, #230030 100%)' }}
        >
          <h2 className="display-6 fw-bold text-white mb-3">
            Ready to experience something extraordinary?
          </h2>
          <p className="text-white-50 mx-auto mb-4" style={{ maxWidth: 580 }}>
            Explore our curated calendar of music festivals, tech symposiums, and masterclasses happening this season.
          </p>
          <Link to="/events" className="btn btn-accent-pink px-4 py-3 fw-bold">
            Discover Live Events Today
          </Link>
        </div>
      </div>
    </div>
  );
};
