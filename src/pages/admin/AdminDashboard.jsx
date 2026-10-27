import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  FiDollarSign,
  FiUsers,
  FiCalendar,
  FiTag,
  FiTrendingUp,
  FiPlus,
  FiArrowUpRight,
  FiArrowDownRight,
  FiFilter,
  FiDownload,
  FiCheckCircle,
  FiShield
} from 'react-icons/fi';
import { adminService } from '../../services/adminService';
import { eventService } from '../../services/eventService';
import { useNotification } from '../../context/NotificationContext';

export const AdminDashboard = () => {
  const { success } = useNotification();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('year');

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const data = await adminService.getDashboardAnalytics();
      setAnalytics(data);
      setLoading(false);
    };

    fetchStats();
  }, []);

  if (loading || !analytics) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" style={{ color: '#350047' }} role="status">
          <span className="visually-hidden">Loading analytics...</span>
        </div>
      </div>
    );
  }

  const { stats, trends, performanceComparison, attendeeGrowth, categoriesRevenue, topEvents } = analytics;

  return (
    <div className="d-flex flex-column gap-4">
      {/* Page Title & Actions */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
        <div>
          <h1 className="h4 fw-bold mb-1" style={{ color: '#1F0E2A' }}>
            Event Operations & Analytics Overview
          </h1>
          <p className="text-muted small mb-0">
            Real-time telemetry on revenue, capacity utilization, and attendee registration velocity.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            onClick={() => {
              adminService.exportBookingsCSV();
              success('CSV report generated and downloaded successfully!');
            }}
            className="btn btn-sm btn-outline-purple d-inline-flex align-items-center gap-2"
            style={{ fontSize: '0.85rem' }}
          >
            <FiDownload size={15} /> Export CSV
          </button>

          <Link
            to="/admin/events/create"
            className="btn btn-sm btn-accent-pink d-inline-flex align-items-center gap-2"
            style={{ fontSize: '0.85rem' }}
          >
            <FiPlus size={16} /> Create Event
          </Link>
        </div>
      </div>

      {/* 4 Key Metric Statistic Cards */}
      <div className="row g-3">
        {/* Total Revenue */}
        <div className="col-xl-3 col-sm-6">
          <div className="stat-metric-card h-100">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <span className="text-muted small fw-semibold">Total Revenue</span>
              <div
                className="p-2 rounded-3 text-white"
                style={{ backgroundColor: '#350047' }}
              >
                <FiDollarSign size={16} />
              </div>
            </div>
            <div className="h3 fw-bold mb-1" style={{ color: '#1F0E2A' }}>
              ${stats.totalRevenue.toLocaleString()}
            </div>
            <div className="d-flex align-items-center gap-1 small text-success fw-medium">
              <FiArrowUpRight /> {stats.revenueChange} vs last cycle
            </div>
          </div>
        </div>

        {/* Total Attendees */}
        <div className="col-xl-3 col-sm-6">
          <div className="stat-metric-card h-100">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <span className="text-muted small fw-semibold">Total Attendees</span>
              <div
                className="p-2 rounded-3 text-white"
                style={{ backgroundColor: '#F43F8C' }}
              >
                <FiUsers size={16} />
              </div>
            </div>
            <div className="h3 fw-bold mb-1" style={{ color: '#1F0E2A' }}>
              {stats.totalAttendees.toLocaleString()}
            </div>
            <div className="d-flex align-items-center gap-1 small text-success fw-medium">
              <FiArrowUpRight /> {stats.attendeesChange} new registrations
            </div>
          </div>
        </div>

        {/* Events Hosted */}
        <div className="col-xl-3 col-sm-6">
          <div className="stat-metric-card h-100">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <span className="text-muted small fw-semibold">Events Hosted</span>
              <div
                className="p-2 rounded-3 text-white"
                style={{ backgroundColor: '#7C3AED' }}
              >
                <FiCalendar size={16} />
              </div>
            </div>
            <div className="h3 fw-bold mb-1" style={{ color: '#1F0E2A' }}>
              {stats.eventsHosted}
            </div>
            <div className="d-flex align-items-center gap-1 small text-muted">
              {stats.eventsChange}
            </div>
          </div>
        </div>

        {/* Total Tickets Sold */}
        <div className="col-xl-3 col-sm-6">
          <div className="stat-metric-card h-100">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <span className="text-muted small fw-semibold">Total Tickets Sold</span>
              <div
                className="p-2 rounded-3 text-white"
                style={{ backgroundColor: '#06B6D4' }}
              >
                <FiTag size={16} />
              </div>
            </div>
            <div className="h3 fw-bold mb-1" style={{ color: '#1F0E2A' }}>
              {stats.totalTicketsSold.toLocaleString()}
            </div>
            <div className="d-flex align-items-center gap-1 small text-success fw-medium">
              <FiArrowUpRight /> {stats.ticketsChange} conversion rate
            </div>
          </div>
        </div>
      </div>

      {/* Primary Analytics Charts Row */}
      <div className="row g-4">
        {/* Revenue & Attendance Trends (Area/Line Combined Chart) */}
        <div className="col-xl-8">
          <div className="admin-card h-100">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-4 gap-2">
              <div>
                <h2 className="h6 fw-bold mb-1" style={{ color: '#1F0E2A' }}>
                  Revenue & Attendance Trends
                </h2>
                <div className="text-muted small">
                  Monthly gross ticket volume ($) vs registered attendees
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <span
                  className="badge px-2 py-1 rounded-pill"
                  style={{ backgroundColor: '#FAF7FC', color: '#350047', border: '1px solid #E8E2EE', fontSize: '0.75rem' }}
                >
                  2026 Fiscal Year
                </span>
              </div>
            </div>

            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trends} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#350047" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#350047" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="pinkGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F43F8C" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#F43F8C" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0EAF5" />
                  <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} tickLine={false} />
                  <YAxis yAxisId="left" stroke="#9CA3AF" fontSize={12} tickLine={false} tickFormatter={(val) => `$${val / 1000}k`} />
                  <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" fontSize={12} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E8E2EE',
                      borderRadius: 10,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend iconType="circle" />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue ($)"
                    stroke="#350047"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#purpleGrad)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="attendees"
                    name="Attendees"
                    stroke="#F43F8C"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: '#F43F8C' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Event Categories by Revenue (Donut Chart) */}
        <div className="col-xl-4">
          <div className="admin-card h-100 d-flex flex-column">
            <div className="mb-3">
              <h2 className="h6 fw-bold mb-1" style={{ color: '#1F0E2A' }}>
                Categories by Revenue
              </h2>
              <div className="text-muted small">Distribution across event categories</div>
            </div>

            <div style={{ width: '100%', height: 240 }} className="my-auto">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoriesRevenue}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={95}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {categoriesRevenue.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val) => [`$${val.toLocaleString()}`, 'Revenue']}
                    contentStyle={{ borderRadius: 8, borderColor: '#EAECF0' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Custom Legend */}
            <div className="d-flex flex-column gap-2 mt-2 pt-2 border-top">
              {categoriesRevenue.map((cat, idx) => (
                <div key={idx} className="d-flex justify-content-between align-items-center small">
                  <div className="d-flex align-items-center gap-2">
                    <span
                      className="rounded-circle"
                      style={{ width: 10, height: 10, backgroundColor: cat.color }}
                    />
                    <span className="text-secondary">{cat.name}</span>
                  </div>
                  <span className="fw-bold" style={{ color: '#1F0E2A' }}>
                    ${cat.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Charts & Top Events Row */}
      <div className="row g-4">
        {/* Event Performance Comparison (Bar Chart) */}
        <div className="col-xl-6">
          <div className="admin-card h-100">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="h6 fw-bold mb-1" style={{ color: '#1F0E2A' }}>
                  Event Capacity vs Tickets Sold
                </h2>
                <div className="text-muted small">Comparison of top recent productions</div>
              </div>
            </div>

            <div style={{ width: '100%', height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceComparison} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0EAF5" />
                  <XAxis dataKey="name" stroke="#9CA3AF" fontSize={11} tickLine={false} />
                  <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 8, borderColor: '#EAECF0' }} />
                  <Legend iconType="circle" />
                  <Bar dataKey="capacity" name="Venue Capacity" fill="#E8E2EE" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="sold" name="Tickets Sold" fill="#350047" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Attendee Growth Velocity (Line Chart) */}
        <div className="col-xl-6">
          <div className="admin-card h-100">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="h6 fw-bold mb-1" style={{ color: '#1F0E2A' }}>
                  Attendee Growth Velocity
                </h2>
                <div className="text-muted small">Weekly influx of registered platform users</div>
              </div>
            </div>

            <div style={{ width: '100%', height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attendeeGrowth} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0EAF5" />
                  <XAxis dataKey="week" stroke="#9CA3AF" fontSize={11} tickLine={false} />
                  <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 8, borderColor: '#EAECF0' }} />
                  <Legend iconType="circle" />
                  <Line
                    type="monotone"
                    dataKey="newAttendees"
                    name="New Registrations"
                    stroke="#F43F8C"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: '#F43F8C' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performing Events List Table */}
      <div className="admin-card">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="h6 fw-bold mb-1" style={{ color: '#1F0E2A' }}>
              Top Performing Events
            </h2>
            <div className="text-muted small">Ranked by gross sales volume and capacity fill</div>
          </div>

          <Link to="/admin/events" className="btn btn-sm btn-outline-purple">
            View All Events &rarr;
          </Link>
        </div>

        <div className="table-responsive">
          <table className="table align-middle table-hover mb-0">
            <thead className="table-light small">
              <tr>
                <th>Event Name</th>
                <th>Category</th>
                <th>Gross Sales</th>
                <th>Capacity Sold</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="small">
              {topEvents.map((evt) => (
                <tr key={evt.id}>
                  <td className="fw-semibold text-truncate" style={{ maxWidth: 260, color: '#1F0E2A' }}>
                    {evt.title}
                  </td>
                  <td>
                    <span className="badge-pink-pill" style={{ fontSize: '0.72rem' }}>
                      {evt.category}
                    </span>
                  </td>
                  <td className="fw-bold" style={{ color: '#350047' }}>
                    {evt.sales}
                  </td>
                  <td style={{ minWidth: 150 }}>
                    <div className="d-flex align-items-center gap-2">
                      <div className="progress flex-grow-1" style={{ height: 6 }}>
                        <div
                          className="progress-bar"
                          style={{
                            width: `${evt.soldPercentage}%`,
                            backgroundColor: evt.soldPercentage > 85 ? '#F43F8C' : '#350047'
                          }}
                        />
                      </div>
                      <span className="fw-semibold small">{evt.soldPercentage}%</span>
                    </div>
                  </td>
                  <td>
                    <span className="badge bg-success bg-opacity-10 text-success">
                      {evt.status}
                    </span>
                  </td>
                  <td>
                    <Link to={`/admin/events`} className="text-decoration-none fw-semibold" style={{ color: '#350047' }}>
                      Manage &rarr;
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
