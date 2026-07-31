import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Settings,
  Pencil,
  Moon,
  Package,
  Lock,
  HelpCircle,
  ChevronRight,
  Power,
} from 'lucide-react-native';
import { auth } from '../firebaseConfig';
import { logoutUser } from '../backend/authService';
import { subscribeToItems } from '../backend/itemsService';

export default function ProfileScreen() {
  const currentUser = auth.currentUser;
  const name  = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Student';
  const email = currentUser?.email || '';
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

  const [darkMode,     setDarkMode]     = useState(false);
  const [reportCount,  setReportCount]  = useState(0);

  useEffect(() => {
    if (!currentUser) return;
    const unsubscribe = subscribeToItems((items) => {
      setReportCount(items.filter((i) => i.reportedBy === currentUser.uid).length);
    });
    return unsubscribe;
  }, []);

  const comingSoon = (feature) => Alert.alert(feature, 'Coming soon.');

  const handleLogout = () => {
    Alert.alert('Log out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log out',
        style: 'destructive',
        onPress: () => logoutUser(),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Account</Text>
          <Settings size={20} color="#1a1a2e" strokeWidth={2} />
        </View>

        {/* ── Profile card ───────────────────────────────────────────────── */}
        <LinearGradient
          colors={['#1a237e', '#16a97a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.profileCard}
        >
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
            <TouchableOpacity style={styles.avatarEditBadge} onPress={() => comingSoon('Edit photo')}>
              <Pencil size={11} color="#101010" strokeWidth={2.4} />
            </TouchableOpacity>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName} numberOfLines={1}>{name}</Text>
            <Text style={styles.profileEmail} numberOfLines={1}>{email}</Text>
          </View>
        </LinearGradient>

        {/* ── Preferences ────────────────────────────────────────────────── */}
        <Text style={styles.sectionLabel}>PREFERENCES</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={[styles.rowIconWrap, { backgroundColor: '#FFF3E0' }]}>
              <Moon size={16} color="#FB8C00" strokeWidth={2.2} />
            </View>
            <View style={styles.rowTextWrap}>
              <Text style={styles.rowTitle}>Dark mode</Text>
              <Text style={styles.rowSubtitle}>Easier on the eyes at night</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#e0e0e6', true: '#16a97a' }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* ── Account & safety ───────────────────────────────────────────── */}
        <Text style={styles.sectionLabel}>ACCOUNT & SAFETY</Text>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.row}
            activeOpacity={0.7}
            onPress={() => comingSoon('My reported items')}
          >
            <View style={[styles.rowIconWrap, { backgroundColor: '#FFEDE0' }]}>
              <Package size={16} color="#E5793D" strokeWidth={2.2} />
            </View>
            <View style={styles.rowTextWrap}>
              <Text style={styles.rowTitle}>My reported items</Text>
            </View>
            {reportCount > 0 && <Text style={styles.rowCount}>{reportCount}</Text>}
            <ChevronRight size={18} color="#c5c8d3" strokeWidth={2.2} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.row}
            activeOpacity={0.7}
            onPress={() => comingSoon('Privacy & safety')}
          >
            <View style={[styles.rowIconWrap, { backgroundColor: '#FDE9EA' }]}>
              <Lock size={16} color="#E53935" strokeWidth={2.2} />
            </View>
            <View style={styles.rowTextWrap}>
              <Text style={styles.rowTitle}>Privacy & safety</Text>
            </View>
            <ChevronRight size={18} color="#c5c8d3" strokeWidth={2.2} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.row}
            activeOpacity={0.7}
            onPress={() => comingSoon('Help & support')}
          >
            <View style={[styles.rowIconWrap, { backgroundColor: '#FDECEE' }]}>
              <HelpCircle size={16} color="#E53935" strokeWidth={2.2} />
            </View>
            <View style={styles.rowTextWrap}>
              <Text style={styles.rowTitle}>Help & support</Text>
            </View>
            <ChevronRight size={18} color="#c5c8d3" strokeWidth={2.2} />
          </TouchableOpacity>
        </View>

        {/* ── Log out ────────────────────────────────────────────────────── */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
          <Power size={15} color="#E53935" strokeWidth={2.4} />
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>CampusFinder · v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FB',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1a1a2e',
  },
  settingsBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Profile card
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 18,
    marginBottom: 24,
    shadowColor: '#1a237e',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  avatarWrap: {
    position: 'relative',
    marginRight: 14,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#3c355e',
    fontSize: 20,
    fontWeight: '800',
  },
  avatarEditBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#0f1caf',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 3,
  },
  profileEmail: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
  },

  // Section
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9aa0b4',
    letterSpacing: 0.5,
    marginBottom: 10,
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  rowIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rowTextWrap: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  rowSubtitle: {
    fontSize: 12,
    color: '#9aa0b4',
    marginTop: 2,
  },
  rowCount: {
    fontSize: 14,
    color: '#9aa0b4',
    marginRight: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f1f6',
    marginLeft: 62,
  },

  // Logout
  logoutBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#E53935',
    borderRadius: 16,
    paddingVertical: 14,
    marginBottom: 16,
    gap: 8,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#E53935',
  },

  // Footer
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: '#b8bcc8',
  },
});
