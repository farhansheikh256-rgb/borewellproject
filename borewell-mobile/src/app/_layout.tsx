import React, { useRef, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  BackHandler,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';

// Helper to resolve host developer IP dynamically
const getDevUrl = () => {
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    const ip = hostUri.split(':')[0];
    return `http://${ip}:5173`;
  }
  return Platform.OS === 'android' ? 'http://10.0.2.2:5173' : 'http://localhost:5173';
};

export default function RootLayout() {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);

  // Dynamic URI resolution (dev server dynamically resolved, or hosted fallback)
  const targetUri = getDevUrl();

  // Robust back button handler for Android
  useEffect(() => {
    if (Platform.OS !== 'android') return;

    const onBackPress = () => {
      if (webViewRef.current && canGoBack) {
        webViewRef.current.goBack();
        return true; // Prevent default app exit
      }
      return false; // Let default behavior happen (exit app)
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      subscription.remove();
    };
  }, [canGoBack]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0A1628" />
      <View style={styles.container}>
        <WebView
          ref={webViewRef}
          source={{ uri: targetUri }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsBackForwardNavigationGestures={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          originWhitelist={['*']}
          mixedContentMode="always"
          onNavigationStateChange={(navState) => {
            setCanGoBack(navState.canGoBack);
          }}
          startInLoadingState={true}
          renderLoading={() => (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#00C2FF" />
            </View>
          )}
          style={styles.webview}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0A1628', // Matches your web background color (--surface)
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  webview: {
    flex: 1,
    backgroundColor: '#0A1628',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0A1628',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
});
