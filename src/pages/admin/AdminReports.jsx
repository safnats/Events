import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  FiDownload,
  FiCalendar,
  FiTrendingUp,
  FiDollarSign,
  FiTag,
  FiFilter
} from 'react-icons/fi';
import { adminService } from '../../services/adminService';
import { useNotification } from '../../context/NotificationContext';

export const AdminReports = () => {
  const { success } = useNotification();
  const [dateRange, setDateRange] = useState('30days');
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      const data = await adminService.getDashboardAnalytics();
      setAnalytics(data);
      setLoading(false);
    };

    fetchReports();
  }, [dateRange]);

  const handleExport = () => {
    adminService.exportBookingsCSV();
    success('Revenue and ticket sales ledger exported to CSV!');
  };

  if (loading || !analytics) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-4">
      {/* Header */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
        <div>
          <h1 className="h4 fw-bold mb-1" style={{ color: '#1F0E2A' }}>
            Financial & Performance Reports
          </h1>
          <p className="text-muted small mb-0">
            Generate formal accounting reconciliations, category yields, and export data.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          {/* Date range filter */}
          <select
            className="form-select form-select-sm"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            style={{ width: 160 }}
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="quarter">This Quarter</option>
            <option value="year">Year to Date (2026)</option>
          </select>

          <button
            type="button"
            onClick={handleExport}
            className="btn btn-sm btn-accent-pink d-inline-flex align-items-center gap-2"
          >
            <FiDownload size={15} /> Export CSV
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="row g-3">
        <div className="col-md-4">
          <div className="admin-card p-4">
            <span className="text-muted small">Total Ticket Volume</span>
            <div className="h3 fw-bold mt-1 mb-0" style={{ color: '#350047' }}>
              ${analytics.stats.totalRevenue.toLocaleString()}
            </div>
            <div className="text-success small mt-2">
              <FiTrendingUp /> +18.4% above initial quarterly projections
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="admin-card p-4">
            <span className="text-muted small">Total Paid Admissions</span>
            <div className="h3 fw-bold mt-1 mb-0" style={{ color: '#F43F8C' }}>
              {analytics.stats.totalTicketsSold.toLocaleString()}
            </div>
            <div className="text-muted small mt-2">
              Across {analytics.stats.eventsHosted} hosted productions
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="admin-card p-4">
            <span className="text-muted small">Average Ticket Yield</span>
            <div className="h3 fw-bold mt-1 mb-0" style={{ color: '#1F0E2A' }}>
              ${Math.round(analytics.stats.totalRevenue / analytics.stats.totalTicketsSold)}
            </div>
            <div className="text-muted small mt-2">
              Blended average ticket transaction value
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Financial Breakdown Chart */}
      <div className="admin-card">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h6 fw-bold mb-0" style={{ color: '#350047' }}>
            Monthly Revenue Realization ($)
          </h2>
          <span className="badge bg-light text-secondary border">Audited Cashflow</span>
        </div>

        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics.trends} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0EAF5" />
              <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, 'Revenue']} />
              <Bar dataKey="revenue" fill="#350047" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
