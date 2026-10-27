import React, { useState } from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import {
  FiGrid,
  FiCalendar,
  FiBarChart2,
  FiUsers,
  FiBookOpen,
  FiFileText,
  FiCheckSquare,
  FiBell,
  FiUser,
  FiSettings,
  FiPlus,
  FiSearch,
  FiExternalLink,
  FiMenu,
  FiChevronLeft,
  FiLogOut
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const { success } = useNotification();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <FiGrid size={18} /> },
    { name: 'Events', path: '/admin/events', icon: <FiCalendar size={18} /> },
    { name: 'Analytics', path: '/admin/analytics', icon: <FiBarChart2 size={18} /> },
    { name: 'Attendees', path: '/admin/attendees', icon: <FiUsers size={18} /> },
    { name: 'Bookings', path: '/admin/bookings', icon: <FiBookOpen size={18} /> },
    { name: 'Reports', path: '/admin/reports', icon: <FiFileText size={18} /> },
    { name: 'Ticket Verification', path: '/admin/verify-ticket', icon: <FiCheckSquare size={18} /> },
    { name: 'Notifications', path: '/admin/notifications', icon: <FiBell size={18} /> },
    { name: 'Profile', path: '/admin/profile', icon: <FiUser size={18} /> },
    { name: 'Settings', path: '/admin/settings', icon: <FiSettings size={18} /> }
  ];

  const handleLogout = () => {
    logout();
    success('Logged out from Admin Console');
    navigate('/login');
  };

  return (
    <div className="admin-shell">
      {/* Sidebar for Desktop */}
      <aside
        className={`admin-sidebar d-none d-lg-flex ${collapsed ? 'collapsed' : ''}`}
        style={{ width: collapsed ? 80 : 255 }}
      >
        {/* Header */}
        <div className="admin-sidebar-header">
          {!collapsed ? (
            <Link to="/" className="eventra-logo text-decoration-none" style={{ color: '#350047' }}>
              <span className="logo-icon" style={{ width: 32, height: 32 }}>
                <FiCalendar size={17} />
              </span>
              <span style={{ fontSize: '1.3rem' }}>
                Eventra
                <span style={{ color: '#F43F8C' }}>.</span>
              </span>
            </Link>
          ) : (
            <span className="logo-icon mx-auto" style={{ width: 32, height: 32 }}>
              <FiCalendar size={17} />
            </span>
          )}

          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="btn btn-sm btn-light p-1 rounded-circle"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <FiChevronLeft
              style={{
                transform: collapsed ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s ease'
              }}
            />
          </button>
        </div>

        {/* Sidebar Nav Items */}
        <div className="flex-grow-1 py-3 overflow-y-auto">
          <div className="px-3 mb-2 text-muted text-uppercase" style={{ fontSize: '0.68rem', letterSpacing: '0.08em' }}>
            {!collapsed && 'Main Menu'}
          </div>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
              title={collapsed ? item.name : undefined}
            >
              <span className="nav-icon">{item.icon}</span>
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          ))}
        </div>

        {/* Sidebar Footer User Info */}
        <div className="p-3 border-top border-light-subtle">
          {!collapsed ? (
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-2 overflow-hidden">
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80'}
                  alt=""
                  className="rounded-circle"
                  style={{ width: 32, height: 32, objectFit: 'cover' }}
                />
                <div className="text-truncate">
                  <div className="fw-bold small text-truncate" style={{ color: '#350047' }}>
                    {user?.name || 'Elena Vance'}
                  </div>
                  <div className="text-muted" style={{ fontSize: '0.72rem' }}>
                    Administrator
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-light p-1 text-danger"
                title="Log out"
              >
                <FiLogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="text-center">
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-light p-2 text-danger rounded-circle"
                title="Log out"
              >
                <FiLogOut size={16} />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main">
        {/* Topbar */}
        <header className="admin-topbar">
          <div className="d-flex align-items-center gap-3">
            <button
              type="button"
              className="btn btn-light d-lg-none p-1"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            >
              <FiMenu size={22} />
            </button>

            {/* Quick Search */}
            <div className="position-relative d-none d-md-block" style={{ width: 260 }}>
              <FiSearch
                size={16}
                className="position-absolute text-muted"
                style={{ top: '50%', left: 12, transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                className="form-control form-control-sm ps-5 bg-light border-0"
                placeholder="Search events, orders, IDs..."
                style={{ borderRadius: 8, height: 38 }}
              />
            </div>
          </div>

          <div className="d-flex align-items-center gap-3">
            {/* View Public Site */}
            <Link
              to="/"
              className="btn btn-sm btn-outline-purple d-none d-sm-inline-flex align-items-center gap-2"
              style={{ fontSize: '0.82rem', padding: '0.45rem 0.9rem' }}
            >
              <FiExternalLink size={14} /> Public Website
            </Link>

            {/* Create Event CTA Button */}
            <Link
              to="/admin/events/create"
              className="btn btn-sm btn-accent-pink d-inline-flex align-items-center gap-2"
              style={{ fontSize: '0.82rem', padding: '0.45rem 1rem' }}
            >
              <FiPlus size={16} /> Create Event
            </Link>

            {/* Notification Bell */}
            <Link
              to="/admin/notifications"
              className="btn btn-sm btn-light position-relative p-2 rounded-circle"
              aria-label="Notifications"
            >
              <FiBell size={18} style={{ color: '#475467' }} />
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                style={{ backgroundColor: '#F43F8C', fontSize: '0.62rem' }}
              >
                3
              </span>
            </Link>

            {/* User Avatar */}
            <Link to="/admin/profile" className="d-flex align-items-center gap-2 text-decoration-none">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80'}
                alt=""
                className="rounded-circle"
                style={{ width: 34, height: 34, objectFit: 'cover', border: '2px solid #F43F8C' }}
              />
            </Link>
          </div>
        </header>

        {/* Mobile Sidebar Offcanvas */}
        {mobileSidebarOpen && (
          <div
            className="d-lg-none position-fixed inset-0 bg-dark bg-opacity-50"
            style={{ zIndex: 1060, top: 0, bottom: 0, left: 0, right: 0 }}
            onClick={() => setMobileSidebarOpen(false)}
          >
            <div
              className="bg-white h-100 p-3"
              style={{ width: 280 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="d-flex justify-content-between align-items-center pb-3 border-bottom mb-3">
                <Link to="/" className="eventra-logo text-decoration-none" style={{ color: '#350047' }}>
                  <span>Eventra Admin</span>
                </Link>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setMobileSidebarOpen(false)}
                />
              </div>

              <div className="d-flex flex-column gap-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => setMobileSidebarOpen(false)}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span>{item.name}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Child Page Output */}
        <div className="p-3 p-md-4 flex-grow-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
