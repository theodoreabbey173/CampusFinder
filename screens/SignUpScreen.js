import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Lock } from 'lucide-react-native';
import { registerUser } from '../backend/authService';

export default function SignUpScreen({ navigation }) {
  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const { emailSent } = await registerUser(name, email, password);
      // Navigate to verification screen; pass whether the email was actually sent
      // so the screen can show appropriate guidance if delivery failed.
      navigation.navigate('Verification', { email, emailSent });
    } catch (error) {
      let message = 'Sign up failed. Please try again.';
      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'This email is already registered. Please sign in instead.';
          break;
        case 'auth/invalid-email':
          message = 'Please enter a valid email address.';
          break;
        case 'auth/weak-password':
          message = 'Password should be at least 6 characters.';
          break;
        case 'auth/network-request-failed':
          message = 'No internet connection. Please check your network.';
          break;
      }
      Alert.alert('Sign Up Error', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        <LinearGradient
          colors={['#16296b', '#1c4b8e', '#159e94']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.logoWrapper}>
            <Image source={require('../assets/icon.png')} style={styles.logo} />
          </View>
          <Text style={styles.appName}>CampusFinder</Text>
          <Text style={styles.tagline}>Join your campus lost & found community.</Text>
        </LinearGradient>

        <View style={styles.card}>
          <View style={styles.tabRow}>
            <TouchableOpacity
              style={styles.tab}
              onPress={() => navigation.navigate('Login')}
              disabled={loading}
            >
              <Text style={styles.tabTextInactive}>Log in</Text>
            </TouchableOpacity>
            <View style={styles.tabActive}>
              <Text style={styles.tabTextActive}>Sign up</Text>
            </View>
          </View>

          <Text style={styles.label}>Full name</Text>
          <TextInput
            style={styles.input}
            placeholder="Kwame Mensah"
            placeholderTextColor="#9AA0AC"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            editable={!loading}
          />

          <Text style={styles.label}>University email</Text>
          <TextInput
            style={styles.input}
            placeholder="kwame@st.ug.edu.gh"
            placeholderTextColor="#9AA0AC"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="At least 6 characters"
            placeholderTextColor="#9AA0AC"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.buttonText}>Sign up</Text>
            }
          </TouchableOpacity>

          <View style={styles.footerNoteRow}>
            <Lock size={12} color="#9AA0AC" strokeWidth={2.2} />
            <Text style={styles.footerNote}>A verification code will be sent to your email.</Text>
          </View>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => navigation.navigate('Login')}
            disabled={loading}
          >
            <Text style={styles.linkText}>
              Already have an account? <Text style={styles.linkBold}>Log in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingTop: 70,
    paddingBottom: 60,
    alignItems: 'center',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  logoWrapper: {
    width: 84,
    height: 84,
    borderRadius: 22,
    backgroundColor: '#fff',
    padding: 6,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  appName: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  tagline: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: -28,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 40,
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#EEF0F6',
    borderRadius: 14,
    padding: 4,
    marginBottom: 28,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabActive: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  tabTextInactive: {
    color: '#8A8F9A',
    fontWeight: '600',
    fontSize: 15,
  },
  tabTextActive: {
    color: '#1B3A8A',
    fontWeight: '700',
    fontSize: 15,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E1E3E8',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 18,
    borderRadius: 12,
    fontSize: 15,
    backgroundColor: '#FAFBFC',
    color: '#222',
  },
  button: {
    backgroundColor: '#1B3A8A',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 6,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerNoteRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginTop: 16,
  },
  footerNote: {
    color: '#9AA0AC',
    fontSize: 12,
  },
  linkButton: {
    alignItems: 'center',
    marginTop: 22,
  },
  linkText: {
    color: '#666',
    fontSize: 14,
  },
  linkBold: {
    color: '#1B3A8A',
    fontWeight: 'bold',
  },
});
