import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { DEMO_USERS } from '../data/mockData';
import { storageSetUser } from '../services/storageService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial user from storage
    const existing = authService.getCurrentUser();
    if (existing) {
      setUser(existing);
    } else {
      // Default initial session as logged-in attendee for smooth demonstration
      setUser(DEMO_USERS.attendee);
      storageSetUser(DEMO_USERS.attendee, DEMO_USERS.attendee.token);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await authService.login(email, password);
      setUser(res.user);
      return { success: true, user: res.user };
    } catch (err) {
      return { success: false, error: err.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (registrationData) => {
    setLoading(true);
    try {
      const res = await authService.register(registrationData);
      setUser(res.user);
      return { success: true, user: res.user };
    } catch (err) {
      return { success: false, error: err.message || 'Registration failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const switchDemoRole = (role) => {
    const selected = role === 'admin' ? DEMO_USERS.admin : DEMO_USERS.attendee;
    storageSetUser(selected, selected.token);
    setUser(selected);
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    switchDemoRole
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
