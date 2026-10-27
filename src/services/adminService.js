import api from './api';
import {
  storageGetAnalytics,
  storageGetAttendees,
  storageGetBookings
} from './storageService';

export const adminService = {
  async getDashboardAnalytics() {
    try {
      const response = await api.get('/admin/analytics');
      if (response.data) {
        return response.data;
      }
    } catch (apiError) {
      // Fallback
    }
    return storageGetAnalytics();
  },

  async getAttendees() {
    try {
      const response = await api.get('/admin/attendees');
      if (response.data && Array.isArray(response.data)) {
        return response.data;
      }
    } catch (apiError) {
      // Fallback
    }
    return storageGetAttendees();
  },

  async getReports(dateRange = 'month') {
    try {
      const response = await api.get('/admin/reports', { params: { range: dateRange } });
      if (response.data) {
        return response.data;
      }
    } catch (apiError) {
      // Fallback
    }
    const analytics = storageGetAnalytics();
    const bookings = storageGetBookings();
    return {
      analytics,
      bookingsCount: bookings.length,
      recentBookings: bookings.slice(0, 10)
    };
  },

  // Export CSV generator helper
  exportBookingsCSV() {
    const bookings = storageGetBookings();
    if (!bookings.length) return false;

    const headers = [
      'Booking Reference',
      'Ticket ID',
      'Event Name',
      'Attendee Name',
      'Attendee Email',
      'Ticket Tier',
      'Quantity',
      'Total Amount ($)',
      'Booking Date',
      'Payment Status',
      'Ticket Validity'
    ];

    const rows = bookings.map((b) => [
      `"${b.bookingReference}"`,
      `"${b.ticketId}"`,
      `"${b.eventTitle.replace(/"/g, '""')}"`,
      `"${b.attendeeName}"`,
      `"${b.attendeeEmail}"`,
      `"${b.ticketTier}"`,
      b.ticketQuantity,
      b.totalAmount,
      `"${b.bookingDate}"`,
      `"${b.paymentStatus}"`,
      `"${b.ticketValidity}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `eventra_bookings_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  }
};
