import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useAppContext } from '../../context/AppContext';
import { useRouter } from 'expo-router';

export default function ServicesScreen() {
  const { services, loading } = useAppContext();
  const router = useRouter();

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.desc}>{item.description}</Text>
      <View style={styles.footer}>
        <Text style={styles.price}>₹{item.basePrice}</Text>
        <TouchableOpacity style={styles.btn} onPress={() => router.push('/book')}>
          <Text style={styles.btnText}>Book</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#0ea5e9" /></View>;
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={services}
        keyExtractor={item => item._id || item.name}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { padding: 15 },
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
  },
  name: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' },
  category: { fontSize: 14, color: '#0ea5e9', marginBottom: 10, fontWeight: '500' },
  desc: { fontSize: 14, color: '#475569', marginBottom: 15, lineHeight: 20 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: 18, fontWeight: 'bold', color: '#10b981' },
  btn: { backgroundColor: '#0ea5e9', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  btnText: { color: 'white', fontWeight: '600' }
});
