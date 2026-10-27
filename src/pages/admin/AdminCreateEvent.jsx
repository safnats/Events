import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  FiArrowLeft,
  FiUploadCloud,
  FiPlus,
  FiTrash2,
  FiSave,
  FiEye,
  FiCheck,
  FiImage
} from 'react-icons/fi';
import { eventService } from '../../services/eventService';
import { useNotification } from '../../context/NotificationContext';
import { EVENT_IMAGES } from '../../assets/images';
import { INITIAL_CATEGORIES } from '../../data/mockData';
import { ImageWithFallback } from '../../components/common/ImageWithFallback';

export const AdminCreateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { success, error } = useNotification();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Music & Concerts',
    description: '',
    fullDescription: '',
    image: EVENT_IMAGES.music1,
    date: '2026-11-20',
    time: '19:00',
    endDate: '2026-11-20',
    endTime: '23:00',
    venue: '',
    address: '',
    location: 'New York, NY',
    startingPrice: 65,
    capacity: 2500,
    bookingDeadline: '2026-11-19',
    status: 'Published',
    organizerName: 'Eventra Premier Productions',
    organizerEmail: 'organizer@eventra.com',
    organizerRole: 'Event Host'
  });

  const [ticketTypes, setTicketTypes] = useState([
    { name: 'General Admission', price: 65, available: 1500, description: 'Standard floor access' },
    { name: 'VIP Pass', price: 150, available: 300, description: 'Priority lane and lounge entry' }
  ]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing) {
      const loadExisting = async () => {
        const found = await eventService.getEventById(id);
        if (found) {
          setFormData({
            title: found.title || '',
            category: found.category || 'Music & Concerts',
            description: found.description || '',
            fullDescription: found.fullDescription || '',
            image: found.image || EVENT_IMAGES.music1,
            date: found.date || '',
            time: found.time || '',
            endDate: found.endDate || '',
            endTime: found.endTime || '',
            venue: found.venue || '',
            address: found.address || '',
            location: found.location || '',
            startingPrice: found.startingPrice || 65,
            capacity: found.capacity || 2000,
            bookingDeadline: found.bookingDeadline || '',
            status: found.status || 'Published',
            organizerName: found.organizer?.name || 'Eventra Premier Productions',
            organizerEmail: found.organizer?.email || 'organizer@eventra.com',
            organizerRole: found.organizer?.role || 'Event Host'
          });
          if (found.ticketTypes && found.ticketTypes.length > 0) {
            setTicketTypes(found.ticketTypes);
          }
        }
      };
      loadExisting();
    }
  }, [id, isEditing]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTicketChange = (index, field, value) => {
    const updated = [...ticketTypes];
    updated[index][field] = value;
    setTicketTypes(updated);
  };

  const addTicketType = () => {
    setTicketTypes((prev) => [
      ...prev,
      { name: 'New Tier Pass', price: 95, available: 200, description: 'Tier benefits description' }
    ]);
  };

  const removeTicketType = (index) => {
    if (ticketTypes.length <= 1) {
      error('An event must possess at least one ticket tier.');
      return;
    }
    setTicketTypes((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.venue.trim() || !formData.date) {
      error('Please complete required event parameters (Title, Date, Venue).');
      return;
    }

    setLoading(true);

    const payload = {
      ...formData,
      ticketTypes,
      startingPrice: Number(ticketTypes[0]?.price) || Number(formData.startingPrice) || 50,
      organizer: {
        name: formData.organizerName,
        email: formData.organizerEmail,
        role: formData.organizerRole,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        verified: true
      }
    };

    try {
      if (isEditing) {
        await eventService.updateEvent(id, payload);
        success(`Event "${formData.title}" updated successfully!`);
      } else {
        await eventService.createEvent(payload);
        success(`New event "${formData.title}" published!`);
      }
      navigate('/admin/events');
    } catch (err) {
      error(err.message || 'Failed to persist event.');
    } finally {
      setLoading(false);
    }
  };

  // Preset image gallery for quick selection
  const presetImages = [
    { label: 'Concert Stage', url: EVENT_IMAGES.music1 },
    { label: 'Festival Crowd', url: EVENT_IMAGES.music2 },
    { label: 'Tech Conference', url: EVENT_IMAGES.tech1 },
    { label: 'Workshop', url: EVENT_IMAGES.workshop1 },
    { label: 'Business Summit', url: EVENT_IMAGES.business1 },
    { label: 'Art Gallery', url: EVENT_IMAGES.art1 },
    { label: 'Sports Arena', url: EVENT_IMAGES.sports1 }
  ];

  return (
    <div className="d-flex flex-column gap-4 pb-5">
      {/* Top Header */}
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <Link
            to="/admin/events"
            className="text-decoration-none text-muted small d-inline-flex align-items-center gap-1 mb-2 hover-pink"
          >
            <FiArrowLeft /> Back to event catalog
          </Link>
          <h1 className="h4 fw-bold mb-0" style={{ color: '#1F0E2A' }}>
            {isEditing ? 'Edit Event Details' : 'Create New Event Experience'}
          </h1>
        </div>

        <div className="d-flex align-items-center gap-2">
          <Link to="/admin/events" className="btn btn-sm btn-outline-secondary">
            Cancel
          </Link>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="btn btn-sm btn-accent-pink d-inline-flex align-items-center gap-2"
          >
            <FiSave size={16} /> {loading ? 'Saving...' : 'Save & Publish'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          {/* Main Form Left Column */}
          <div className="col-lg-8 d-flex flex-column gap-4">
            {/* 1. Basic Information */}
            <div className="admin-card">
              <h2 className="h6 fw-bold mb-3 pb-2 border-bottom" style={{ color: '#350047' }}>
                1. General Information
              </h2>

              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label small fw-semibold text-secondary">Event Title *</label>
                  <input
                    type="text"
                    required
                    name="title"
                    className="form-control"
                    placeholder="e.g. Neon Horizon Music & Lights Festival 2026"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-secondary">Category *</label>
                  <select
                    name="category"
                    className="form-select"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    {INITIAL_CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-secondary">Publishing Status</label>
                  <select
                    name="status"
                    className="form-select"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="Published">Published (Live on Public Portal)</option>
                    <option value="Draft">Draft (Internal preview only)</option>
                    <option value="Past">Past / Archived</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label small fw-semibold text-secondary">Short Summary Description *</label>
                  <textarea
                    required
                    rows="2"
                    name="description"
                    className="form-control"
                    placeholder="Brief 1-2 sentence hook for cards and previews"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label small fw-semibold text-secondary">Full Comprehensive Agenda & Description</label>
                  <textarea
                    rows="4"
                    name="fullDescription"
                    className="form-control"
                    placeholder="In-depth details on stages, performances, speakers, and schedule..."
                    value={formData.fullDescription}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* 2. Schedule & Venue */}
            <div className="admin-card">
              <h2 className="h6 fw-bold mb-3 pb-2 border-bottom" style={{ color: '#350047' }}>
                2. Schedule, Dates & Venue
              </h2>

              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label small fw-semibold text-secondary">Start Date *</label>
                  <input
                    type="date"
                    required
                    name="date"
                    className="form-control"
                    value={formData.date}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label small fw-semibold text-secondary">Start Time *</label>
                  <input
                    type="time"
                    required
                    name="time"
                    className="form-control"
                    value={formData.time}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label small fw-semibold text-secondary">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    className="form-control"
                    value={formData.endDate}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label small fw-semibold text-secondary">End Time</label>
                  <input
                    type="time"
                    name="endTime"
                    className="form-control"
                    value={formData.endTime}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-secondary">Venue Name *</label>
                  <input
                    type="text"
                    required
                    name="venue"
                    className="form-control"
                    placeholder="e.g. Avant Gardner - Mirage Stage"
                    value={formData.venue}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-secondary">City, Region/State *</label>
                  <input
                    type="text"
                    required
                    name="location"
                    className="form-control"
                    placeholder="e.g. Brooklyn, New York"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label small fw-semibold text-secondary">Exact Street Address</label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    placeholder="e.g. 1028 Grand St, Brooklyn, NY 11211"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-secondary">Max Venue Capacity</label>
                  <input
                    type="number"
                    name="capacity"
                    className="form-control"
                    value={formData.capacity}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-secondary">Ticket Booking Deadline</label>
                  <input
                    type="date"
                    name="bookingDeadline"
                    className="form-control"
                    value={formData.bookingDeadline}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* 3. Ticket Tiers & Pricing */}
            <div className="admin-card">
              <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                <h2 className="h6 fw-bold mb-0" style={{ color: '#350047' }}>
                  3. Ticket Tiers & Pricing Tiers
                </h2>
                <button
                  type="button"
                  onClick={addTicketType}
                  className="btn btn-sm btn-outline-purple d-inline-flex align-items-center gap-1"
                >
                  <FiPlus size={14} /> Add Tier
                </button>
              </div>

              <div className="d-flex flex-column gap-3">
                {ticketTypes.map((tier, idx) => (
                  <div key={idx} className="p-3 rounded-3 border bg-light">
                    <div className="row g-2 align-items-center">
                      <div className="col-md-4">
                        <label className="form-label small fw-semibold text-muted mb-1">Tier Name</label>
                        <input
                          type="text"
                          required
                          className="form-control form-control-sm"
                          value={tier.name}
                          onChange={(e) => handleTicketChange(idx, 'name', e.target.value)}
                        />
                      </div>

                      <div className="col-md-3">
                        <label className="form-label small fw-semibold text-muted mb-1">Price ($)</label>
                        <input
                          type="number"
                          required
                          className="form-control form-control-sm"
                          value={tier.price}
                          onChange={(e) => handleTicketChange(idx, 'price', Number(e.target.value))}
                        />
                      </div>

                      <div className="col-md-3">
                        <label className="form-label small fw-semibold text-muted mb-1">Quantity Available</label>
                        <input
                          type="number"
                          required
                          className="form-control form-control-sm"
                          value={tier.available}
                          onChange={(e) => handleTicketChange(idx, 'available', Number(e.target.value))}
                        />
                      </div>

                      <div className="col-md-2 text-end pt-3">
                        <button
                          type="button"
                          onClick={() => removeTicketType(idx)}
                          className="btn btn-sm btn-outline-danger p-1"
                          title="Delete tier"
                        >
                          <FiTrash2 size={15} />
                        </button>
                      </div>

                      <div className="col-12 mt-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Short description of tier perks / inclusions"
                          value={tier.description || ''}
                          onChange={(e) => handleTicketChange(idx, 'description', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Media Preview & Organizer */}
          <div className="col-lg-4 d-flex flex-column gap-4">
            {/* Banner Image Preview */}
            <div className="admin-card">
              <h2 className="h6 fw-bold mb-3 pb-2 border-bottom" style={{ color: '#350047' }}>
                Banner Image
              </h2>

              <div className="mb-3">
                <div
                  className="rounded-3 overflow-hidden mb-3 border position-relative"
                  style={{ height: 180, backgroundColor: '#350047' }}
                >
                  <ImageWithFallback
                    src={formData.image}
                    alt="Preview"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    className="position-absolute bottom-0 start-0 w-100 p-2 text-white small"
                    style={{ background: 'rgba(0,0,0,0.6)' }}
                  >
                    Live Preview
                  </div>
                </div>

                <label className="form-label small fw-semibold text-secondary">Image URL</label>
                <input
                  type="url"
                  name="image"
                  className="form-control form-control-sm"
                  placeholder="https://..."
                  value={formData.image}
                  onChange={handleInputChange}
                />
              </div>

              {/* Quick Select Preset Images */}
              <div>
                <label className="form-label small fw-semibold text-muted mb-2">Or Choose Verified Preset:</label>
                <div className="d-flex flex-wrap gap-1">
                  {presetImages.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, image: preset.url }))}
                      className={`btn btn-xs rounded-pill py-1 px-2 ${
                        formData.image === preset.url ? 'btn-primary-purple' : 'btn-light border'
                      }`}
                      style={{ fontSize: '0.72rem' }}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Organizer Details */}
            <div className="admin-card">
              <h2 className="h6 fw-bold mb-3 pb-2 border-bottom" style={{ color: '#350047' }}>
                Organizer Profile
              </h2>

              <div className="mb-3">
                <label className="form-label small fw-semibold text-secondary">Organization Name</label>
                <input
                  type="text"
                  name="organizerName"
                  className="form-control form-control-sm"
                  value={formData.organizerName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold text-secondary">Support Email</label>
                <input
                  type="email"
                  name="organizerEmail"
                  className="form-control form-control-sm"
                  value={formData.organizerEmail}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="form-label small fw-semibold text-secondary">Role / Credential</label>
                <input
                  type="text"
                  name="organizerRole"
                  className="form-control form-control-sm"
                  value={formData.organizerRole}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Save Card */}
            <div className="admin-card bg-light">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-accent-pink w-100 py-3 fw-bold"
              >
                {loading ? 'Processing...' : isEditing ? 'Save Changes' : 'Create & Publish Event'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
