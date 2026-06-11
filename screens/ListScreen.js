import React, { useState, useEffect, useLayoutEffect, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  TextInput,
  StatusBar,
} from 'react-native';
import { subscribeToItems, formatItemDate } from '../backend/itemsService';
import { subscribeToUserChats } from '../backend/chatService';
import { logoutUser } from '../backend/authService';
import { auth } from '../firebaseConfig';

const FILTERS = ['All', 'Lost', 'Found'];

// Returns true if the item was posted within the last hour
const isNewItem = (createdAt) => {
  if (!createdAt) return false;
  const ts = createdAt?.toDate ? createdAt.toDate() : new Date(createdAt);
  return Date.now() - ts.getTime() < 60 * 60 * 1000;
};

export default function ListScreen({ navigation }) {
  const [items,        setItems]        = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [searchQuery,  setSearchQuery]  = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [chatCount,    setChatCount]    = useState(0);

  // ── Header logout + inbox buttons ────────────────────────────────────────
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerButtons}>
          {/* Inbox icon with badge */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Inbox')}
            style={styles.inboxBtn}
          >
            <Text style={styles.inboxIcon}>💬</Text>
            {chatCount > 0 && (
              <View style={styles.inboxBadge}>
                <Text style={styles.inboxBadgeText}>
                  {chatCount > 9 ? '9+' : chatCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Logout */}
          <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      ),
      headerStyle:      { backgroundColor: '#F0F6FF', elevation: 0, shadowOpacity: 0 },
      headerTitleStyle: { color: '#1a1a2e', fontWeight: '700' },
    });
  }, [navigation, chatCount]);

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: async () => {
          try {
            await logoutUser();
            navigation.reset({ index: 0, routes: [{ name: 'SignUp' }] });
          } catch (err) {
            Alert.alert('Error', err?.message ?? 'Could not log out. Please try again.');
          }
        },
      },
    ]);
  };

  // ── Subscribe to items ────────────────────────────────────────────────────
  useEffect(() => {
    const unsubscribe = subscribeToItems((fetchedItems) => {
      setItems(fetchedItems);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // ── Chat count for inbox badge ────────────────────────────────────────────
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;
    const unsubscribe = subscribeToUserChats(
      currentUser.uid,
      (chats) => setChatCount(chats.length),
    );
    return unsubscribe;
  }, []);

  // ── Derived stats ─────────────────────────────────────────────────────────
  const stats = useMemo(() => ({
    total: items.length,
    lost:  items.filter((i) => i.type === 'Lost').length,
    found: items.filter((i) => i.type === 'Found').length,
  }), [items]);

  // ── Filtered + searched list ──────────────────────────────────────────────
  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return items.filter((item) => {
      const matchesFilter =
        activeFilter === 'All' || item.type === activeFilter;
      const matchesSearch =
        !q ||
        item.name?.toLowerCase().includes(q) ||
        item.location?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [items, activeFilter, searchQuery]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleItemPress   = (item) => navigation.navigate('ItemDetails', { item });
  const handleReportItem  = ()     => navigation.navigate('ReportItem');

  // ── Card renderer ─────────────────────────────────────────────────────────
  const renderItem = ({ item }) => {
    const isLost    = item.type === 'Lost';
    const accentColor = isLost ? '#FF5722' : '#4CAF50';
    const tagBg       = isLost ? '#FFF3F0' : '#F0FBF1';

    return (
      <TouchableOpacity
        style={[styles.itemCard, { borderLeftColor: accentColor }]}
        onPress={() => handleItemPress(item)}
        activeOpacity={0.85}
      >
        {/* NEW badge -------------------------------------------------------- */}
        {isNewItem(item.createdAt) && (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>NEW</Text>
          </View>
        )}

        <View style={styles.itemContent}>
          {/* Thumbnail ------------------------------------------------------- */}
          <Image
            source={
              item.imageUrl
                ? { uri: item.imageUrl }
                : { uri: 'https://via.placeholder.com/90x90/e8eaf6/9fa8da?text=?' }
            }
            style={styles.itemImage}
            resizeMode="cover"
          />

          {/* Info ------------------------------------------------------------ */}
          <View style={styles.itemInfo}>
            {/* Title row */}
            <View style={styles.itemHeader}>
              <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
              <View style={[styles.typeTag, { backgroundColor: tagBg, borderColor: accentColor }]}>
                <Text style={[styles.typeText, { color: accentColor }]}>{item.type}</Text>
              </View>
            </View>

            {/* Description preview */}
            {item.description ? (
              <Text style={styles.itemDesc} numberOfLines={1}>{item.description}</Text>
            ) : null}

            {/* Meta row */}
            <Text style={styles.itemLocation}>📍 {item.location}</Text>
            <View style={styles.metaRow}>
              <Text style={styles.itemDate}>🕒 {formatItemDate(item.createdAt)}</Text>
              {item.reporterName ? (
                <Text style={styles.itemReporter}>  👤 {item.reporterName}</Text>
              ) : null}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // ── Loading state ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading items…</Text>
      </View>
    );
  }

  // ── Main render ───────────────────────────────────────────────────────────
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F6FF" />

      {/* ── Page header ──────────────────────────────────────────────────── */}
      <View style={styles.pageHeader}>
        <View>
          <Text style={styles.title}>Lost &amp; Found Items</Text>
          <Text style={styles.subtitle}>Tap an item to see full details</Text>
        </View>
        <TouchableOpacity style={styles.reportButton} onPress={handleReportItem}>
          <Text style={styles.reportButtonText}>＋ Report</Text>
        </TouchableOpacity>
      </View>

      {/* ── Stats banner ─────────────────────────────────────────────────── */}
      <View style={styles.statsBanner}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.total}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: '#FF5722' }]}>{stats.lost}</Text>
          <Text style={styles.statLabel}>Lost</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: '#4CAF50' }]}>{stats.found}</Text>
          <Text style={styles.statLabel}>Found</Text>
        </View>
      </View>

      {/* ── Search bar ───────────────────────────────────────────────────── */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, location…"
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearBtn}>
            <Text style={styles.clearBtnText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* ── Filter tabs ──────────────────────────────────────────────────── */}
      <View style={styles.filterRow}>
        {FILTERS.map((f) => {
          const isActive = activeFilter === f;
          const tabColor =
            f === 'Lost' ? '#FF5722' : f === 'Found' ? '#4CAF50' : '#2196F3';
          return (
            <TouchableOpacity
              key={f}
              style={[
                styles.filterTab,
                isActive && { backgroundColor: tabColor, borderColor: tabColor },
              ]}
              onPress={() => setActiveFilter(f)}
            >
              <Text
                style={[
                  styles.filterTabText,
                  isActive && { color: '#fff' },
                ]}
              >
                {f === 'Lost' ? '🔴 ' : f === 'Found' ? '🟢 ' : '📦 '}
                {f}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ── List / empty state ───────────────────────────────────────────── */}
      {filteredItems.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyIcon}>
            {searchQuery ? '🔎' : '📭'}
          </Text>
          <Text style={styles.emptyTitle}>
            {searchQuery ? 'No results found' : 'No items yet'}
          </Text>
          <Text style={styles.emptySubtitle}>
            {searchQuery
              ? `Nothing matched "${searchQuery}". Try a different keyword.`
              : 'Be the first to report a lost or found item on campus!'}
          </Text>
          {searchQuery ? (
            <TouchableOpacity
              style={styles.clearSearchBtn}
              onPress={() => setSearchQuery('')}
            >
              <Text style={styles.clearSearchBtnText}>Clear Search</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FB',
  },

  // ── Loading / empty ───────────────────────────────────────────────────────
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 12,
    color: '#666',
    fontSize: 16,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
  },
  clearSearchBtn: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#2196F3',
    borderRadius: 20,
  },
  clearSearchBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },

  // ── Page header ───────────────────────────────────────────────────────────
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F0F6FF',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#DDE8F8',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1a1a2e',
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  reportButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 22,
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 5,
  },
  reportButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },

  // ── Stats banner ──────────────────────────────────────────────────────────
  statsBanner: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 14,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1a1a2e',
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#eee',
    marginVertical: 4,
  },

  // ── Search bar ────────────────────────────────────────────────────────────
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    paddingVertical: 9,
  },
  clearBtn: {
    padding: 4,
  },
  clearBtnText: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: '600',
  },

  // ── Filter tabs ───────────────────────────────────────────────────────────
  filterRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 4,
    gap: 8,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#ddd',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  filterTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
  },

  // ── List ──────────────────────────────────────────────────────────────────
  listContainer: {
    padding: 16,
    paddingTop: 10,
  },

  // ── Item card ─────────────────────────────────────────────────────────────
  itemCard: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 6,
    elevation: 4,
    overflow: 'visible',
  },
  newBadge: {
    position: 'absolute',
    top: -6,
    right: 12,
    backgroundColor: '#FF1744',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    zIndex: 10,
  },
  newBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginRight: 14,
    backgroundColor: '#e8eaf6',
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
  },
  itemInfo: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a2e',
    flex: 1,
    marginRight: 8,
    letterSpacing: 0.2,
  },
  typeTag: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1.2,
  },
  typeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  itemDesc: {
    fontSize: 13,
    color: '#888',
    marginBottom: 5,
    fontStyle: 'italic',
  },
  itemLocation: {
    fontSize: 13,
    color: '#555',
    marginBottom: 3,
    fontWeight: '500',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  itemDate: {
    fontSize: 12,
    color: '#aaa',
  },
  itemReporter: {
    fontSize: 12,
    color: '#aaa',
  },

  // ── Nav logout ────────────────────────────────────────────────────────────
  headerButtons: {
    flexDirection:  'row',
    alignItems:     'center',
    gap:             4,
  },
  inboxBtn: {
    paddingHorizontal: 8,
    paddingVertical:   6,
    position:          'relative',
  },
  inboxIcon: {
    fontSize: 22,
  },
  inboxBadge: {
    position:        'absolute',
    top:              2,
    right:            2,
    backgroundColor: '#E53935',
    borderRadius:    8,
    minWidth:        16,
    height:          16,
    justifyContent:  'center',
    alignItems:      'center',
    paddingHorizontal: 3,
  },
  inboxBadgeText: {
    color:      '#fff',
    fontSize:    9,
    fontWeight: '700',
  },
  logoutBtn: {
    marginRight: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  logoutText: {
    color: '#E53935',
    fontSize: 15,
    fontWeight: '600',
  },
});
