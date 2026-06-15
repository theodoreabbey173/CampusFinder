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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => null,
      headerLeft: () => (
        <View style={styles.navLeft}>
          <Image
            source={require('../assets/leg.jpg')}
            style={styles.navLogo}
            resizeMode="contain"
          />
          <Text>
            <Text style={styles.navCampus}>Campus</Text>
            <Text style={styles.navFinder}>Finder</Text>
          </Text>
        </View>
      ),
      headerLeftContainerStyle: { paddingLeft: 16 },
      headerRight: () => (
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
      ),
      headerRightContainerStyle: { paddingRight: 16 },
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      },
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

  useEffect(() => {
    const unsubscribe = subscribeToItems((fetchedItems) => {
      setItems(fetchedItems);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;
    const unsubscribe = subscribeToUserChats(
      currentUser.uid,
      (chats) => setChatCount(chats.length),
    );
    return unsubscribe;
  }, []);

  const stats = useMemo(() => ({
    total: items.length,
    lost:  items.filter((i) => i.type === 'Lost').length,
    found: items.filter((i) => i.type === 'Found').length,
  }), [items]);

  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return items.filter((item) => {
      const matchesFilter = activeFilter === 'All' || item.type === activeFilter;
      const matchesSearch =
        !q ||
        item.name?.toLowerCase().includes(q) ||
        item.location?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [items, activeFilter, searchQuery]);

  const handleItemPress  = (item) => navigation.navigate('ItemDetails', { item });
  const handleReportItem = ()     => navigation.navigate('ReportItem');

  const renderItem = ({ item }) => {
    const isLost      = item.type === 'Lost';
    const accentColor = isLost ? '#FF5722' : '#16a97a';
    const tagBg       = isLost ? '#FFF3F0' : '#EDFAF5';

    return (
      <TouchableOpacity
        style={[styles.itemCard, { borderLeftColor: accentColor }]}
        onPress={() => handleItemPress(item)}
        activeOpacity={0.85}
      >
        {isNewItem(item.createdAt) && (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>NEW</Text>
          </View>
        )}

        <View style={styles.itemContent}>
          <Image
            source={
              item.imageUrl
                ? { uri: item.imageUrl }
                : { uri: 'https://via.placeholder.com/80x80/e8eaf6/9fa8da?text=?' }
            }
            style={styles.itemImage}
            resizeMode="cover"
          />

          <View style={styles.itemInfo}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
              <View style={[styles.typeTag, { backgroundColor: tagBg }]}>
                <View style={[styles.typeDot, { backgroundColor: accentColor }]} />
                <Text style={[styles.typeText, { color: accentColor }]}>{item.type}</Text>
              </View>
            </View>

            {item.description ? (
              <Text style={styles.itemDesc} numberOfLines={1}>{item.description}</Text>
            ) : null}

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

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading items…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* ── Page title ───────────────────────────────────────────────────── */}
      <View style={styles.pageTitle}>
        <Text style={styles.pageTitleText}>Lost & Found</Text>
        <Text style={styles.pageTitleSub}>Tap any item to see full details and chat.</Text>
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
          <Text style={[styles.statNumber, { color: '#16a97a' }]}>{stats.found}</Text>
          <Text style={styles.statLabel}>Found</Text>
        </View>
      </View>

      {/* ── Search bar ───────────────────────────────────────────────────── */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or location..."
          placeholderTextColor="#bbb"
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
          const count    = f === 'All' ? stats.total : f === 'Lost' ? stats.lost : stats.found;
          const tabColor = f === 'Lost' ? '#FF5722' : f === 'Found' ? '#16a97a' : '#1a237e';
          return (
            <TouchableOpacity
              key={f}
              style={[
                styles.filterTab,
                isActive
                  ? { backgroundColor: tabColor, borderColor: tabColor }
                  : { borderColor: '#ddd' },
              ]}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={[styles.filterTabText, isActive && { color: '#fff' }]}>
                {f} {count}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ── List / empty state ───────────────────────────────────────────── */}
      <View style={{ flex: 1 }}>
        {filteredItems.length === 0 ? (
          <View style={styles.centered}>
            <Text style={styles.emptyIcon}>{searchQuery ? '🔎' : '📭'}</Text>
            <Text style={styles.emptyTitle}>
              {searchQuery ? 'No results found' : 'No items yet'}
            </Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery
                ? `Nothing matched "${searchQuery}". Try a different keyword.`
                : 'Be the first to report a lost or found item on campus!'}
            </Text>
            {searchQuery ? (
              <TouchableOpacity style={styles.clearSearchBtn} onPress={() => setSearchQuery('')}>
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

      {/* ── Floating Report button ────────────────────────────────────────── */}
      <TouchableOpacity style={styles.fab} onPress={handleReportItem} activeOpacity={0.88}>
        <Text style={styles.fabText}>＋ Report</Text>
      </TouchableOpacity>

      {/* ── Footer logout ────────────────────────────────────────────────── */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutFooterBtn} onPress={handleLogout}>
          <Text style={styles.logoutFooterText}> Log Out </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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

  // ── Nav header ────────────────────────────────────────────────────────────
  navLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  navLogo: {
    height: 30,
    width: 30,
    borderRadius: 6,
  },
  navCampus: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1a237e',
  },
  navFinder: {
    fontSize: 17,
    fontWeight: '800',
    color: '#16a97a',
  },

  // ── Nav inbox button ──────────────────────────────────────────────────────
  inboxBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f4ff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  inboxIcon: {
    fontSize: 20,
  },
  inboxBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#E53935',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  inboxBadgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '700',
  },

  // ── Page title ────────────────────────────────────────────────────────────
  pageTitle: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 14,
  },
  pageTitleText: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1a1a2e',
    letterSpacing: 0.2,
  },
  pageTitleSub: {
    fontSize: 13,
    color: '#999',
    marginTop: 3,
  },

  // ── Stats banner ──────────────────────────────────────────────────────────
  statsBanner: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 14,
    paddingVertical: 14,
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
    fontSize: 24,
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
    shadowOpacity: 0.06,
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
    paddingVertical: 10,
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
    paddingVertical: 8,
    borderRadius: 22,
    borderWidth: 1.5,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  filterTabText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#555',
  },

  // ── List ──────────────────────────────────────────────────────────────────
  listContainer: {
    padding: 16,
    paddingTop: 10,
    paddingBottom: 90,
  },

  // ── Item card ─────────────────────────────────────────────────────────────
  itemCard: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'visible',
  },
  newBadge: {
    position: 'absolute',
    top: -6,
    right: 12,
    backgroundColor: '#FF6D00',
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
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 14,
    backgroundColor: '#e8eaf6',
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
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
    flex: 1,
    marginRight: 8,
  },
  typeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    gap: 4,
  },
  typeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  typeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  itemDesc: {
    fontSize: 13,
    color: '#999',
    marginBottom: 5,
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
    color: '#bbb',
  },
  itemReporter: {
    fontSize: 12,
    color: '#bbb',
  },

  // ── Floating Report button ─────────────────────────────────────────────────
  fab: {
    position: 'absolute',
    bottom: 72,
    right: 20,
    backgroundColor: '#1a237e',
    borderRadius: 28,
    paddingHorizontal: 22,
    paddingVertical: 14,
    shadowColor: '#1a237e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  fabText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.3,
  },

  // ── Footer logout ─────────────────────────────────────────────────────────
  footer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  logoutFooterBtn: {
    paddingHorizontal: 36,
    paddingVertical: 11,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#E53935',
  },
  logoutFooterText: {
    color: '#E53935',
    fontSize: 15,
    fontWeight: '600',
  },
});
