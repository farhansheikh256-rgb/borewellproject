# Doctorwater (Borewell Service)

This is a comprehensive Borewell Service platform featuring a Web application (Frontend + Backend) and a Mobile app (React Native / Expo).

## Project Structure
- `/frontend` - React Vite web application
- `/backend` - Node.js Express server
- `/borewell-mobile` - React Native Expo mobile application
- `/rag-service` - AI rag service

---

## 🚀 Startup Guide

### 1. Web Application (Frontend + Backend)
To start the website locally for development:

**Backend:**
1. Open a new terminal.
2. Navigate to the backend directory: `cd backend`
3. Install dependencies (if not done yet): `npm install`
4. Start the server: `npm run dev`

**Frontend:**
1. Open a new terminal.
2. Navigate to the frontend directory: `cd frontend`
3. Install dependencies: `npm install`
4. Start the Vite dev server: `npm run dev`

The website will be available at `http://localhost:5173` in your browser.

### 2. Mobile Application (Physical Device)
The mobile app is built with Expo. The easiest way to run it is on your physical device:

1. Open a new terminal.
2. Navigate to the mobile app directory: `cd borewell-mobile`
3. Install dependencies: `npm install`
4. Start the Expo development server: `npm start`
5. On your physical Android or iOS phone, download the **Expo Go** app from your app store.
6. Make sure your phone and your computer are connected to the **same Wi-Fi network**.
7. Scan the QR code printed in your terminal using the Expo Go app. Alternatively, you can type the LAN URL manually (e.g., `exp://192.168.1.55:8081`).

### 3. Mobile Application (Android Emulator)
If you wish to run the app on a local Android Virtual Device (Emulator) instead of a physical phone:

1. Ensure you have the Android SDK installed and an emulator configured. **Note:** Your Mac must have at least ~8GB of free disk space to create and run the emulator.
2. Open a new terminal and navigate to `cd borewell-mobile`
3. Run the android build: `npm run android`
4. The script will build the native app and launch your emulator automatically.
