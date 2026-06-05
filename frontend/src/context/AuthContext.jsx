import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Sync token to Axios headers (for any parts using a global/default api instance if any)
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }, [token]);

  // Load and verify current user on startup
  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`${API_BASE_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const userData = response.data.data;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } catch (err) {
        console.error('Failed to restore authentication session:', err);
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [token]);

  // Login handler targeting simplified customer login with auto-registration
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/auth/customer-login`, { email, password }, { withCredentials: true });
      const { token: receivedToken, user: userData, message } = response.data;
      setToken(receivedToken);
      setUser(userData);
      localStorage.setItem('token', receivedToken);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, user: userData, message };
    } catch (err) {
      console.error('Failed API Call Details:', {
        url: `${API_BASE_URL}/auth/customer-login`,
        status: err.response?.status || 'No Status Code',
        response: err.response?.data || err.message,
      });
      const message = err.response?.data?.message || 'Connection error. Please try again.';
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  // Admin login handler targeting administrative dashboard credentials
  const adminLogin = async (email, password) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/auth/admin-login`, { email, password }, { withCredentials: true });
      const { token: receivedToken, data: userData, message } = response.data;
      setToken(receivedToken);
      setUser(userData);
      localStorage.setItem('token', receivedToken);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, user: userData, message };
    } catch (err) {
      console.error('Failed API Call Details:', {
        url: `${API_BASE_URL}/auth/admin-login`,
        status: err.response?.status || 'No Status Code',
        response: err.response?.data || err.message,
      });
      const message = err.response?.data?.message || 'Connection error. Please try again.';
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  // Logout handler
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    login,
    adminLogin,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
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
