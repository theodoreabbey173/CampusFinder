import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function ConfirmationScreen({ navigation }) {
  const handleBackToItems = () => {
    navigation.navigate('ItemList');
  };

  const handleStartNewChat = () => {
    navigation.navigate('ItemList');
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.checkIcon}>✅</Text>
      </View>

      <Text style={styles.title}>Communication Initiated!</Text>
      
      <Text style={styles.subtitle}>
        Your secure conversation has been established. You can now coordinate directly with the other user.
      </Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>🔒 Your Privacy is Protected</Text>
        <Text style={styles.infoText}>
          • All messages are encrypted end-to-end
        </Text>
        <Text style={styles.infoText}>
          • Personal information is kept secure
        </Text>
        <Text style={styles.infoText}>
          • Chat history is automatically deleted after 30 days
        </Text>
        <Text style={styles.infoText}>
          • You can report any inappropriate behavior
        </Text>
      </View>

      <View style={styles.tipBox}>
        <Text style={styles.tipTitle}>💡 Pro Tips</Text>
        <Text style={styles.tipText}>
          • Meet in public places on campus
        </Text>
        <Text style={styles.tipText}>
          • Verify item details before meeting
        </Text>
        <Text style={styles.tipText}>
          • Use the CampusFinder rating system
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleBackToItems}>
          <Text style={styles.primaryButtonText}>Back to Items</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.secondaryButton} onPress={handleStartNewChat}>
          <Text style={styles.secondaryButtonText}>Find More Items</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  checkIcon: {
    fontSize: 80,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
    lineHeight: 26,
  },
  infoBox: {
    backgroundColor: '#e8f5e8',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
    lineHeight: 22,
  },
  tipBox: {
    backgroundColor: '#fff3e0',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  tipText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
    lineHeight: 22,
  },
  buttonContainer: {
    gap: 15,
  },
  primaryButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  secondaryButtonText: {
    color: '#2196F3',
    fontSize: 18,
    fontWeight: 'bold',
  },
});