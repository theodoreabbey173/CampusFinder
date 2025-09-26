import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

export default function VerificationScreen({ navigation }) {
  const [code, setCode] = useState('');

  const handleVerify = () => {
    if (!code || code.length !== 4) {
      Alert.alert('Error', 'Please enter a valid 4-digit code');
      return;
    }
    navigation.navigate('Welcome');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Account</Text>
      <Text style={styles.subtitle}>
        We've sent a 4-digit verification code to your email
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter 4-digit code"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
        maxLength={4}
        textAlign="center"
      />

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton}>
        <Text style={styles.linkText}>Didn't receive the code? Resend</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    color: '#666',
    lineHeight: 22,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 20,
    marginBottom: 30,
    borderRadius: 8,
    fontSize: 24,
    backgroundColor: '#f9f9f9',
    letterSpacing: 8,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkButton: {
    alignItems: 'center',
  },
  linkText: {
    color: '#2196F3',
    fontSize: 16,
  },
});