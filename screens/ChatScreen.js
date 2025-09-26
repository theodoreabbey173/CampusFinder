import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function ChatScreen({ navigation, route }) {
  const { item } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: `Hi! I'm interested in the ${item.name}. Is it still available?`,
      sender: 'user',
      timestamp: '10:30 AM',
    },
    {
      id: '2',
      text: 'Yes, it is! Can you describe some details to verify it\'s yours?',
      sender: 'other',
      timestamp: '10:32 AM',
    },
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Simulate auto-response after sending a message
    setTimeout(() => {
      const autoResponse = {
        id: (Date.now() + 1).toString(),
        text: 'Thanks for the information! Let me check and get back to you.',
        sender: 'other',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, autoResponse]);
    }, 1000);
  };

  const handleEndChat = () => {
    navigation.navigate('ReportConfirmation');
  };

  const renderMessage = (msg) => (
    <View
      key={msg.id}
      style={[
        styles.messageContainer,
        msg.sender === 'user' ? styles.userMessage : styles.otherMessage
      ]}
    >
      <Text style={[
        styles.messageText,
        msg.sender === 'user' ? styles.userMessageText : styles.otherMessageText
      ]}>
        {msg.text}
      </Text>
      <Text style={styles.timestamp}>{msg.timestamp}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat about: {item.name}</Text>
        <Text style={styles.headerSubtitle}>🔒 Secure conversation</Text>
      </View>

      <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
        {messages.map(renderMessage)}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type your message..."
          value={message}
          onChangeText={setMessage}
          multiline
          maxLength={500}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.endChatButton} onPress={handleEndChat}>
        <Text style={styles.endChatButtonText}>End Chat & Report</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  messagesContainer: {
    flex: 1,
    padding: 15,
  },
  messageContainer: {
    marginBottom: 15,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#2196F3',
    borderRadius: 18,
    borderBottomRightRadius: 5,
    padding: 12,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    borderRadius: 18,
    borderBottomLeftRadius: 5,
    padding: 12,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: '#fff',
  },
  otherMessageText: {
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
    backgroundColor: '#f9f9f9',
  },
  sendButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  endChatButton: {
    backgroundColor: '#4CAF50',
    margin: 15,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  endChatButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});