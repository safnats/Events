import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiPlus,
  FiSearch,
  FiEdit,
  FiTrash2,
  FiEye,
  FiFilter,
  FiCalendar,
  FiMapPin,
  FiCheckCircle,
  FiAlertTriangle
} from 'react-icons/fi';
import { eventService } from '../../services/eventService';
import { useNotification } from '../../context/NotificationContext';
import { ImageWithFallback } from '../../components/common/ImageWithFallback';

export const AdminEvents = () => {
  const { success, error } = useNotification();
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const loadEvents = async () => {
    setLoading(true);
    const data = await eventService.getEvents();
    setEvents(data);
    setLoading(false);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete or cancel "${title}"?`)) {
      await eventService.deleteEvent(id);
      success(`Event "${title}" was deleted.`);
      loadEvents();
    }
  };

  const handleTogglePublish = async (event) => {
    const nextStatus = event.status === 'Published' ? 'Draft' : 'Published';
    await eventService.updateEvent(event.id, { status: nextStatus });
    success(`Event status changed to ${nextStatus}.`);
    loadEvents();
  };

  const filtered = events.filter((evt) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        evt.title.toLowerCase().includes(q) ||
        evt.category.toLowerCase().includes(q) ||
        evt.venue.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (statusFilter !== 'All' && evt.status !== statusFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="d-flex flex-column gap-4">
      {/* Header */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
        <div>
          <h1 className="h4 fw-bold mb-1" style={{ color: '#1F0E2A' }}>
            Event Inventory Management
          </h1>
          <p className="text-muted small mb-0">
            Publish, edit schedules, manage venue allocations, and adjust ticket quotas.
          </p>
        </div>

        <Link to="/admin/events/create" className="btn btn-sm btn-accent-pink d-inline-flex align-items-center gap-2">
          <FiPlus size={16} /> Create New Event
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="admin-card p-3">
        <div className="row g-3 align-items-center">
          <div className="col-md-6 col-lg-5">
            <div className="position-relative">
              <FiSearch
                className="position-absolute text-muted"
                style={{ top: '50%', left: 14, transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                className="form-control form-control-sm ps-5"
                placeholder="Search by title, category, venue..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ borderRadius: 8, height: 38 }}
              />
            </div>
          </div>

          <div className="col-md-4 col-lg-3">
            <select
              className="form-select form-select-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ borderRadius: 8, height: 38 }}
            >
              <option value="All">All Statuses</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
              <option value="Past">Past</option>
            </select>
          </div>

          <div className="col-md-2 col-lg-4 text-md-end text-muted small">
            Total Listed: <strong>{filtered.length}</strong> events
          </div>
        </div>
      </div>

      {/* Events Table */}
      <div className="admin-card p-0 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light small">
              <tr>
                <th style={{ width: 80 }}>Image</th>
                <th>Title & Category</th>
                <th>Schedule</th>
                <th>Venue & City</th>
                <th>Tickets Sold / Cap</th>
                <th>Price</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody className="small">
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    <div className="spinner-border spinner-border-sm text-primary" role="status" />
                  </td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((evt) => (
                  <tr key={evt.id}>
                    <td>
                      <div
                        className="rounded-3 overflow-hidden"
                        style={{ width: 60, height: 44, backgroundColor: '#350047' }}
                      >
                        <ImageWithFallback
                          src={evt.image}
                          alt=""
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    </td>

                    <td>
                      <div className="fw-bold" style={{ color: '#1F0E2A', maxWidth: 220 }}>
                        <Link to={`/events/${evt.id}`} className="text-decoration-none hover-pink" style={{ color: '#1F0E2A' }}>
                          {evt.title}
                        </Link>
                      </div>
                      <span className="badge-pink-pill" style={{ fontSize: '0.68rem', padding: '0.2rem 0.5rem' }}>
                        {evt.category}
                      </span>
                    </td>

                    <td className="text-muted">
                      <div>{evt.date}</div>
                      <div style={{ fontSize: '0.72rem' }}>{evt.time}</div>
                    </td>

                    <td className="text-muted">
                      <div className="text-truncate" style={{ maxWidth: 160 }}>
                        {evt.venue}
                      </div>
                      <div style={{ fontSize: '0.72rem' }}>{evt.location}</div>
                    </td>

                    <td>
                      <div className="fw-semibold">
                        {(evt.ticketsSold || 0).toLocaleString()} / {(evt.capacity || 1000).toLocaleString()}
                      </div>
                      <div className="progress mt-1" style={{ height: 4, width: 90 }}>
                        <div
                          className="progress-bar"
                          style={{
                            width: `${Math.min(100, Math.round(((evt.ticketsSold || 0) / (evt.capacity || 1000)) * 100))}%`,
                            backgroundColor: '#350047'
                          }}
                        />
                      </div>
                    </td>

                    <td className="fw-bold" style={{ color: '#350047' }}>
                      ${evt.startingPrice}
                    </td>

                    <td>
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(evt)}
                        className={`badge border-0 rounded-pill px-2 py-1 cursor-pointer ${
                          evt.status === 'Published'
                            ? 'bg-success bg-opacity-10 text-success'
                            : 'bg-secondary bg-opacity-10 text-secondary'
                        }`}
                        title="Click to toggle publish status"
                        style={{ cursor: 'pointer' }}
                      >
                        {evt.status || 'Published'}
                      </button>
                    </td>

                    <td className="text-end">
                      <div className="d-flex align-items-center justify-content-end gap-1">
                        <Link
                          to={`/events/${evt.id}`}
                          className="btn btn-sm btn-light p-1"
                          title="View live page"
                        >
                          <FiEye size={15} />
                        </Link>
                        <Link
                          to={`/admin/events/edit/${evt.id}`}
                          className="btn btn-sm btn-light p-1 text-primary"
                          title="Edit event"
                        >
                          <FiEdit size={15} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(evt.id, evt.title)}
                          className="btn btn-sm btn-light p-1 text-danger"
                          title="Delete event"
                        >
                          <FiTrash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-muted">
                    No events match the selected criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
