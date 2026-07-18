import axios from 'axios';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL, RAG_URL } from '../config';

/**
 * Picks the correct backend base URL based on the current platform.
 *
 * ⚠️  If API calls fail on a physical Android device, update DEV_MACHINE_IP
 *     in src/config.js to match your machine's current LAN IP:
 *       macOS: ipconfig getifaddr en0
 *       Windows: ipconfig → IPv4 Address
 */
const resolveBaseURL = () => {
  switch (Platform.OS) {
    case 'android':
      return BACKEND_URL.android_device;
    case 'ios':
      return BACKEND_URL.ios;
    default:
      return BACKEND_URL.web;
  }
};

const api = axios.create({
  baseURL: resolveBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 s — prevents silent hangs on bad network
});

// Attach JWT token to every request automatically
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('borewell_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * Base URL for the RAG / Chatbot service.
 * Used directly with fetch() in screens that need multipart uploads.
 */
export const ragApiURL = (() => {
  switch (Platform.OS) {
    case 'android':
      return RAG_URL.android_device;
    case 'ios':
      return RAG_URL.ios;
    default:
      return RAG_URL.web;
  }
})();

export default api;
