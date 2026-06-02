import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useAppContext } from '../../context/AppContext';
import { useRouter } from 'expo-router';

export default function BookingScreen() {
  const { submitEnquiry, services } = useAppContext();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', address: '',
    serviceType: 'Borewell Drilling', description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone || !formData.address) {
      Alert.alert('Error', 'Please fill in all required fields (Name, Phone, Address).');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await submitEnquiry(formData);
      Alert.alert('Success', 'Your booking request has been submitted successfully!', [
        { text: 'OK', onPress: () => router.push('/') }
      ]);
    } catch (err) {
      Alert.alert('Error', 'Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Book a Service</Text>
      
      <Text style={styles.label}>Name *</Text>
      <TextInput style={styles.input} value={formData.name} onChangeText={t => setFormData({...formData, name: t})} placeholder="John Doe" />
      
      <Text style={styles.label}>Phone *</Text>
      <TextInput style={styles.input} value={formData.phone} onChangeText={t => setFormData({...formData, phone: t})} placeholder="1234567890" keyboardType="phone-pad" />
      
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={formData.email} onChangeText={t => setFormData({...formData, email: t})} placeholder="john@example.com" keyboardType="email-address" />
      
      <Text style={styles.label}>Address *</Text>
      <TextInput style={[styles.input, styles.textArea]} value={formData.address} onChangeText={t => setFormData({...formData, address: t})} placeholder="Your full address" multiline numberOfLines={3} />
      
      <Text style={styles.label}>Description</Text>
      <TextInput style={[styles.input, styles.textArea]} value={formData.description} onChangeText={t => setFormData({...formData, description: t})} placeholder="Any specific requirements?" multiline numberOfLines={3} />
      
      <TouchableOpacity style={[styles.btn, isSubmitting && styles.btnDisabled]} onPress={handleSubmit} disabled={isSubmitting}>
        <Text style={styles.btnText}>{isSubmitting ? 'Submitting...' : 'Submit Booking'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  content: { padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#1e293b', marginBottom: 20 },
  label: { fontSize: 16, color: '#475569', marginBottom: 5, fontWeight: '500' },
  input: { backgroundColor: 'white', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 12, marginBottom: 15, fontSize: 16 },
  textArea: { height: 100, textAlignVertical: 'top' },
  btn: { backgroundColor: '#0ea5e9', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  btnDisabled: { backgroundColor: '#94a3b8' },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});
