import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminToken, setAdminToken] = useState(localStorage.getItem('borewell_token'));

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

  const login = async (password) => {
    try {
      const res = await api.post('/auth/login', { password });
      if (res.data.success) {
        setAdminToken(res.data.token);
        localStorage.setItem('borewell_token', res.data.token);
        return { success: true };
      }
      return { success: false, message: 'Invalid credentials' };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const logout = () => {
    setAdminToken(null);
    localStorage.removeItem('borewell_token');
  };

  return (
    <AppContext.Provider value={{
      services,
      loading,
      fetchServices,
      submitEnquiry,
      adminToken,
      login,
      logout,
      isAdmin: !!adminToken
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
