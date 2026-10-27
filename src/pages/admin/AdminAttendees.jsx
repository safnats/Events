import React, { useState, useEffect } from 'react';
import {
  FiSearch,
  FiUserCheck,
  FiMail,
  FiPhone,
  FiCalendar,
  FiAward
} from 'react-icons/fi';
import { adminService } from '../../services/adminService';

export const AdminAttendees = () => {
  const [attendees, setAttendees] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendees = async () => {
      setLoading(true);
      const data = await adminService.getAttendees();
      setAttendees(data);
      setLoading(false);
    };

    fetchAttendees();
  }, []);

  const filtered = attendees.filter((att) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      att.name.toLowerCase().includes(q) ||
      att.email.toLowerCase().includes(q) ||
      (att.phone && att.phone.toLowerCase().includes(q))
    );
  });

  return (
    <div className="d-flex flex-column gap-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h1 className="h4 fw-bold mb-1" style={{ color: '#1F0E2A' }}>
            Attendee Directory & CRM
          </h1>
          <p className="text-muted small mb-0">
            Registered ticket purchasers, order volume frequency, and VIP classifications.
          </p>
        </div>
      </div>

      {/* Search Input */}
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
                placeholder="Search attendee by name, email, phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ borderRadius: 8, height: 38 }}
              />
            </div>
          </div>
          <div className="col-md-6 col-lg-7 text-md-end text-muted small">
            Total Attendees: <strong>{filtered.length}</strong>
          </div>
        </div>
      </div>

      {/* Attendees Table */}
      <div className="admin-card p-0 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light small">
              <tr>
                <th>Attendee Profile</th>
                <th>Email Address</th>
                <th>Phone</th>
                <th>Total Bookings</th>
                <th>Total Spent</th>
                <th>Registered Date</th>
                <th>Tier Status</th>
              </tr>
            </thead>
            <tbody className="small">
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    <div className="spinner-border spinner-border-sm text-primary" role="status" />
                  </td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((att) => (
                  <tr key={att.id}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={att.avatar}
                          alt=""
                          className="rounded-circle"
                          style={{ width: 36, height: 36, objectFit: 'cover' }}
                        />
                        <div className="fw-bold" style={{ color: '#1F0E2A' }}>
                          {att.name}
                        </div>
                      </div>
                    </td>

                    <td className="text-muted">{att.email}</td>

                    <td className="text-muted">{att.phone || 'N/A'}</td>

                    <td>
                      <span className="badge bg-light text-secondary border px-2 py-1">
                        {att.bookingCount} Orders
                      </span>
                    </td>

                    <td className="fw-bold" style={{ color: '#350047' }}>
                      ${att.totalSpent}
                    </td>

                    <td className="text-muted">{att.registrationDate}</td>

                    <td>
                      <span
                        className={`badge ${
                          att.status === 'VIP'
                            ? 'badge-pink-pill'
                            : 'bg-light text-secondary border'
                        }`}
                      >
                        {att.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-muted">
                    No attendees found.
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
