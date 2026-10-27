import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiCalendar,
  FiCheckCircle
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { EVENT_IMAGES } from '../assets/images';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

export const Register = () => {
  const { register } = useAuth();
  const { success, error } = useNotification();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      error('Please complete all required fields.');
      return;
    }

    if (formData.password.length < 6) {
      error('Password must be at least 6 characters.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      error('Passwords do not match. Please re-enter.');
      return;
    }

    setLoading(true);
    const result = await register({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password
    });
    setLoading(false);

    if (result.success) {
      success(`Welcome to Eventra, ${result.user.name}! Your account has been created.`);
      navigate('/dashboard');
    } else {
      error(result.error || 'Registration failed. Please check details.');
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#FAF7FC',
        minHeight: '88vh',
        display: 'flex',
        alignItems: 'center'
      }}
      className="py-5"
    >
      <div className="content-container w-100">
        <div
          className="eventra-card mx-auto shadow-lg overflow-hidden border-0"
          style={{ maxWidth: 1000 }}
        >
          <div className="row g-0">
            {/* Left Column: Visual Showcase */}
            <div
              className="col-lg-5 d-none d-lg-block position-relative"
              style={{ backgroundColor: '#230030', minHeight: 600 }}
            >
              <ImageWithFallback
                src={EVENT_IMAGES.music2}
                alt="Live Concert Stage"
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
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
                  <div className="p-2 rounded-2 text-white" style={{ backgroundColor: '#F43F8C' }}>
                    <FiCalendar size={18} />
                  </div>
                  <span className="fw-bold fs-5">Eventra</span>
                </div>

                <div>
                  <h3 className="h3 fw-bold text-white mb-2">
                    Never miss a beat.
                  </h3>
                  <p className="text-white-50 small mb-4">
                    Create your free account to bookmark events, access mobile tickets offline, and receive presale alerts.
                  </p>

                  <div className="d-flex flex-column gap-2 text-white-50 small">
                    <div className="d-flex align-items-center gap-2">
                      <FiCheckCircle style={{ color: '#10B981' }} /> Real-time ticket QR passbook
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <FiCheckCircle style={{ color: '#10B981' }} /> Official partner verified organizers
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <FiCheckCircle style={{ color: '#10B981' }} /> Zero hidden markup or surprise fees
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Register Form */}
            <div className="col-lg-7 p-4 p-md-5 bg-white d-flex flex-column justify-content-center">
              <div className="mb-4">
                <span className="badge-pink-pill mb-2">Get Started</span>
                <h2 className="h3 fw-bold mb-1" style={{ color: '#350047' }}>
                  Create Your Eventra Account
                </h2>
                <p className="text-muted small">
                  Fill in your details below to begin booking tickets.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label small fw-semibold text-secondary">
                      Full Name *
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light text-muted border-end-0">
                        <FiUser />
                      </span>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Alex Morgan"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-secondary">
                      Email Address *
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light text-muted border-end-0">
                        <FiMail />
                      </span>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="alex@example.com"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
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
                        type="tel"
                        name="phone"
                        placeholder="+1 (555) 000-0000"
                        className="form-control"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-secondary">
                      Password *
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light text-muted border-end-0">
                        <FiLock />
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        required
                        placeholder="Min 6 characters"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        className="input-group-text bg-light text-muted border-start-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-secondary">
                      Confirm Password *
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light text-muted border-end-0">
                        <FiLock />
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        required
                        placeholder="Re-enter password"
                        className="form-control"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-check my-3">
                  <input
                    type="checkbox"
                    required
                    id="termsAgree"
                    className="form-check-input"
                  />
                  <label htmlFor="termsAgree" className="form-check-label small text-muted">
                    I agree to the Eventra Terms of Service and Privacy Policy.
                  </label>
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
                      Complete Registration <FiArrowRight />
                    </>
                  )}
                </button>

                <div className="text-center small text-muted">
                  Already have an Eventra account?{' '}
                  <Link to="/login" className="fw-bold" style={{ color: '#350047' }}>
                    Sign In
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
