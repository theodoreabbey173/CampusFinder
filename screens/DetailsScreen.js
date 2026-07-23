import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatItemDate } from '../backend/itemsService';

export default function DetailsScreen({ navigation, route }) {
  const { item } = route.params;

  const handleStartChat = () => {
    navigation.navigate('Chat', { item });
  };

  const isFound = item.type === 'Found';
  const typeColor = isFound ? '#16a97a' : '#FF5722';

  const imageSource = item.imageUrl
    ? { uri: item.imageUrl }
    : { uri: 'https://via.placeholder.com/250x200/CCCCCC/FFFFFF?text=No+Image' };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.canGoBack() && navigation.goBack()}
              activeOpacity={0.7}
            >
              <Text style={styles.backIcon}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Item Details</Text>
          </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Item Image */}
        <View style={styles.imageContainer}>
          <Image
            source={imageSource}
            style={styles.itemImage}
            resizeMode="cover"
          />
          <View style={[styles.statusPill, { backgroundColor: typeColor }]}>
            <View style={styles.statusDot} />
            <Text style={styles.statusPillText}>{item.type}</Text>
          </View>
        </View>

        <View style={styles.content}>
          {/* Title */}
          <Text style={styles.itemName}>{item.name}</Text>

          {/* Details rows */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Details</Text>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Location</Text>
              <Text style={styles.value}>📍 {item.location}</Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.label}>Time</Text>
              <Text style={styles.value}>🕒 {formatItemDate(item.createdAt)}</Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.label}>Reported by</Text>
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
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.chatButton} onPress={handleStartChat}>
            <Text style={styles.chatButtonText}>💬  Start Secure Chat</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // ── Header ───────────────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'false',
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEDF2',
  },
  backButton: {
    width:           34,
    height:          34,
    borderRadius:    17,
    backgroundColor: '#F0F1F6',
    justifyContent:  'center',
    alignItems:      'center',
    marginRight:      12,
  },
  backIcon: {
    fontSize:   22,
    color:      '#1a1a2e',
    marginTop: -2,
  },

  headerTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#1A1A2E',
  },

  // ── Image ────────────────────────────────────────────────────────────────
  imageContainer: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    position: 'relative',
  },
  itemImage: {
    width: '100%',
    height: 220,
    backgroundColor: '#e0e0e0',
  },
  statusPill: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
    marginRight: 6,
  },
  statusPillText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },

  content: {
    paddingHorizontal: 20,
  },
  itemName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A2E',
    marginTop: 20,
    marginBottom: 20,
  },

  infoSection: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#1A1A2E',
    marginBottom: 14,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#EFEFF2',
  },
  label: {
    fontSize: 15,
    color: '#8A8F9A',
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A2E',
  },

  descriptionSection: {
    marginTop: 12,
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },

  buttonContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  chatButton: {
    backgroundColor: '#16a97a',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#16a97a',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  chatButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
