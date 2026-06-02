import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ContactScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Contact Us</Text>
      
      <View style={styles.card}>
        <Ionicons name="call" size={32} color="#0ea5e9" />
        <Text style={styles.title}>Phone</Text>
        <Text style={styles.desc}>+91 98765 43210</Text>
        <Text style={styles.desc}>+91 98765 43211</Text>
      </View>
      
      <View style={styles.card}>
        <Ionicons name="mail" size={32} color="#0ea5e9" />
        <Text style={styles.title}>Email</Text>
        <Text style={styles.desc}>info@aquadrill.com</Text>
        <Text style={styles.desc}>support@aquadrill.com</Text>
      </View>
      
      <View style={styles.card}>
        <Ionicons name="location" size={32} color="#0ea5e9" />
        <Text style={styles.title}>Location</Text>
        <Text style={styles.desc}>123 Water Source Road, Indiranagar, Bangalore, Karnataka 560038</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  content: { padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#1e293b', marginBottom: 20 },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    alignItems: 'center',
  },
  title: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginTop: 10, marginBottom: 5 },
  desc: { fontSize: 15, color: '#475569', textAlign: 'center' }
});
