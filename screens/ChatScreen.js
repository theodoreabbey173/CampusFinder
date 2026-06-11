import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  Animated,
  AppState,
} from 'react-native';
import { auth } from '../firebaseConfig';
import {
  createOrGetChat,
  sendMessage,
  subscribeToMessages,
  formatMessageTime,
} from '../backend/chatService';
import {
  registerForNotifications,
  showMessageNotification,
  clearBadge,
  addNotificationTapListener,
} from '../backend/notificationService';

// ─── In-app toast component ───────────────────────────────────────────────────
// Slides down from the top when a new message arrives while this screen
// is in the foreground.

const MessageToast = ({ senderName, messageText, visible }) => {
  const translateY = useRef(new Animated.Value(-90)).current;
  const opacity    = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) return;

    // Slide in
    Animated.parallel([
      Animated.spring(translateY, {
        toValue:        0,
        useNativeDriver: true,
        tension:         60,
        friction:         8,
      }),
      Animated.timing(opacity, {
        toValue:         1,
        duration:        200,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-dismiss after 3 s
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue:         -90,
          duration:        300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue:         0,
          duration:        300,
          useNativeDriver: true,
        }),
      ]).start();
    }, 3000);

    return () => clearTimeout(timer);
  }, [visible, senderName, messageText]);

  return (
    <Animated.View
      style={[
        styles.toast,
        { transform: [{ translateY }], opacity },
      ]}
      pointerEvents="none"
    >
      <View style={styles.toastIcon}>
        <Text style={styles.toastIconText}>💬</Text>
      </View>
      <View style={styles.toastBody}>
        <Text style={styles.toastSender} numberOfLines={1}>{senderName}</Text>
        <Text style={styles.toastMessage} numberOfLines={1}>{messageText}</Text>
      </View>
      <Text style={styles.toastLock}>🔒</Text>
    </Animated.View>
  );
};

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function ChatScreen({ navigation, route }) {
  const { item }      = route.params;
  const currentUser   = auth.currentUser;

  const [chatId,     setChatId]     = useState(null);
  const [messages,   setMessages]   = useState([]);
  const [message,    setMessage]    = useState('');
  const [loading,    setLoading]    = useState(true);
  const [sending,    setSending]    = useState(false);
  const [initError,  setInitError]  = useState(null);

  // Toast state
  const [toast,      setToast]      = useState({ visible: false, sender: '', text: '' });
  const toastKey                    = useRef(0);           // forces re-trigger on each new msg

  // Refs for notification logic
  const appStateRef        = useRef(AppState.currentState);
  const isInitialLoad      = useRef(true);
  const prevMessageCount   = useRef(0);
  const scrollRef          = useRef(null);
  const itemNameRef        = useRef(item.name);

  // ── Notification setup ──────────────────────────────────────────────────────

  useEffect(() => {
    // Ask permission and clear any old badge
    registerForNotifications();
    clearBadge();

    // If user taps a notification → go back to this chat (already here)
    const removeTapListener = addNotificationTapListener(() => {
      clearBadge();
    });

    // Track app foreground/background state
    const appStateSub = AppState.addEventListener('change', (nextState) => {
      appStateRef.current = nextState;
      if (nextState === 'active') clearBadge();
    });

    return () => {
      removeTapListener();
      appStateSub.remove();
    };
  }, []);

  // ── Init chat ───────────────────────────────────────────────────────────────
  // `retryKey` drives re-runs when the user taps "Try Again".
  // `existingChatId` is passed when navigating from the Inbox — skips
  //  createOrGetChat and the self-chat guard entirely.

  const [retryKey, setRetryKey] = useState(0);

  // Params passed from InboxScreen (optional)
  const existingChatId  = route.params?.existingChatId  ?? null;
  const passedOtherUid  = route.params?.otherUserId     ?? null;

  useEffect(() => {
    if (!currentUser) return;
    if (!loading) return;

    let unsubscribe;

    const subscribeToChat = (id) => {
      setChatId(id);
      unsubscribe = subscribeToMessages(
        id,
        (msgs) => {
          const isFirst = isInitialLoad.current;
          isInitialLoad.current = false;

          if (!isFirst && msgs.length > prevMessageCount.current) {
            const newest = msgs[msgs.length - 1];
            if (newest.senderId !== currentUser.uid) {
              handleIncomingMessage(newest);
            }
          }

          prevMessageCount.current = msgs.length;
          setMessages(msgs);
          setLoading(false);
          setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
        },
        (err) => {
          setInitError(err.message ?? 'Could not load messages.');
          setLoading(false);
        },
      );
    };

    // ── Fast path: chatId already known (opened from Inbox) ──────────────────
    if (existingChatId) {
      subscribeToChat(existingChatId);
      return () => { if (unsubscribe) unsubscribe(); };
    }

    // ── Normal path: opened from DetailsScreen ───────────────────────────────
    const otherUserId = passedOtherUid ?? item.reportedBy ?? 'unknown';

    if (currentUser.uid === otherUserId) {
      Alert.alert('This is your item', 'You cannot chat about your own report.');
      navigation.goBack();
      return;
    }

    const initChat = async () => {
      try {
        setInitError(null);

        if (!item.id) throw new Error('Item is missing an ID. Please go back and try again.');
        if (!otherUserId || otherUserId === 'unknown') {
          throw new Error("Could not identify the item's owner. Please try again.");
        }

        const id = await createOrGetChat(
          currentUser.uid,
          currentUser.displayName ?? 'Anonymous',
          otherUserId,
          item.reporterName ?? 'User',
          item.id,
          item.name,
        );

        subscribeToChat(id);
      } catch (error) {
        console.error('Chat init error:', error);
        setInitError(error.message ?? 'Could not open the chat. Please try again.');
        setLoading(false);
      }
    };

    initChat();
    return () => { if (unsubscribe) unsubscribe(); };
  }, [retryKey]);

  // ── Handle an incoming message ──────────────────────────────────────────────

  const handleIncomingMessage = useCallback((msg) => {
    if (appStateRef.current === 'active') {
      // App is visible — show in-app animated toast
      toastKey.current += 1;
      setToast({ visible: true, sender: msg.senderName, text: msg.text, key: toastKey.current });
    } else {
      // App is backgrounded — fire a system notification
      showMessageNotification(msg.senderName, msg.text, itemNameRef.current);
    }
  }, []);

  // ── Send message ────────────────────────────────────────────────────────────

  const handleSend = async () => {
    if (!message.trim()) return;

    // Chat still initialising — tell the user instead of silently failing
    if (!chatId) {
      Alert.alert('Chat not ready', 'The chat is still loading. Please wait a moment and try again.');
      return;
    }
    if (!currentUser) {
      Alert.alert('Not signed in', 'Please sign in to send messages.');
      return;
    }

    const text = message.trim();
    setMessage('');
    setSending(true);

    try {
      await sendMessage(
        chatId,
        text,
        currentUser.uid,
        currentUser.displayName ?? 'Anonymous',
      );
    } catch (error) {
      console.error('Send error:', error);
      Alert.alert('Send Failed', 'Could not send the message. Please check your connection and try again.');
      setMessage(text);   // restore so user can retry
    } finally {
      setSending(false);
    }
  };

  const handleEndChat = () => {
    navigation.navigate('ReportConfirmation');
  };

  // ── Render a single message bubble ─────────────────────────────────────────

  const renderMessage = (msg) => {
    const isMe        = msg.senderId === currentUser?.uid;
    const bubbleStyle = isMe ? styles.myMessage : styles.theirMessage;

    return (
      <View key={msg.id} style={[styles.messageWrapper, isMe ? styles.wrapperRight : styles.wrapperLeft]}>
        {!isMe && (
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>
              {(msg.senderName?.[0] ?? '?').toUpperCase()}
            </Text>
          </View>
        )}

        <View style={[styles.messageBubble, bubbleStyle]}>
          {!isMe && (
            <Text style={styles.senderName}>{msg.senderName}</Text>
          )}
          <Text style={[styles.messageText, isMe ? styles.myText : styles.theirText]}>
            {msg.text}
          </Text>
          <View style={styles.messageFooter}>
            <Text style={[styles.timestamp, isMe ? styles.tsRight : styles.tsLeft]}>
              {formatMessageTime(msg.timestamp)}
            </Text>
            {/* Encrypted indicator per bubble */}
            <Text style={styles.lockIcon}>🔒</Text>
          </View>
        </View>
      </View>
    );
  };

  // ── Error state ─────────────────────────────────────────────────────────────

  if (initError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorEmoji}>⚠️</Text>
        <Text style={styles.errorTitle}>Chat unavailable</Text>
        <Text style={styles.errorMessage}>{initError}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => {
            setInitError(null);
            setLoading(true);
            setChatId(null);
            isInitialLoad.current    = true;
            prevMessageCount.current = 0;
            setRetryKey((k) => k + 1);  // triggers the useEffect to re-run
          }}
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.goBackLink} onPress={() => navigation.goBack()}>
          <Text style={styles.goBackLinkText}>← Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ── Loading state ───────────────────────────────────────────────────────────

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Opening secure chat…</Text>
      </View>
    );
  }

  // ── Main render ─────────────────────────────────────────────────────────────

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* ── In-app toast ─────────────────────────────────────────────────── */}
      <MessageToast
        key={toast.key}
        visible={toast.visible}
        senderName={toast.sender}
        messageText={toast.text}
      />

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle} numberOfLines={1}>💬 {item.name}</Text>
          <View style={styles.encryptionBadge}>
            <Text style={styles.encryptionIcon}>🔒</Text>
            <Text style={styles.encryptionText}>End-to-end encrypted</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.onlineDot} />
        </View>
      </View>

      {/* ── Encryption notice (one-time banner) ──────────────────────────── */}
      <View style={styles.encryptionBanner}>
        <Text style={styles.encryptionBannerText}>
          🔐 Messages are encrypted and only visible to you and the other person.
        </Text>
      </View>

      {/* ── Messages ─────────────────────────────────────────────────────── */}
      <ScrollView
        ref={scrollRef}
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
      >
        {messages.length === 0 ? (
          <View style={styles.emptyChat}>
            <Text style={styles.emptyChatEmoji}>👋</Text>
            <Text style={styles.emptyChatTitle}>Start the conversation</Text>
            <Text style={styles.emptyChatSub}>Say hello and ask about the item!</Text>
          </View>
        ) : (
          messages.map(renderMessage)
        )}
        <View style={{ height: 10 }} />
      </ScrollView>

      {/* ── Input bar ────────────────────────────────────────────────────── */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a secure message…"
            placeholderTextColor="#aaa"
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={500}
            editable={!sending}
            onSubmitEditing={handleSend}
          />
          <Text style={styles.inputLock}>🔒</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.sendButton,
            (!message.trim() || sending) && styles.sendButtonDisabled,
          ]}
          onPress={handleSend}
          disabled={!message.trim() || sending}
        >
          {sending
            ? <ActivityIndicator color="#fff" size="small" />
            : <Text style={styles.sendButtonText}>➤</Text>
          }
        </TouchableOpacity>
      </View>

      {/* ── End chat ─────────────────────────────────────────────────────── */}
      <TouchableOpacity style={styles.endChatButton} onPress={handleEndChat}>
        <Text style={styles.endChatButtonText}>✅  End Chat &amp; Report</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF0F6',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECF0F6',
  },
  loadingText: {
    marginTop: 12,
    color: '#666',
    fontSize: 16,
  },
  errorEmoji: {
    fontSize:     52,
    marginBottom: 12,
  },
  errorTitle: {
    fontSize:     20,
    fontWeight:   '700',
    color:        '#333',
    marginBottom:  8,
  },
  errorMessage: {
    fontSize:    14,
    color:       '#888',
    textAlign:   'center',
    paddingHorizontal: 30,
    marginBottom: 24,
    lineHeight:   20,
  },
  retryButton: {
    backgroundColor:   '#2196F3',
    paddingHorizontal: 32,
    paddingVertical:   12,
    borderRadius:      24,
    marginBottom:      12,
  },
  retryButtonText: {
    color:      '#fff',
    fontWeight: '700',
    fontSize:   15,
  },
  goBackLink: { padding: 8 },
  goBackLinkText: {
    color:    '#2196F3',
    fontSize: 14,
  },

  // ── Toast ──────────────────────────────────────────────────────────────────
  toast: {
    position:        'absolute',
    top:             0,
    left:            12,
    right:           12,
    zIndex:          999,
    backgroundColor: '#1a1a2e',
    borderRadius:    14,
    flexDirection:   'row',
    alignItems:      'center',
    padding:         12,
    shadowColor:     '#000',
    shadowOffset:    { width: 0, height: 4 },
    shadowOpacity:   0.3,
    shadowRadius:    8,
    elevation:       10,
    marginTop:       8,
  },
  toastIcon: {
    width:           38,
    height:          38,
    borderRadius:    19,
    backgroundColor: '#2196F3',
    justifyContent:  'center',
    alignItems:      'center',
    marginRight:     10,
  },
  toastIconText: { fontSize: 18 },
  toastBody:     { flex: 1 },
  toastSender: {
    color:      '#fff',
    fontWeight: '700',
    fontSize:   14,
  },
  toastMessage: {
    color:    'rgba(255,255,255,0.75)',
    fontSize: 13,
    marginTop: 2,
  },
  toastLock: {
    fontSize:   16,
    marginLeft: 8,
  },

  // ── Header ─────────────────────────────────────────────────────────────────
  header: {
    backgroundColor:  '#1a1a2e',
    paddingHorizontal: 16,
    paddingVertical:   14,
    flexDirection:    'row',
    justifyContent:   'space-between',
    alignItems:       'center',
  },
  headerLeft:  { flex: 1 },
  headerTitle: {
    fontSize:    18,
    fontWeight:  '700',
    color:       '#fff',
    letterSpacing: 0.2,
  },
  encryptionBadge: {
    flexDirection: 'row',
    alignItems:    'center',
    marginTop:     4,
  },
  encryptionIcon: { fontSize: 11, marginRight: 4 },
  encryptionText: {
    fontSize:  12,
    color:     '#4CAF50',
    fontWeight: '600',
  },
  headerRight:  { marginLeft: 12 },
  onlineDot: {
    width:           10,
    height:          10,
    borderRadius:    5,
    backgroundColor: '#4CAF50',
  },

  // ── Encryption banner ───────────────────────────────────────────────────────
  encryptionBanner: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 14,
    paddingVertical:   8,
    borderBottomWidth: 1,
    borderBottomColor: '#C8E6C9',
  },
  encryptionBannerText: {
    fontSize:  12,
    color:     '#2E7D32',
    textAlign: 'center',
    fontWeight: '500',
  },

  // ── Messages ────────────────────────────────────────────────────────────────
  messagesContainer: {
    flex:    1,
    padding: 12,
  },
  emptyChat: {
    alignItems:  'center',
    paddingTop:  60,
    paddingBottom: 20,
  },
  emptyChatEmoji: {
    fontSize:     48,
    marginBottom: 10,
  },
  emptyChatTitle: {
    fontSize:     18,
    fontWeight:   '700',
    color:        '#555',
    marginBottom:  4,
  },
  emptyChatSub: {
    fontSize: 14,
    color:    '#999',
  },

  // Message layout
  messageWrapper: {
    flexDirection: 'row',
    marginBottom:  10,
    alignItems:    'flex-end',
  },
  wrapperRight: { justifyContent: 'flex-end' },
  wrapperLeft:  { justifyContent: 'flex-start' },

  // Avatar for incoming messages
  avatarCircle: {
    width:           32,
    height:          32,
    borderRadius:    16,
    backgroundColor: '#7C4DFF',
    justifyContent:  'center',
    alignItems:      'center',
    marginRight:     6,
    marginBottom:    2,
  },
  avatarText: {
    color:      '#fff',
    fontWeight: '700',
    fontSize:   14,
  },

  // Bubble
  messageBubble: {
    maxWidth:     '75%',
    borderRadius: 18,
    padding:       12,
    paddingBottom:  8,
  },
  myMessage: {
    backgroundColor:    '#2196F3',
    borderBottomRightRadius: 4,
  },
  theirMessage: {
    backgroundColor:   '#fff',
    borderBottomLeftRadius: 4,
    shadowColor:        '#000',
    shadowOffset:       { width: 0, height: 1 },
    shadowOpacity:      0.08,
    shadowRadius:       4,
    elevation:          2,
  },
  senderName: {
    fontSize:    12,
    fontWeight:  '700',
    color:       '#7C4DFF',
    marginBottom: 3,
  },
  messageText: {
    fontSize:   15,
    lineHeight: 21,
  },
  myText:    { color: '#fff' },
  theirText: { color: '#222' },

  messageFooter: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'flex-end',
    marginTop:       4,
    gap:             4,
  },
  timestamp: { fontSize: 11 },
  tsRight:   { color: 'rgba(255,255,255,0.65)' },
  tsLeft:    { color: '#bbb' },
  lockIcon:  { fontSize: 10 },

  // ── Input bar ───────────────────────────────────────────────────────────────
  inputContainer: {
    flexDirection:   'row',
    padding:          12,
    paddingTop:        8,
    borderTopWidth:    1,
    borderTopColor:   '#dde4ef',
    backgroundColor:  '#fff',
    alignItems:       'flex-end',
  },
  inputWrapper: {
    flex:             1,
    flexDirection:    'row',
    alignItems:       'center',
    borderWidth:       1,
    borderColor:      '#dde4ef',
    borderRadius:     24,
    paddingHorizontal: 14,
    paddingVertical:    6,
    marginRight:       8,
    backgroundColor:  '#F4F7FB',
  },
  textInput: {
    flex:      1,
    fontSize:  15,
    color:     '#222',
    maxHeight: 100,
    paddingVertical: 4,
  },
  inputLock: {
    fontSize:   14,
    marginLeft:  6,
    opacity:    0.5,
  },
  sendButton: {
    width:           44,
    height:          44,
    borderRadius:    22,
    backgroundColor: '#2196F3',
    justifyContent:  'center',
    alignItems:      'center',
    shadowColor:     '#2196F3',
    shadowOffset:    { width: 0, height: 3 },
    shadowOpacity:   0.4,
    shadowRadius:    6,
    elevation:       5,
  },
  sendButtonDisabled: { opacity: 0.35 },
  sendButtonText: {
    color:    '#fff',
    fontSize: 18,
  },

  // ── End chat ────────────────────────────────────────────────────────────────
  endChatButton: {
    backgroundColor: '#4CAF50',
    marginHorizontal: 16,
    marginBottom:     16,
    marginTop:         4,
    padding:          13,
    borderRadius:     12,
    alignItems:       'center',
    shadowColor:      '#4CAF50',
    shadowOffset:     { width: 0, height: 3 },
    shadowOpacity:    0.35,
    shadowRadius:     6,
    elevation:         4,
  },
  endChatButtonText: {
    color:      '#fff',
    fontWeight: '700',
    fontSize:   15,
  },
});
