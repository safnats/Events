import api from './api';
import {
  storageGetEvents,
  storageGetEventById,
  storageSaveEvent,
  storageDeleteEvent
} from './storageService';

export const eventService = {
  async getEvents(filters = {}) {
    try {
      const response = await api.get('/events', { params: filters });
      if (response.data && Array.isArray(response.data)) {
        return response.data;
      }
    } catch (apiError) {
      // Fallback to storage
    }

    let events = storageGetEvents();

    if (filters.category && filters.category !== 'All') {
      events = events.filter((e) => e.category.toLowerCase() === filters.category.toLowerCase());
    }

    if (filters.search && filters.search.trim() !== '') {
      const q = filters.search.toLowerCase();
      events = events.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q)
      );
    }

    if (filters.location && filters.location !== 'All') {
      events = events.filter((e) =>
        e.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.priceRange && filters.priceRange !== 'All') {
      if (filters.priceRange === 'under-50') {
        events = events.filter((e) => e.startingPrice < 50);
      } else if (filters.priceRange === '50-150') {
        events = events.filter((e) => e.startingPrice >= 50 && e.startingPrice <= 150);
      } else if (filters.priceRange === '150-plus') {
        events = events.filter((e) => e.startingPrice > 150);
      }
    }

    if (filters.sortBy) {
      if (filters.sortBy === 'price-low') {
        events.sort((a, b) => a.startingPrice - b.startingPrice);
      } else if (filters.sortBy === 'price-high') {
        events.sort((a, b) => b.startingPrice - a.startingPrice);
      } else if (filters.sortBy === 'date') {
        events.sort((a, b) => new Date(a.date) - new Date(b.date));
      } else if (filters.sortBy === 'popular') {
        events.sort((a, b) => (b.ticketsSold || 0) - (a.ticketsSold || 0));
      }
    }

    return events;
  },

  async getFeaturedEvents() {
    const all = await this.getEvents();
    return all.filter((e) => e.featured || e.ticketsSold > 3000).slice(0, 6);
  },

  async getEventById(id) {
    try {
      const response = await api.get(`/events/${id}`);
      if (response.data) {
        return response.data;
      }
    } catch (apiError) {
      // Fallback to storage
    }
    return storageGetEventById(id);
  },

  async createEvent(eventData) {
    try {
      const response = await api.post('/events', eventData);
      if (response.data) {
        return response.data;
      }
    } catch (apiError) {
      // Fallback
    }
    return storageSaveEvent(eventData);
  },

  async updateEvent(id, eventData) {
    try {
      const response = await api.put(`/events/${id}`, eventData);
      if (response.data) {
        return response.data;
      }
    } catch (apiError) {
      // Fallback
    }
    return storageSaveEvent({ ...eventData, id });
  },

  async deleteEvent(id) {
    try {
      await api.delete(`/events/${id}`);
      return true;
    } catch (apiError) {
      // Fallback
    }
    return storageDeleteEvent(id);
  }
};
