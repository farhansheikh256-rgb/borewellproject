import axios from 'axios';

// Automatically use Render backend in production, or localhost in development
const API_BASE = import.meta.env.MODE === 'production' 
  ? 'https://borewellproject.onrender.com/api' 
  : `http://${window.location.hostname}:5005/api`;

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('borewell_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default api;
