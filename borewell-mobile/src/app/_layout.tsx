import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  BackHandler,
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { FRONTEND_URL } from '../config';

// ─── URL Resolution ───────────────────────────────────────────────────────────
/**
 * Resolves the best available URL to load the Vite frontend inside the WebView.
 *
 * Priority order:
 *  1. `Constants.expoConfig.hostUri` — set by Expo when the dev server is running;
 *     we replace its port with 5173 (the Vite port) so the WebView hits the right server.
 *  2. Platform-based fallback from config.js — uses the LAN IP for physical
 *     devices, 10.0.2.2 for Android emulators, and localhost for iOS/web.
 */
const getDevUrl = (): string => {
  // 1. Try Expo's own hostUri (most reliable in dev mode)
  const hostUri: string | undefined =
    Constants.expoConfig?.hostUri ||
    // @ts-ignore – legacy manifest fields
    Constants.manifest?.debuggerHost ||
    // @ts-ignore
    Constants.manifest?.expoGo?.debuggerHost ||
    Constants.expoConfig?.extra?.hostUri;

  if (hostUri) {
    const ip = hostUri.split(':')[0];
    const url = `http://${ip}:5173`;
    console.log('[RootLayout] Resolved URL from Expo hostUri →', url);
    return url;
  }

  // 2. Platform fallback using our central config
  let url: string;
  if (Platform.OS === 'android') {
    // Physical devices reach the host machine via LAN IP.
    // Emulators use the special alias 10.0.2.2.
    // We can't distinguish reliably at runtime without extra packages,
    // so we prefer the LAN IP (works for both if the IP is correct).
    url = FRONTEND_URL.android_device;
  } else if (Platform.OS === 'ios') {
    url = FRONTEND_URL.ios;
  } else {
    url = FRONTEND_URL.web;
  }

  console.log('[RootLayout] Using fallback URL →', url);
  return url;
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function RootLayout() {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Set to true to load the live deployed website in Expo Go / production
  const isProduction = true; 
  const targetUri = isProduction ? 'https://borewellproject-one.vercel.app' : getDevUrl();

  const injectedJS = `
    let meta = document.querySelector('meta[name="viewport"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'viewport';
      document.head.appendChild(meta);
    }
    meta.content = 'width=device-width, initial-scale=0.85, maximum-scale=0.85, user-scalable=no';
    document.body.style.zoom = "0.85";
    true;
  `;

  // Hardware back button — navigate back inside WebView if possible
  useEffect(() => {
    if (Platform.OS !== 'android') return;

    const onBackPress = () => {
      if (webViewRef.current && canGoBack) {
        webViewRef.current.goBack();
        return true; // handled — prevent app exit
      }
      return false; // let default happen (exit / previous screen)
    };

    const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => sub.remove();
  }, [canGoBack]);

  const handleRetry = useCallback(() => {
    setLoadError(null);
    setIsLoading(true);
    webViewRef.current?.reload();
  }, []);

  // ── Error screen — shown when the Vite server is unreachable ──────────────
  if (loadError) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#fdfbf7" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorEmoji}>⚠️</Text>
          <Text style={styles.errorTitle}>Cannot Connect</Text>
          <Text style={styles.errorMessage}>
            The app could not reach the web server at:
          </Text>
          <Text style={styles.errorUrl}>{targetUri}</Text>
          <Text style={styles.errorHint}>
            Make sure the Vite dev server is running:{'\n'}
            <Text style={styles.errorCode}>cd frontend{'\n'}npm run dev</Text>
          </Text>
          <Text style={styles.errorHint}>
            And that your IP in{' '}
            <Text style={styles.errorCode}>src/config.js</Text> matches:{'\n'}
            <Text style={styles.errorCode}>ipconfig getifaddr en0</Text>
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>🔄  Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ── Main WebView ──────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fdfbf7" />
      <View style={styles.container}>
        <WebView
          ref={webViewRef}
          source={{ uri: targetUri }}
          // Intercept phone, mail, and WhatsApp links to open natively instead of crashing the WebView
          onShouldStartLoadWithRequest={(request) => {
            const { url } = request;
            if (
              url.startsWith('tel:') || 
              url.startsWith('mailto:') || 
              url.startsWith('whatsapp:') || 
              url.startsWith('https://wa.me')
            ) {
              Linking.openURL(url).catch((err) => console.warn('[Linking] Error opening URL:', err));
              return false; // Stop loading inside WebView
            }
            return true; // Continue loading inside WebView
          }}
          // JS & storage
          javaScriptEnabled={true}
          injectedJavaScript={injectedJS}
          domStorageEnabled={true}
          // Allow both HTTP and HTTPS (needed for local dev server)
          mixedContentMode="always"
          originWhitelist={['*']}
          // Gesture navigation
          allowsBackForwardNavigationGestures={true}
          // Hide scrollbars (the web app has its own)
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          // Loading state
          startInLoadingState={true}
          renderLoading={() => (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#1e293b" />
              <Text style={styles.loadingText}>Loading Dr. Water…</Text>
            </View>
          )}
          // Navigation state tracking (for back-button handling)
          onNavigationStateChange={(navState) => {
            setCanGoBack(navState.canGoBack);
            if (!navState.loading) setIsLoading(false);
          }}
          // Error handling
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.error('[WebView] Load error:', nativeEvent);
            setLoadError(nativeEvent.description || 'Unknown error');
          }}
          onHttpError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn('[WebView] HTTP error:', nativeEvent.statusCode, nativeEvent.url);
            // Only treat non-200 on the ROOT url as a fatal error
            if (nativeEvent.url === targetUri) {
              setLoadError(`HTTP ${nativeEvent.statusCode}`);
            }
          }}
          style={styles.webview}
        />
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fdfbf7',
  },
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    backgroundColor: '#fdfbf7',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#fdfbf7',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    zIndex: 999,
  },
  loadingText: {
    color: '#1e293b',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  // ── Error screen ────────────────────────────────────────────────
  errorContainer: {
    flex: 1,
    backgroundColor: '#fdfbf7',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    gap: 12,
  },
  errorEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  errorTitle: {
    color: '#1e293b',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  errorMessage: {
    color: '#475569',
    fontSize: 14,
    textAlign: 'center',
  },
  errorUrl: {
    color: '#1e293b',
    fontSize: 13,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    backgroundColor: '#e2dfd5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 8,
  },
  errorHint: {
    color: '#475569',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
  errorCode: {
    color: '#1e293b',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    backgroundColor: '#e2dfd5',
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: '#e2dfd5',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d1cdc0',
  },
  retryButtonText: {
    color: '#1e293b',
    fontSize: 16,
    fontWeight: '700',
  },
});
