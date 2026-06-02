import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.hero}>
          <Text style={styles.title}>Welcome to AquaDrill</Text>
          <Text style={styles.subtitle}>Professional Borewell Drilling & Services</Text>
          <TouchableOpacity style={styles.btn} onPress={() => router.push('/book')}>
            <Text style={styles.btnText}>Book a Service</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose Us?</Text>
          <Text style={styles.text}>With over 15 years of experience, we provide reliable and cost-effective water solutions for residential and commercial needs.</Text>
        </View>

        <TouchableOpacity style={styles.adminBtn} onPress={() => router.push('/admin')}>
          <Text style={styles.adminBtnText}>Admin Login</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Floating Chatbot Button */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => router.push('/chatbot')}
      >
        <Ionicons name="chatbubble-ellipses" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  scrollContent: { padding: 20, paddingBottom: 100 },
  hero: {
    backgroundColor: '#0ea5e9',
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  title: { fontSize: 28, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 16, color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginBottom: 20 },
  btn: { backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 25 },
  btnText: { color: '#0ea5e9', fontWeight: 'bold', fontSize: 16 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#1e293b' },
  text: { fontSize: 16, color: '#475569', lineHeight: 24 },
  adminBtn: { marginTop: 30, alignSelf: 'center', padding: 10 },
  adminBtnText: { color: '#64748b', textDecorationLine: 'underline' },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0ea5e9',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  }
});
