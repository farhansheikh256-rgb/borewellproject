import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utils/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminToken, setAdminToken] = useState(null);

  useEffect(() => {
    checkToken();
    fetchServices();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('borewell_token');
    if (token) setAdminToken(token);
  };

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await api.get('/services');
      setServices(res.data.data || []);
    } catch (err) {
      console.error("Error fetching services", err);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const res = await api.post('/auth/login', { username, password });
      if (res.data.token) {
        await AsyncStorage.setItem('borewell_token', res.data.token);
        setAdminToken(res.data.token);
        return true;
      }
    } catch (e) {
      console.error('Login error:', e);
    }
    return false;
  };

  const logout = async () => {
    await AsyncStorage.removeItem('borewell_token');
    setAdminToken(null);
  };

  const submitEnquiry = async (enquiryData) => {
    const res = await api.post('/enquiries', enquiryData);
    return res.data;
  };

  return (
    <AppContext.Provider value={{
      services, loading, fetchServices, adminToken, isAdmin: !!adminToken,
      login, logout, submitEnquiry
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
