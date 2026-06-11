import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { formatItemDate } from '../backend/itemsService';

export default function DetailsScreen({ navigation, route }) {
  const { item } = route.params;

  const handleStartChat = () => {
    navigation.navigate('Chat', { item });
  };

  const typeColor = item.type === 'Lost' ? '#FF5722' : '#4CAF50';

  const imageSource = item.imageUrl
    ? { uri: item.imageUrl }
    : { uri: 'https://via.placeholder.com/250x200/CCCCCC/FFFFFF?text=No+Image' };

  return (
    <ScrollView style={styles.container}>
      {/* Item Image */}
      <View style={styles.imageContainer}>
        <Image
          source={imageSource}
          style={styles.itemImage}
          resizeMode="cover"
        />
        <View style={[styles.imageTypeIndicator, { backgroundColor: typeColor }]}>
          <Text style={styles.imageTypeText}>{item.type}</Text>
        </View>
      </View>

      {/* Title + type badge */}
      <View style={styles.header}>
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={[styles.typeTag, { backgroundColor: typeColor }]}>
          <Text style={styles.typeText}>{item.type}</Text>
        </View>
      </View>

      {/* Details rows */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Details</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.value}>📍 {item.location}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.value}>🕒 {formatItemDate(item.createdAt)}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Reported by:</Text>
          <Text style={styles.value}>👤 {item.reporterName ?? 'Anonymous'}</Text>
        </View>
      </View>

      {/* Description */}
      <View style={styles.descriptionSection}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>
          {item.description || 'No description provided.'}
        </Text>
      </View>

      {/* Contact */}
      <View style={styles.contactSection}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <Text style={styles.contactInfo}>
          For privacy and security, all communication happens through our secure chat system.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.chatButton} onPress={handleStartChat}>
          <Text style={styles.chatButtonText}>💬 Start Chat</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 20,
    position: 'relative',
  },
  itemImage: {
    width: 250,
    height: 200,
    borderRadius: 12,
    backgroundColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  imageTypeIndicator: {
    position: 'absolute',
    top: 30,
    right: 30,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  imageTypeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  typeTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  typeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    width: 100,
  },
  value: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  descriptionSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  contactSection: {
    padding: 20,
  },
  contactInfo: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    fontStyle: 'italic',
  },
  buttonContainer: {
    padding: 20,
    paddingTop: 10,
  },
  chatButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  chatButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});