import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function WelcomeScreen({ navigation }) {
  const handleGetStarted = () => {
    navigation.navigate('ItemList');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to CampusFinder!</Text>
      <Text style={styles.subtitle}>
        You're all set! Let's explore the app and help you find or report lost items on campus.
      </Text>

      <View style={styles.features}>
        <Text style={styles.featureTitle}>What you can do:</Text>
        <Text style={styles.featureItem}>• Browse lost & found items</Text>
        <Text style={styles.featureItem}>• Report lost or found items</Text>
        <Text style={styles.featureItem}>• Chat securely with other users</Text>
        <Text style={styles.featureItem}>• Help reunite items with their owners</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2196F3',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
    color: '#666',
    lineHeight: 26,
  },
  features: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 12,
    marginBottom: 40,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  featureItem: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});