import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { auth } from '../firebaseConfig';
import { subscribeToUserChats, formatMessageTime } from '../backend/chatService';

export default function InboxScreen({ navigation }) {
  const currentUser = auth.currentUser;

  const [chats,   setChats]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  // ── Header ──────────────────────────────────────────────────────────────────
  useLayoutEffect(() => {
    navigation.setOptions({
      title:            'My Chats',
      headerStyle:      { backgroundColor: '#1a1a2e' },
      headerTitleStyle: { color: '#fff', fontWeight: '700' },
      headerTintColor:  '#fff',
    });
  }, [navigation]);

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
    // Determine the other participant
    const otherUid  = chat.participants.find((uid) => uid !== currentUser.uid);
    const otherName = chat.participantNames?.[otherUid] ?? 'User';

    // Reconstruct the minimal item object ChatScreen needs
    const item = {
      id:           chat.itemId,
      name:         chat.itemName,
      reportedBy:   chat.reporterUid,
      reporterName: chat.participantNames?.[chat.reporterUid] ?? 'User',
    };

    navigation.navigate('Chat', {
      item,
      existingChatId: chat.id,   // ← skip createOrGetChat in ChatScreen
      otherUserId:    otherUid,
      otherUserName:  otherName,
    });
  };

  // ── Render one chat row ─────────────────────────────────────────────────────
  const renderChat = ({ item: chat }) => {
    const otherUid  = chat.participants?.find((uid) => uid !== currentUser.uid);
    const otherName = chat.participantNames?.[otherUid] ?? 'Unknown User';
    const initial   = (otherName?.[0] ?? '?').toUpperCase();

    // Colour the avatar based on first letter
    const avatarColors = ['#7C4DFF', '#2196F3', '#FF5722', '#4CAF50', '#FF9800'];
    const avatarColor  = avatarColors[initial.charCodeAt(0) % avatarColors.length];

    const timeLabel = chat.lastMessageTime
      ? formatMessageTime(chat.lastMessageTime)
      : '';

    return (
      <TouchableOpacity
        style={styles.chatRow}
        onPress={() => openChat(chat)}
        activeOpacity={0.75}
      >
        {/* Avatar */}
        <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>

        {/* Info */}
        <View style={styles.chatInfo}>
          <View style={styles.chatTopRow}>
            <Text style={styles.chatName} numberOfLines={1}>{otherName}</Text>
            <Text style={styles.chatTime}>{timeLabel}</Text>
          </View>

          <Text style={styles.chatItemLabel} numberOfLines={1}>
            📦 {chat.itemName}
          </Text>

          <Text style={styles.chatPreview} numberOfLines={1}>
            {chat.lastMessage ? `🔒 ${chat.lastMessage}` : 'No messages yet — say hello!'}
          </Text>
        </View>

        {/* Chevron */}
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>
    );
  };

  // ── Loading ─────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading chats…</Text>
      </View>
    );
  }

  // ── Error ───────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorEmoji}>⚠️</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // ── Empty state ─────────────────────────────────────────────────────────────
  if (chats.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyEmoji}>💬</Text>
        <Text style={styles.emptyTitle}>No conversations yet</Text>
        <Text style={styles.emptySub}>
          When someone messages you about your item, it will appear here.
        </Text>
        <TouchableOpacity
          style={styles.browseButton}
          onPress={() => navigation.navigate('ItemList')}
        >
          <Text style={styles.browseButtonText}>Browse Items</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ── Chat list ───────────────────────────────────────────────────────────────
  return (
    <View style={styles.container}>
      {/* Banner */}
      <View style={styles.encryptionBanner}>
        <Text style={styles.encryptionBannerText}>
          🔒 All conversations are end-to-end encrypted
        </Text>
      </View>

      <FlatList
        data={chats}
        keyExtractor={(c) => c.id}
        renderItem={renderChat}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex:            1,
    backgroundColor: '#F4F7FB',
  },
  centered: {
    flex:            1,
    justifyContent:  'center',
    alignItems:      'center',
    padding:          40,
    backgroundColor: '#F4F7FB',
  },

  // Encryption banner
  encryptionBanner: {
    backgroundColor:    '#1a1a2e',
    paddingVertical:     8,
    paddingHorizontal:  16,
  },
  encryptionBannerText: {
    color:     '#4CAF50',
    fontSize:   12,
    fontWeight: '600',
    textAlign:  'center',
  },

  // List
  listContainer: {
    paddingTop:    8,
    paddingBottom: 20,
  },
  separator: {
    height:          1,
    backgroundColor: '#EEF0F5',
    marginLeft:       76,
  },

  // Chat row
  chatRow: {
    flexDirection:   'row',
    alignItems:      'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical:   14,
  },
  avatar: {
    width:          48,
    height:         48,
    borderRadius:   24,
    justifyContent: 'center',
    alignItems:     'center',
    marginRight:     12,
  },
  avatarText: {
    color:      '#fff',
    fontSize:    20,
    fontWeight: '700',
  },
  chatInfo: {
    flex: 1,
  },
  chatTopRow: {
    flexDirection:  'row',
    justifyContent: 'space-between',
    alignItems:     'center',
    marginBottom:    2,
  },
  chatName: {
    fontSize:    16,
    fontWeight:  '700',
    color:       '#1a1a2e',
    flex:         1,
    marginRight:  8,
  },
  chatTime: {
    fontSize: 12,
    color:    '#aaa',
  },
  chatItemLabel: {
    fontSize:     12,
    color:        '#2196F3',
    fontWeight:   '600',
    marginBottom:  3,
  },
  chatPreview: {
    fontSize: 13,
    color:    '#888',
  },
  chevron: {
    fontSize:   22,
    color:      '#ccc',
    marginLeft:  8,
  },

  // Loading / empty / error
  loadingText: {
    marginTop: 12,
    color:     '#666',
    fontSize:   15,
  },
  emptyEmoji: {
    fontSize:     56,
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
    fontSize:     48,
    marginBottom: 12,
  },
  errorText: {
    color:     '#888',
    textAlign: 'center',
    fontSize:   14,
    lineHeight: 21,
  },
});
