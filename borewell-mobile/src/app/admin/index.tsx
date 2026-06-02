import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useAppContext } from '../../context/AppContext';
import { useRouter } from 'expo-router';

export default function AdminLoginScreen() {
  const { login } = useAppContext();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) return;
    setIsLoading(true);
    try {
      const success = await login(username, password);
      if (success) {
        router.replace('/admin/dashboard');
      } else {
        Alert.alert('Error', 'Invalid password');
      }
    } catch (err) {
      Alert.alert('Error', 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Admin Access</Text>
        <TextInput 
          style={styles.input} 
          value={username} 
          onChangeText={setUsername} 
          placeholder="Username" 
        />
        <TextInput 
          style={styles.input} 
          value={password} 
          onChangeText={setPassword} 
          placeholder="Password" 
          secureTextEntry 
        />
        <TouchableOpacity style={styles.btn} onPress={handleLogin} disabled={isLoading}>
          <Text style={styles.btnText}>{isLoading ? 'Logging in...' : 'Login'}</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.divider} />
        </View>

        <TouchableOpacity 
          style={styles.googleBtn} 
          onPress={() => Alert.alert('Notice', 'Google Sign-In will be available once Firebase keys are provided!')}
        >
          <Text style={styles.googleBtnText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.phoneBtn} 
          onPress={() => Alert.alert('Notice', 'Phone Sign-In will be available once Firebase keys are provided!')}
        >
          <Text style={styles.phoneBtnText}>📱 Continue with Phone</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center', padding: 20 },
  card: { backgroundColor: 'white', padding: 30, borderRadius: 12, width: '100%', maxWidth: 400, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1e293b', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#f1f5f9', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 12, marginBottom: 15, fontSize: 16 },
  btn: { backgroundColor: '#0ea5e9', padding: 15, borderRadius: 8, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  divider: { flex: 1, height: 1, backgroundColor: '#e2e8f0' },
  dividerText: { marginHorizontal: 10, color: '#64748b', fontWeight: 'bold' },
  googleBtn: { backgroundColor: 'white', padding: 15, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#cbd5e1', marginBottom: 10 },
  googleBtnText: { color: '#334155', fontWeight: 'bold', fontSize: 16 },
  phoneBtn: { backgroundColor: '#34d399', padding: 15, borderRadius: 8, alignItems: 'center' },
  phoneBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});
