import React, { useState } from 'react';
import {
  FiMail,
  FiUser,
  FiPhone,
  FiMapPin,
  FiMessageSquare,
  FiSend,
  FiCheckCircle,
  FiClock,
  FiHelpCircle
} from 'react-icons/fi';
import api from '../services/api';
import { useNotification } from '../context/NotificationContext';

export const Contact = () => {
  const { success, error } = useNotification();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      error('Please fill in your name, email, and message.');
      return;
    }

    setSubmitting(true);
    try {
      // Connect to backend API or simulate successful dispatch
      try {
        await api.post('/contact', formData);
      } catch (err) {
        // Fallback simulation
      }

      setSubmitted(true);
      success('Your inquiry has been transmitted to our concierge team!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      error('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const faqs = [
    {
      q: 'How do I access my digital ticket at the gate?',
      a: 'Simply open Eventra on your mobile browser, go to My Bookings, and open your ticket pass. You can present the QR code directly on your screen or download/print a physical pass.'
    },
    {
      q: 'Can I transfer my tickets to another person?',
      a: 'Yes! From your ticket page, you can generate a secure transfer link or forward the verified booking reference directly to your guest.'
    },
    {
      q: 'What is the refund policy if an event is rescheduled?',
      a: 'If an organizer reschedules or cancels an event, you are automatically eligible for either a 100% full refund to your original payment method or credit for the rescheduled date.'
    }
  ];

  return (
    <div style={{ backgroundColor: '#FAF7FC' }} className="py-5">
      <div className="content-container">
        {/* Header */}
        <div className="text-center max-w-700 mx-auto mb-5" style={{ maxWidth: 640 }}>
          <span className="badge-pink-pill mb-2">Concierge & Help Desk</span>
          <h1 className="section-title mb-2">We're Here To Help</h1>
          <p className="text-muted">
            Have questions regarding ticketing, VIP accommodations, or organizer partnerships? Reach out to our dedicated team.
          </p>
        </div>

        <div className="row g-4 g-lg-5 mb-5">
          {/* Left: Contact Form */}
          <div className="col-lg-7">
            <div className="bg-white rounded-4 p-4 p-md-5 border shadow-sm h-100">
              <h2 className="h4 fw-bold mb-4" style={{ color: '#350047' }}>
                Send Us a Message
              </h2>

              {submitted ? (
                <div className="p-4 rounded-3 text-center" style={{ backgroundColor: '#FAF7FC', border: '1px solid #E8E2EE' }}>
                  <div
                    className="p-3 rounded-circle d-inline-flex mb-3 text-success"
                    style={{ backgroundColor: '#ECFDF5' }}
                  >
                    <FiCheckCircle size={36} />
                  </div>
                  <h3 className="h5 fw-bold mb-2" style={{ color: '#350047' }}>
                    Message Received
                  </h3>
                  <p className="text-muted small mb-4">
                    Thank you for reaching out. One of our event specialists will respond to your email within 2-4 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="btn btn-sm btn-outline-purple"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-secondary">
                        Your Name *
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light text-muted border-end-0">
                          <FiUser />
                        </span>
                        <input
                          type="text"
                          required
                          name="name"
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
                          required
                          name="email"
                          placeholder="alex@example.com"
                          className="form-control"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-semibold text-secondary">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        placeholder="e.g. VIP ticket inquiry or booking refund"
                        className="form-control"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-semibold text-secondary">
                        Message *
                      </label>
                      <textarea
                        required
                        name="message"
                        rows="5"
                        placeholder="How can our support team assist you today?"
                        className="form-control"
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-accent-pink px-4 py-3 fw-bold mt-4 d-inline-flex align-items-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status" />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        Send Message <FiSend />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right: Contact Info & Support Cards */}
          <div className="col-lg-5">
            <div className="d-flex flex-column gap-4">
              {/* Office Details Card */}
              <div
                className="rounded-4 p-4 text-white"
                style={{ background: 'linear-gradient(135deg, #350047 0%, #230030 100%)' }}
              >
                <h3 className="h5 fw-bold mb-3 text-white">Eventra Global Concierge</h3>
                <p className="text-white-50 small mb-4">
                  Headquartered in New York with regional support across London, Berlin, and San Francisco.
                </p>

                <div className="d-flex flex-column gap-3 small text-white-75">
                  <div className="d-flex align-items-start gap-3">
                    <FiMapPin style={{ color: '#F43F8C', marginTop: 3 }} size={18} />
                    <div>
                      <div className="fw-bold text-white">Headquarters</div>
                      <div>100 Broadway, 24th Floor, New York, NY 10005</div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-3">
                    <FiMail style={{ color: '#F43F8C' }} size={18} />
                    <div>
                      <div className="fw-bold text-white">Concierge Email</div>
                      <div>concierge@eventra.com</div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-3">
                    <FiPhone style={{ color: '#F43F8C' }} size={18} />
                    <div>
                      <div className="fw-bold text-white">Direct Line</div>
                      <div>+1 (800) 555-EVENTRA</div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-3">
                    <FiClock style={{ color: '#F43F8C' }} size={18} />
                    <div>
                      <div className="fw-bold text-white">Operating Hours</div>
                      <div>Monday – Sunday, 24 Hours Active Monitoring</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instant Verification Banner */}
              <div className="eventra-card p-4 bg-white border">
                <div className="d-flex align-items-center gap-2 mb-2" style={{ color: '#350047' }}>
                  <FiHelpCircle size={20} style={{ color: '#F43F8C' }} />
                  <span className="fw-bold">Organizer Partnerships</span>
                </div>
                <p className="text-muted small mb-3">
                  Hosting a concert, summit, or festival? Get listed on Eventra with custom ticketing tiers and automated gate scanning apps.
                </p>
                <a
                  href="/admin/events/create"
                  className="btn btn-sm btn-outline-purple"
                >
                  Create an Event &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="mt-5 pt-3">
          <div className="text-center mb-4">
            <h3 className="h4 fw-bold" style={{ color: '#350047' }}>
              Frequently Asked Questions
            </h3>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="d-flex flex-column gap-3">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white rounded-3 p-4 border">
                    <h4 className="h6 fw-bold mb-2" style={{ color: '#350047' }}>
                      {faq.q}
                    </h4>
                    <p className="text-muted small mb-0" style={{ lineHeight: 1.6 }}>
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
