import axios from 'axios';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = Platform.OS === 'android' 
  ? 'http://192.168.1.58:5005/api' 
  : 'http://localhost:5005/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('borewell_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const ragApiURL = Platform.OS === 'android' 
  ? 'http://192.168.1.58:3000/api'
  : 'http://localhost:3000/api';

export default api;
