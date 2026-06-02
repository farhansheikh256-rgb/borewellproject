import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import { useAppContext } from '../../context/AppContext';
import { useRouter } from 'expo-router';
import api, { ragApiURL } from '../../utils/api';
import * as DocumentPicker from 'expo-document-picker';

export default function AdminDashboardScreen() {
  const { logout, adminToken } = useAppContext();
  const router = useRouter();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!adminToken) {
      router.replace('/admin');
      return;
    }
    fetchEnquiries();
  }, [adminToken]);

  const fetchEnquiries = async () => {
    try {
      const res = await api.get('/enquiries');
      setEnquiries(res.data.data || []);
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
        router.replace('/admin');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
      if (result.canceled) return;

      const file = result.assets[0];
      setIsUploading(true);
      setUploadStatus('Uploading...');

      const formData = new FormData();
      formData.append('file', {
        uri: file.uri,
        name: file.name,
        type: file.mimeType || 'application/pdf'
      });

      const res = await fetch(`${ragApiURL}/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = await res.json();
      if (res.ok) {
        setUploadStatus(`Success! (${data.chunks_stored} chunks)`);
      } else {
        setUploadStatus(`Error: ${data.error}`);
      }
    } catch (err) {
      setUploadStatus('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const pending = enquiries.filter(e => e.status === 'Pending').length;
  const inProgress = enquiries.filter(e => e.status === 'Under Review').length;

  const renderEnquiry = ({ item }) => (
    <View style={styles.eqCard}>
      <Text style={styles.eqName}>{item.name}</Text>
      <Text style={styles.eqText}>{item.serviceType}</Text>
      <Text style={styles.eqText}>{item.phone}</Text>
      <View style={[styles.badge, item.status === 'Pending' ? styles.badgeWarning : styles.badgeSuccess]}>
        <Text style={styles.badgeText}>{item.status}</Text>
      </View>
    </View>
  );

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#0ea5e9" /></View>;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <TouchableOpacity onPress={() => { logout(); router.replace('/admin'); }}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}><Text style={styles.statTitle}>Total</Text><Text style={styles.statValue}>{enquiries.length}</Text></View>
        <View style={styles.statCard}><Text style={styles.statTitle}>Pending</Text><Text style={[styles.statValue, {color: '#f59e0b'}]}>{pending}</Text></View>
        <View style={styles.statCard}><Text style={styles.statTitle}>Review</Text><Text style={[styles.statValue, {color: '#0ea5e9'}]}>{inProgress}</Text></View>
      </View>

      <View style={styles.kbSection}>
        <Text style={styles.sectionTitle}>Knowledge Base</Text>
        <Text style={styles.desc}>Upload PDF manual for chatbot.</Text>
        <TouchableOpacity style={styles.btn} onPress={handleUpload} disabled={isUploading}>
          <Text style={styles.btnText}>{isUploading ? 'Uploading...' : 'Upload PDF'}</Text>
        </TouchableOpacity>
        {uploadStatus ? <Text style={styles.statusText}>{uploadStatus}</Text> : null}
      </View>

      <Text style={styles.sectionTitle}>Recent Enquiries</Text>
      {enquiries.slice(0, 10).map(eq => renderEnquiry({item: eq}))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  content: { padding: 20, paddingBottom: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1e293b' },
  logoutText: { color: '#ef4444', fontWeight: 'bold' },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statCard: { backgroundColor: 'white', flex: 1, marginHorizontal: 5, padding: 15, borderRadius: 10, alignItems: 'center', elevation: 2 },
  statTitle: { fontSize: 12, color: '#64748b', marginBottom: 5 },
  statValue: { fontSize: 20, fontWeight: 'bold', color: '#1e293b' },
  kbSection: { backgroundColor: 'white', padding: 20, borderRadius: 10, marginBottom: 20, elevation: 2 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginBottom: 10 },
  desc: { color: '#64748b', marginBottom: 15 },
  btn: { backgroundColor: '#0ea5e9', padding: 12, borderRadius: 8, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold' },
  statusText: { marginTop: 10, textAlign: 'center', color: '#10b981' },
  eqCard: { backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 10, elevation: 1 },
  eqName: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
  eqText: { color: '#475569', marginBottom: 3 },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginTop: 5 },
  badgeWarning: { backgroundColor: '#fef3c7' },
  badgeSuccess: { backgroundColor: '#d1fae5' },
  badgeText: { fontSize: 12, fontWeight: 'bold' }
});
