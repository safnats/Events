import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiCalendar,
  FiShield,
  FiCheck
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { EVENT_IMAGES } from '../assets/images';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

export const Login = () => {
  const { login } = useAuth();
  const { success, error } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      error('Please enter both your email address and password.');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      success(`Welcome back, ${result.user.name}!`);
      // If user is admin and was heading nowhere specific, go to admin dashboard
      if (result.user.role === 'admin' && from === '/dashboard') {
        navigate('/admin/dashboard');
      } else {
        navigate(from, { replace: true });
      }
    } else {
      error(result.error || 'Invalid credentials. Please verify your email & password.');
    }
  };

  const fillDemoAccount = (demoRole) => {
    if (demoRole === 'admin') {
      setEmail('admin@eventra.com');
      setPassword('AdminPass2026!');
    } else {
      setEmail('alex.morgan@eventra.com');
      setPassword('AttendeePass2026!');
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#FAF7FC',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center'
      }}
      className="py-5"
    >
      <div className="content-container w-100">
        <div
          className="eventra-card mx-auto shadow-lg overflow-hidden border-0"
          style={{ maxWidth: 960 }}
        >
          <div className="row g-0">
            {/* Left Column: Visual Showcase */}
            <div
              className="col-lg-6 d-none d-lg-block position-relative"
              style={{ backgroundColor: '#230030', minHeight: 520 }}
            >
              <ImageWithFallback
                src={EVENT_IMAGES.music1}
                alt="Concert Experience"
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
              />
              <div
                className="position-absolute inset-0 p-5 d-flex flex-column justify-content-between text-white"
                style={{
                  background: 'linear-gradient(180deg, rgba(35, 0, 48, 0.4) 0%, rgba(35, 0, 48, 0.95) 100%)',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0
                }}
              >
                <div className="d-flex align-items-center gap-2">
                  <div
                    className="p-2 rounded-2 text-white"
                    style={{ backgroundColor: '#F43F8C' }}
                  >
                    <FiCalendar size={18} />
                  </div>
                  <span className="fw-bold fs-5 tracking-tight">Eventra</span>
                </div>

                <div>
                  <span
                    className="badge mb-2 px-3 py-1 rounded-pill"
                    style={{ backgroundColor: 'rgba(244, 63, 140, 0.3)', color: '#FF75B0' }}
                  >
                    MEMBER ACCESS
                  </span>
                  <h3 className="h3 fw-bold text-white mb-2">
                    Step inside the world's most memorable moments.
                  </h3>
                  <p className="text-white-50 small mb-0">
                    Your digital tickets, personal passbook, and booking invoices in one seamless portal.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Login Form */}
            <div className="col-lg-6 p-4 p-md-5 bg-white d-flex flex-column justify-content-center">
              <div className="mb-4">
                <h2 className="h3 fw-bold mb-1" style={{ color: '#350047' }}>
                  Sign In to Eventra
                </h2>
                <p className="text-muted small">
                  Access your upcoming events and manage bookings.
                </p>
              </div>

              {/* Demo Quick Buttons for Smooth Evaluation */}
              <div
                className="p-3 rounded-3 mb-4 border"
                style={{ backgroundColor: '#FAF7FC', borderColor: '#E8E2EE' }}
              >
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="small text-muted fw-bold" style={{ fontSize: '0.72rem' }}>
                    QUICK DEMO CREDENTIALS:
                  </span>
                </div>
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    onClick={() => fillDemoAccount('attendee')}
                    className="btn btn-sm btn-outline-purple flex-fill py-1 text-nowrap"
                    style={{ fontSize: '0.78rem' }}
                  >
                    Attendee Demo
                  </button>
                  <button
                    type="button"
                    onClick={() => fillDemoAccount('admin')}
                    className="btn btn-sm btn-outline-pink flex-fill py-1 text-nowrap"
                    style={{ fontSize: '0.78rem' }}
                  >
                    Admin Demo
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold text-secondary">
                    Email Address
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-muted border-end-0">
                      <FiMail />
                    </span>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ borderRadius: '0 8px 8px 0' }}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label className="form-label small fw-semibold text-secondary mb-0">
                      Password
                    </label>
                    <a href="#forgot" className="small text-decoration-none" style={{ color: '#F43F8C', fontSize: '0.78rem' }}>
                      Forgot Password?
                    </a>
                  </div>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-muted border-end-0">
                      <FiLock />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Enter your password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="input-group-text bg-light text-muted border-start-0"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      className="form-check-input"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      style={{ borderColor: '#D1C4DE' }}
                    />
                    <label htmlFor="rememberMe" className="form-check-label small text-muted">
                      Remember me on this browser
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-accent-pink w-100 py-3 fw-bold mb-3 d-flex align-items-center justify-content-center gap-2"
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm" role="status" />
                  ) : (
                    <>
                      Sign In <FiArrowRight />
                    </>
                  )}
                </button>

                <div className="text-center small text-muted">
                  Don't have an Eventra account?{' '}
                  <Link to="/register" className="fw-bold" style={{ color: '#350047' }}>
                    Create Account
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
