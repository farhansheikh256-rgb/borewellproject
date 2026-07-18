/**
 * ──────────────────────────────────────────────────────────────────
 *  BOREWELL MOBILE — CENTRAL NETWORK CONFIG
 * ──────────────────────────────────────────────────────────────────
 *
 *  UPDATE THIS when your machine's LAN IP changes (e.g. after a
 *  Wi-Fi reconnect).
 *
 *  How to find your LAN IP on macOS:
 *    Terminal → `ipconfig getifaddr en0`
 *
 *  How to find it on Windows:
 *    CMD → `ipconfig` → look for "IPv4 Address"
 * ──────────────────────────────────────────────────────────────────
 */

// Your development machine's LAN IP address.
// Android physical devices need this to reach your local servers.
// Android emulators use 10.0.2.2 (mapped to host's localhost).
export const DEV_MACHINE_IP = '10.157.122.185';

// ─── Server URLs ─────────────────────────────────────────────────

/** Express backend (port 5005) */
export const BACKEND_URL = {
  android_device:   `http://${DEV_MACHINE_IP}:5005/api`,
  android_emulator: 'http://10.0.2.2:5005/api',
  ios:              'http://localhost:5005/api',
  web:              '/api',
};

/** Vite frontend dev server (port 5173) — loaded inside WebView */
export const FRONTEND_URL = {
  android_device:   `http://${DEV_MACHINE_IP}:5173`,
  android_emulator: 'http://10.0.2.2:5173',
  ios:              'http://localhost:5173',
  web:              'http://localhost:5173',
};

/** RAG / Chatbot service (port 3000) */
export const RAG_URL = {
  android_device:   `http://${DEV_MACHINE_IP}:3000/api`,
  android_emulator: 'http://10.0.2.2:3000/api',
  ios:              'http://localhost:3000/api',
  web:              'http://localhost:3000/api',
};
