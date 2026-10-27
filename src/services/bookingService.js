import api from './api';
import {
  storageGetBookings,
  storageGetBookingById,
  storageCreateBooking,
  storageVerifyTicket,
  storageCheckInTicket
} from './storageService';

export const bookingService = {
  // Create booking after payment processing
  async createBooking(bookingPayload) {
    try {
      const response = await api.post('/bookings', bookingPayload);
      if (response.data && response.data.booking) {
        return response.data.booking;
      }
    } catch (apiError) {
      console.info('Backend API unavailable, saving booking to development store:', apiError.message);
    }
    return storageCreateBooking(bookingPayload);
  },

  // Get user bookings
  async getUserBookings(userEmail) {
    try {
      const response = await api.get('/bookings/my-bookings');
      if (response.data && Array.isArray(response.data)) {
        return response.data;
      }
    } catch (apiError) {
      // Fallback
    }
    const all = storageGetBookings();
    if (!userEmail) return all;
    return all.filter(
      (b) => (b.attendeeEmail || '').toLowerCase() === userEmail.toLowerCase()
    );
  },

  // Get all bookings (admin)
  async getAllBookings() {
    try {
      const response = await api.get('/admin/bookings');
      if (response.data && Array.isArray(response.data)) {
        return response.data;
      }
    } catch (apiError) {
      // Fallback
    }
    return storageGetBookings();
  },

  // Get single booking/ticket details
  async getBookingById(idOrRef) {
    try {
      const response = await api.get(`/bookings/${idOrRef}`);
      if (response.data) {
        return response.data;
      }
    } catch (apiError) {
      // Fallback
    }
    return storageGetBookingById(idOrRef);
  },

  // Verify ticket validity (admin)
  async verifyTicket(ticketIdOrCode) {
    try {
      const response = await api.post('/tickets/verify', { ticketCode: ticketIdOrCode });
      if (response.data) {
        return response.data;
      }
    } catch (apiError) {
      // Fallback to storage
    }
    return storageVerifyTicket(ticketIdOrCode);
  },

  // Check in ticket at venue
  async checkInTicket(ticketId) {
    try {
      const response = await api.post(`/tickets/check-in`, { ticketId });
      if (response.data) {
        return response.data;
      }
    } catch (apiError) {
      // Fallback
    }
    return storageCheckInTicket(ticketId);
  }
};
