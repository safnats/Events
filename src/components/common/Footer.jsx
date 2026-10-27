import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiCalendar,
  FiMail,
  FiPhone,
  FiMapPin,
  FiInstagram,
  FiTwitter,
  FiLinkedin,
  FiFacebook,
  FiArrowRight,
  FiCheckCircle
} from 'react-icons/fi';
import { useNotification } from '../../context/NotificationContext';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { success } = useNotification();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      success('Thank you for subscribing to the Eventra insider bulletin!');
      setEmail('');
    }
  };

  return (
    <footer
      style={{
        backgroundColor: '#230030',
        color: '#D1C4DE',
        paddingTop: '4.5rem',
        paddingBottom: '2.5rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      <div className="content-container">
        <div className="row g-4 g-lg-5 mb-5">
          {/* Brand Info */}
          <div className="col-lg-4 col-md-6">
            <Link to="/" className="eventra-logo text-decoration-none mb-3 d-inline-flex">
              <span className="logo-icon">
                <FiCalendar size={20} />
              </span>
              <span>
                Eventra
                <span style={{ color: '#F43F8C', fontSize: '1.2rem', marginLeft: '2px' }}>.</span>
              </span>
            </Link>
            <p className="mt-3 mb-4" style={{ color: '#A899B8', lineHeight: 1.7, fontSize: '0.95rem' }}>
              From electrifying concerts and global technology summits to intimate design masterclasses, Eventra connects thousands of passionate people with unforgettable live experiences.
            </p>
            <div className="d-flex align-items-center gap-3">
              <a
                href="#social"
                className="btn btn-outline-light-custom rounded-circle p-2 d-flex align-items-center justify-content-center"
                style={{ width: 38, height: 38 }}
                aria-label="Instagram"
              >
                <FiInstagram size={17} />
              </a>
              <a
                href="#social"
                className="btn btn-outline-light-custom rounded-circle p-2 d-flex align-items-center justify-content-center"
                style={{ width: 38, height: 38 }}
                aria-label="Twitter"
              >
                <FiTwitter size={17} />
              </a>
              <a
                href="#social"
                className="btn btn-outline-light-custom rounded-circle p-2 d-flex align-items-center justify-content-center"
                style={{ width: 38, height: 38 }}
                aria-label="LinkedIn"
              >
                <FiLinkedin size={17} />
              </a>
              <a
                href="#social"
                className="btn btn-outline-light-custom rounded-circle p-2 d-flex align-items-center justify-content-center"
                style={{ width: 38, height: 38 }}
                aria-label="Facebook"
              >
                <FiFacebook size={17} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h4 className="h6 text-white text-uppercase fw-bold mb-3" style={{ letterSpacing: '0.08em' }}>
              Explore
            </h4>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: '0.92rem' }}>
              <li>
                <Link to="/" style={{ color: '#C2B3D4' }} className="hover-pink">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/events" style={{ color: '#C2B3D4' }} className="hover-pink">
                  All Events
                </Link>
              </li>
              <li>
                <Link to="/about" style={{ color: '#C2B3D4' }} className="hover-pink">
                  About Eventra
                </Link>
              </li>
              <li>
                <Link to="/contact" style={{ color: '#C2B3D4' }} className="hover-pink">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/my-bookings" style={{ color: '#C2B3D4' }} className="hover-pink">
                  Manage Tickets
                </Link>
              </li>
              <li>
                <Link to="/admin/dashboard" style={{ color: '#F43F8C' }} className="fw-semibold">
                  Admin Portal &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-lg-2 col-md-6 col-6">
            <h4 className="h6 text-white text-uppercase fw-bold mb-3" style={{ letterSpacing: '0.08em' }}>
              Categories
            </h4>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: '0.92rem' }}>
              <li>
                <Link to="/events?category=Music+%26+Concerts" style={{ color: '#C2B3D4' }}>
                  Concerts & Music
                </Link>
              </li>
              <li>
                <Link to="/events?category=Technology" style={{ color: '#C2B3D4' }}>
                  Technology Summits
                </Link>
              </li>
              <li>
                <Link to="/events?category=Workshops" style={{ color: '#C2B3D4' }}>
                  Masterclasses
                </Link>
              </li>
              <li>
                <Link to="/events?category=Business" style={{ color: '#C2B3D4' }}>
                  Business & Ventures
                </Link>
              </li>
              <li>
                <Link to="/events?category=Art+%26+Culture" style={{ color: '#C2B3D4' }}>
                  Art Exhibitions
                </Link>
              </li>
              <li>
                <Link to="/events?category=Sports" style={{ color: '#C2B3D4' }}>
                  Sports & Marathons
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="col-lg-4 col-md-6">
            <h4 className="h6 text-white text-uppercase fw-bold mb-3" style={{ letterSpacing: '0.08em' }}>
              Stay In The Loop
            </h4>
            <p style={{ color: '#A899B8', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Receive exclusive early-bird ticket access, secret headliner announcements, and VIP pass giveaways.
            </p>
            {subscribed ? (
              <div
                className="p-3 rounded-3 d-flex align-items-center gap-2"
                style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34D399' }}
              >
                <FiCheckCircle size={20} />
                <span className="small fw-semibold">You're on the VIP guestlist!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe}>
                <div className="input-group">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      color: '#ffffff',
                      padding: '0.75rem 1rem'
                    }}
                  />
                  <button
                    type="submit"
                    className="btn btn-accent-pink px-3"
                    aria-label="Subscribe"
                  >
                    <FiArrowRight size={18} />
                  </button>
                </div>
              </form>
            )}

            <div className="mt-4 pt-2 d-flex flex-column gap-2 text-muted" style={{ fontSize: '0.85rem' }}>
              <div className="d-flex align-items-center gap-2">
                <FiMapPin style={{ color: '#F43F8C' }} /> 100 Broadway, Manhattan, NY 10005
              </div>
              <div className="d-flex align-items-center gap-2">
                <FiMail style={{ color: '#F43F8C' }} /> concierge@eventra.com
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div
          className="pt-4 border-top border-white border-opacity-10 d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 text-muted"
          style={{ fontSize: '0.86rem' }}
        >
          <div>
            &copy; {new Date().getFullYear()} Eventra Technologies Inc. All rights reserved.
          </div>
          <div className="d-flex gap-4">
            <a href="#privacy" style={{ color: '#A899B8' }}>
              Privacy Policy
            </a>
            <a href="#terms" style={{ color: '#A899B8' }}>
              Terms of Service
            </a>
            <a href="#cookies" style={{ color: '#A899B8' }}>
              Cookie Preferences
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
