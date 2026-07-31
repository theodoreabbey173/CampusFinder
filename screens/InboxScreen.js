import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, AlertTriangle, MessageCircle } from 'lucide-react-native';
import { auth } from '../firebaseConfig';
import { subscribeToUserChats, formatMessageTime } from '../backend/chatService';

const AVATAR_COLORS = ['#14B8A6', '#1B2A6B', '#6366F1', '#F59E0B', '#EF5350'];

export default function InboxScreen({ navigation }) {
  const currentUser = auth.currentUser;

  const [chats,   setChats]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  // ── Subscribe to user's chats ───────────────────────────────────────────────
  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = subscribeToUserChats(
      currentUser.uid,
      (fetchedChats) => {
        setChats(fetchedChats);
        setLoading(false);
      },
      (err) => {
        console.error('Inbox error:', err);
        setError('Could not load chats. Check your connection and try again.');
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  // ── Navigate to a chat ──────────────────────────────────────────────────────
  const openChat = (chat) => {
    const otherUid  = chat.participants.find((uid) => uid !== currentUser.uid);
    const otherName = chat.participantNames?.[otherUid] ?? 'User';

    const item = {
      id:           chat.itemId,
      name:         chat.itemName,
      reportedBy:   chat.reporterUid,
      reporterName: chat.participantNames?.[chat.reporterUid] ?? 'User',
    };

    navigation.navigate('Chat', {
      item,
      existingChatId: chat.id,
      otherUserId:    otherUid,
      otherUserName:  otherName,
    });
  };

  // ── Render one chat row ─────────────────────────────────────────────────────
  const renderChat = ({ item: chat }) => {
    const otherUid  = chat.participants?.find((uid) => uid !== currentUser.uid);
    const otherName = chat.participantNames?.[otherUid] ?? 'Unknown User';
    const initial   = (otherName?.[0] ?? '?').toUpperCase();
    const avatarColor = AVATAR_COLORS[initial.charCodeAt(0) % AVATAR_COLORS.length];

    const timeLabel = chat.lastMessageTime
      ? formatMessageTime(chat.lastMessageTime)
      : '';

    return (
      <TouchableOpacity
        style={styles.chatCard}
        onPress={() => openChat(chat)}
        activeOpacity={0.75}
      >
        <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>

        <View style={styles.chatInfo}>
          <View style={styles.chatTopRow}>
            <Text style={styles.chatName} numberOfLines={1}>{otherName}</Text>
            <Text style={styles.chatTime}>{timeLabel}</Text>
          </View>

          <Text style={styles.chatPreview} numberOfLines={1}>
            {chat.lastMessage ?? 'No messages yet — say hello!'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // ── Header ───────────────────────────────────────────────────────────────────
  const header = (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.canGoBack() && navigation.goBack()}
        activeOpacity={0.7}
      >
        <ChevronLeft size={22} color="#1a1a2e" strokeWidth={2.4} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Messages</Text>
    </View>
  );

  // ── Loading ─────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        {header}
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>Loading chats…</Text>
        </View>
      </SafeAreaView>
    );
  }

  // ── Error ───────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        {header}
        <View style={styles.centered}>
          <AlertTriangle size={48} color="#c7cadb" strokeWidth={1.6} style={styles.errorEmoji} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  // ── Empty state ─────────────────────────────────────────────────────────────
  if (chats.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        {header}
        <View style={styles.centered}>
          <MessageCircle size={56} color="#c7cadb" strokeWidth={1.6} style={styles.emptyEmoji} />
          <Text style={styles.emptyTitle}>No conversations yet</Text>
          <Text style={styles.emptySub}>
            When someone messages you about your item, it will appear here.
          </Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => navigation.navigate('Browse')}
          >
            <Text style={styles.browseButtonText}>Browse Items</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ── Chat list ───────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {header}
      <FlatList
        data={chats}
        keyExtractor={(c) => c.id}
        renderItem={renderChat}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex:            1,
    backgroundColor: '#fff',
  },
  centered: {
    flex:            1,
    justifyContent:  'center',
    alignItems:      'center',
    padding:          40,
    backgroundColor: '#ECF0F6',
  },

  // Header
  header: {
    flexDirection:   'row',
    alignItems:      'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical:   14,
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
  headerTitle: {
    fontSize:   22,
    fontWeight: '800',
    color:      '#101014',
  },

  // List
  listContainer: {
    paddingHorizontal: 16,
    paddingTop:         12,
    paddingBottom:      20,
    backgroundColor:   '#ECF0F6',
    flexGrow:           1,
  },

  // Chat card
  chatCard: {
    flexDirection:   'row',
    alignItems:      'center',
    backgroundColor: '#fff',
    borderRadius:     18,
    padding:          14,
    marginBottom:     12,
    shadowColor:      '#1a1a2e',
    shadowOffset:     { width: 0, height: 2 },
    shadowOpacity:    0.06,
    shadowRadius:      8,
    elevation:          2,
  },
  avatar: {
    width:          46,
    height:         46,
    borderRadius:   23,
    justifyContent: 'center',
    alignItems:     'center',
    marginRight:     12,
  },
  avatarText: {
    color:      '#fff',
    fontSize:    18,
    fontWeight: '700',
  },
  chatInfo: {
    flex: 1,
  },
  chatTopRow: {
    flexDirection:  'row',
    justifyContent: 'space-between',
    alignItems:     'center',
    marginBottom:    4,
  },
  chatName: {
    fontSize:    15,
    fontWeight:  '700',
    color:       '#101014',
    flex:         1,
    marginRight:  8,
  },
  chatTime: {
    fontSize: 12,
    color:    '#9aa0b4',
  },
  chatPreview: {
    fontSize: 13,
    color:    '#8a8f9c',
  },

  // Loading / empty / error
  loadingText: {
    marginTop: 12,
    color:     '#666',
    fontSize:   15,
  },
  emptyEmoji: {
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize:     20,
    fontWeight:   '700',
    color:        '#333',
    marginBottom:  8,
    textAlign:    'center',
  },
  emptySub: {
    fontSize:    14,
    color:       '#888',
    textAlign:   'center',
    lineHeight:  21,
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor:   '#2196F3',
    paddingHorizontal: 28,
    paddingVertical:   11,
    borderRadius:      24,
  },
  browseButtonText: {
    color:      '#fff',
    fontWeight: '700',
    fontSize:    15,
  },
  errorEmoji: {
    marginBottom: 12,
  },
  errorText: {
    color:     '#888',
    textAlign: 'center',
    fontSize:   14,
    lineHeight: 21,
  },
});
