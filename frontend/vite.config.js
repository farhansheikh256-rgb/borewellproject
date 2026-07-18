import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Bind to all network interfaces — required for:
    //   1. Android physical device WebView to reach this Vite dev server over LAN
    //   2. Expo to resolve the correct hostUri for WebView URL
    host: true,
    port: 5173,
    // Proxy /api calls to the backend so the web app works in a pure browser
    // context (without CORS issues). On mobile, the WebView uses the LAN IP
    // directly from window.location.hostname, so this proxy isn't used there.
    proxy: {
      '/api': {
        target: 'http://localhost:5005',
        changeOrigin: true,
      },
    },
  },
})
