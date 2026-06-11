import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { checkEmailVerified, resendVerificationEmail } from '../backend/authService';

export default function VerificationScreen({ navigation, route }) {
  const { email, emailSent = true } = route.params ?? {};
  const [checking,  setChecking]  = useState(false);
  const [resending, setResending] = useState(false);
  // Track whether a successful send has happened this session
  const [hasSent, setHasSent] = useState(emailSent);

  /** Poll Firebase to see if the user has clicked the email link yet. */
  const handleCheckVerified = async () => {
    setChecking(true);
    try {
      const verified = await checkEmailVerified();
      if (verified) {
        // Reset the navigation stack so the user can't go back to Verification
        navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
      } else {
        Alert.alert(
          'Not Verified Yet',
          'We couldn\'t confirm your email yet.\n\n• Check your inbox AND spam/junk folder\n• Make sure you clicked the link (not just opened the email)\n• Then tap this button again',
        );
      }
    } catch (err) {
      Alert.alert('Error', err?.message ?? 'Could not check verification. Please try again.');
    } finally {
      setChecking(false);
    }
  };

  /** Re-send a fresh verification email. */
  const handleResend = async () => {
    setResending(true);
    try {
      await resendVerificationEmail();
      setHasSent(true);
      Alert.alert(
        '📬 Email Sent',
        `A verification link was sent to ${email}.\n\nIf it doesn't appear in your inbox within a minute, check your spam or junk folder.`,
      );
    } catch (err) {
      Alert.alert('Error', err?.message ?? 'Could not resend the verification email. Please try again.');
    } finally {
      setResending(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{hasSent ? '📧' : '⚠️'}</Text>

      <Text style={styles.title}>
        {hasSent ? 'Check Your Email' : 'Email Not Sent'}
      </Text>

      {hasSent ? (
        <>
          <Text style={styles.subtitle}>We've sent a verification link to:</Text>
          <Text style={styles.email}>{email}</Text>
          <Text style={styles.instructions}>
            Open the link in the email to verify your account, then tap the button below.{'\n\n'}
            📁 <Text style={styles.bold}>Don't see it?</Text> Check your <Text style={styles.bold}>spam or junk folder</Text> — Firebase emails sometimes land there.
          </Text>
        </>
      ) : (
        <>
          <Text style={styles.email}>{email}</Text>
          <Text style={styles.instructions}>
            The verification email couldn't be delivered automatically.{'\n\n'}
            Tap <Text style={styles.bold}>"Send Verification Email"</Text> below to try again.
          </Text>
        </>
      )}

      {hasSent && (
        <TouchableOpacity
          style={[styles.button, checking && styles.buttonDisabled]}
          onPress={handleCheckVerified}
          disabled={checking || resending}
        >
          {checking
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.buttonText}>✅ I've Verified My Email</Text>
          }
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.resendButton, (!hasSent) && styles.resendButtonPrimary]}
        onPress={handleResend}
        disabled={checking || resending}
      >
        {resending
          ? <ActivityIndicator color={hasSent ? '#2196F3' : '#fff'} size="small" />
          : <Text style={[styles.resendText, (!hasSent) && styles.resendTextPrimary]}>
              {hasSent ? 'Didn\'t receive it? Resend Email' : '📨 Send Verification Email'}
            </Text>
        }
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
    alignItems: 'center',
  },
  icon: {
    fontSize: 72,
    marginBottom: 20,
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
    color: '#666',
    marginBottom: 6,
  },
  email: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 24,
    textAlign: 'center',
  },
  instructions: {
    fontSize: 15,
    textAlign: 'center',
    color: '#555',
    lineHeight: 22,
    marginBottom: 36,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
    color: '#333',
  },
  resendButton: {
    alignItems: 'center',
    padding: 10,
    marginTop: 4,
  },
  resendButtonPrimary: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    width: '100%',
    marginTop: 12,
  },
  resendText: {
    color: '#2196F3',
    fontSize: 16,
  },
  resendTextPrimary: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
