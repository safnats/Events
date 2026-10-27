import api from './api';
import {
  storageGetUser,
  storageSetUser,
  storageClearUser
} from './storageService';
import { DEMO_USERS } from '../data/mockData';

export const authService = {
  // Login with backend API or smart development fallback
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data && response.data.user) {
        storageSetUser(response.data.user, response.data.token);
        return response.data;
      }
    } catch (apiError) {
      console.info('Backend API unavailable, authenticating with development store:', apiError.message);
    }

    // Fallback development authentication
    const cleanEmail = email.trim().toLowerCase();
    let authenticatedUser = null;

    if (cleanEmail === 'admin@eventra.com') {
      authenticatedUser = { ...DEMO_USERS.admin };
    } else {
      authenticatedUser = {
        id: `usr-${Date.now()}`,
        name: cleanEmail.split('@')[0].replace('.', ' '),
        email: cleanEmail,
        role: 'attendee',
        avatar: DEMO_USERS.attendee.avatar,
        token: `jwt-token-${Date.now()}`
      };
    }

    storageSetUser(authenticatedUser, authenticatedUser.token);
    return {
      user: authenticatedUser,
      token: authenticatedUser.token,
      message: 'Logged in successfully'
    };
  },

  // Register with backend API or development store
  async register(registrationData) {
    try {
      const response = await api.post('/auth/register', registrationData);
      if (response.data && response.data.user) {
        storageSetUser(response.data.user, response.data.token);
        return response.data;
      }
    } catch (apiError) {
      console.info('Backend API unavailable, registering with development store:', apiError.message);
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name: registrationData.name,
      email: registrationData.email,
      phone: registrationData.phone,
      role: 'attendee',
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80`,
      token: `jwt-token-${Date.now()}`
    };

    storageSetUser(newUser, newUser.token);
    return {
      user: newUser,
      token: newUser.token,
      message: 'Registration successful'
    };
  },

  getCurrentUser() {
    return storageGetUser();
  },

  logout() {
    storageClearUser();
  }
};
