import {
  INITIAL_EVENTS,
  INITIAL_BOOKINGS,
  INITIAL_ATTENDEES,
  ADMIN_ANALYTICS,
  DEMO_USERS
} from '../data/mockData';

const STORAGE_KEYS = {
  EVENTS: 'eventra_events_v1',
  BOOKINGS: 'eventra_bookings_v1',
  ATTENDEES: 'eventra_attendees_v1',
  USER: 'eventra_current_user_v1',
  AUTH_TOKEN: 'eventra_auth_token_v1',
  ANALYTICS: 'eventra_analytics_v1'
};

// Initialize localStorage on first load
export const initStorage = () => {
  if (typeof window === 'undefined') return;

  if (!localStorage.getItem(STORAGE_KEYS.EVENTS)) {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(INITIAL_EVENTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(INITIAL_BOOKINGS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ATTENDEES)) {
    localStorage.setItem(STORAGE_KEYS.ATTENDEES, JSON.stringify(INITIAL_ATTENDEES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ANALYTICS)) {
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(ADMIN_ANALYTICS));
  }
};

// Events operations
export const storageGetEvents = () => {
  initStorage();
  try {
    const data = localStorage.getItem(STORAGE_KEYS.EVENTS);
    return data ? JSON.parse(data) : INITIAL_EVENTS;
  } catch (e) {
    console.error('Error reading events from storage', e);
    return INITIAL_EVENTS;
  }
};

export const storageGetEventById = (id) => {
  const events = storageGetEvents();
  return events.find((e) => e.id === id || e.slug === id) || null;
};

export const storageSaveEvent = (eventData) => {
  const events = storageGetEvents();
  let updatedEvents;

  if (eventData.id) {
    // Update existing
    updatedEvents = events.map((e) => (e.id === eventData.id ? { ...e, ...eventData } : e));
  } else {
    // Create new
    const newEvent = {
      ...eventData,
      id: `evt-${Date.now()}`,
      slug: (eventData.title || 'event').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      ticketsSold: 0,
      status: eventData.status || 'Published'
    };
    updatedEvents = [newEvent, ...events];
  }

  localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(updatedEvents));
  return eventData.id ? eventData : updatedEvents[0];
};

export const storageDeleteEvent = (id) => {
  const events = storageGetEvents();
  const filtered = events.filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(filtered));
  return true;
};

// Bookings operations
export const storageGetBookings = () => {
  initStorage();
  try {
    const data = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    return data ? JSON.parse(data) : INITIAL_BOOKINGS;
  } catch (e) {
    console.error('Error reading bookings from storage', e);
    return INITIAL_BOOKINGS;
  }
};

export const storageGetBookingById = (idOrRef) => {
  const bookings = storageGetBookings();
  return bookings.find(
    (b) => b.id === idOrRef || b.bookingReference === idOrRef || b.ticketId === idOrRef
  ) || null;
};

export const storageCreateBooking = (bookingPayload) => {
  const bookings = storageGetBookings();
  const events = storageGetEvents();

  const timestamp = Date.now();
  const refCode = `EVT-${Math.floor(10000 + Math.random() * 90000)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
  const ticketId = `TKT-EVT-${Math.floor(10000 + Math.random() * 90000)}`;

  const newBooking = {
    id: `bkg-${timestamp}`,
    bookingReference: refCode,
    ticketId,
    eventId: bookingPayload.eventId,
    eventTitle: bookingPayload.eventTitle,
    eventImage: bookingPayload.eventImage,
    eventDate: bookingPayload.eventDate,
    eventTime: bookingPayload.eventTime,
    eventVenue: bookingPayload.eventVenue,
    eventLocation: bookingPayload.eventLocation,
    ticketTier: bookingPayload.ticketTier,
    ticketQuantity: bookingPayload.ticketQuantity,
    unitPrice: bookingPayload.unitPrice,
    serviceFee: bookingPayload.serviceFee || Math.round(bookingPayload.unitPrice * 0.08),
    totalAmount: bookingPayload.totalAmount,
    bookingDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
    ticketValidity: 'Active',
    attendeeName: bookingPayload.attendeeName,
    attendeeEmail: bookingPayload.attendeeEmail,
    attendeePhone: bookingPayload.attendeePhone || '+1 (555) 000-0000',
    qrData: `EVENTRA-PASS-${ticketId}-${refCode}-VALID`
  };

  const updatedBookings = [newBooking, ...bookings];
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updatedBookings));

  // Update tickets sold on event
  const updatedEvents = events.map((e) => {
    if (e.id === bookingPayload.eventId) {
      return {
        ...e,
        ticketsSold: (e.ticketsSold || 0) + (bookingPayload.ticketQuantity || 1)
      };
    }
    return e;
  });
  localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(updatedEvents));

  return newBooking;
};

// Attendees operations
export const storageGetAttendees = () => {
  initStorage();
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ATTENDEES);
    return data ? JSON.parse(data) : INITIAL_ATTENDEES;
  } catch (e) {
    return INITIAL_ATTENDEES;
  }
};

// Ticket Verification & Check-in
export const storageVerifyTicket = (ticketIdOrCode) => {
  const cleanQuery = ticketIdOrCode.trim().toUpperCase();
  const bookings = storageGetBookings();

  const found = bookings.find(
    (b) =>
      b.ticketId.toUpperCase() === cleanQuery ||
      b.bookingReference.toUpperCase() === cleanQuery ||
      (b.qrData && b.qrData.toUpperCase().includes(cleanQuery))
  );

  if (!found) {
    return {
      status: 'INVALID',
      message: 'No matching ticket found in the Eventra registry.',
      booking: null
    };
  }

  if (found.bookingStatus === 'Cancelled' || found.paymentStatus !== 'Paid') {
    return {
      status: 'CANCELLED',
      message: 'This ticket has been cancelled or payment was refunded.',
      booking: found
    };
  }

  if (found.ticketValidity === 'Used') {
    return {
      status: 'ALREADY_USED',
      message: `Ticket was already checked in at ${found.checkedInAt || 'earlier today'}.`,
      booking: found
    };
  }

  return {
    status: 'VALID',
    message: 'Valid admission ticket. Ready for attendee entry.',
    booking: found
  };
};

export const storageCheckInTicket = (ticketId) => {
  const bookings = storageGetBookings();
  let updatedBooking = null;

  const updated = bookings.map((b) => {
    if (b.ticketId === ticketId || b.id === ticketId) {
      updatedBooking = {
        ...b,
        ticketValidity: 'Used',
        checkedInAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      return updatedBooking;
    }
    return b;
  });

  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
  return updatedBooking;
};

// Analytics metrics
export const storageGetAnalytics = () => {
  initStorage();
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
    const parsed = data ? JSON.parse(data) : ADMIN_ANALYTICS;

    // Dynamically recalculate totals based on storage events and bookings
    const bookings = storageGetBookings();
    const events = storageGetEvents();

    const liveTotalRevenue = bookings
      .filter((b) => b.paymentStatus === 'Paid')
      .reduce((sum, b) => sum + (b.totalAmount || 0), 140000);

    const liveTicketsSold = bookings.reduce(
      (sum, b) => sum + (b.ticketQuantity || 1),
      9800
    );

    return {
      ...parsed,
      stats: {
        ...parsed.stats,
        totalRevenue: liveTotalRevenue,
        totalTicketsSold: liveTicketsSold,
        eventsHosted: events.length
      }
    };
  } catch (e) {
    return ADMIN_ANALYTICS;
  }
};

// User Session
export const storageGetUser = () => {
  try {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    return userStr ? JSON.parse(userStr) : null;
  } catch (e) {
    return null;
  }
};

export const storageSetUser = (user, token) => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  if (token) {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  }
};

export const storageClearUser = () => {
  localStorage.removeItem(STORAGE_KEYS.USER);
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
};
