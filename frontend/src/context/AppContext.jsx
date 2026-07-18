import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('borewell_token'));
  const [role, setRole] = useState(localStorage.getItem('borewell_role'));

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await api.get('/services');
      setServices(res.data.data || []);
    } catch (error) {
      console.error('Failed to fetch services', error);
    } finally {
      setLoading(false);
    }
  };

  const submitEnquiry = async (data) => {
    try {
      const res = await api.post('/enquiries', data);
      return { success: true, message: res.data.message };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to submit enquiry' 
      };
    }
  };

  const login = async (username, password) => {
    try {
      const res = await api.post('/auth/login', { username, password });
      if (res.data.success) {
        setToken(res.data.token);
        setRole(res.data.role);
        localStorage.setItem('borewell_token', res.data.token);
        localStorage.setItem('borewell_role', res.data.role);
        return { success: true, role: res.data.role };
      }
      return { success: false, message: 'Invalid credentials' };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem('borewell_token');
    localStorage.removeItem('borewell_role');
  };

  return (
    <AppContext.Provider value={{
      services,
      loading,
      fetchServices,
      submitEnquiry,
      token,
      role,
      login,
      logout,
      isLoggedIn: !!token,
      isAdmin: token && role === 'admin',
      isUser: token && role === 'user'
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
