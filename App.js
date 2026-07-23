import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onIdTokenChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

// Screens
import SignUpScreen       from './screens/SignUpScreen';
import LoginScreen        from './screens/LoginScreen';
import VerificationScreen from './screens/VerificationScreen';
import WelcomeScreen      from './screens/WelcomeScreen';
import MainTabs           from './screens/MainTabs';
import DetailsScreen      from './screens/DetailsScreen';
import ReportItemScreen   from './screens/ReportItemScreen';
import ChatScreen         from './screens/ChatScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user,         setUser]         = useState(null);
  const [initializing, setInitializing] = useState(true);

  // Listen for Firebase Auth state changes (login / logout)
  useEffect(() => {
    // onIdTokenChanged fires on sign-in / sign-out AND on token refresh
    // (which includes the reload() call in checkEmailVerified).
    // This ensures user.emailVerified is always up-to-date in this component.
    const unsubscribe = onIdTokenChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setInitializing(false);
    });
    return unsubscribe; // Clean up on unmount
  }, []);

  // Show a spinner while Firebase resolves the persisted session
  if (initializing) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  /**
   * Route logic:
   *   • Not signed in               → Auth screens (SignUp / Login)
   *   • Signed in but unverified    → Verification screen only
   *   • Signed in & email verified  → Full app
   */
  const getInitialRoute = () => {
    if (!user)                return 'SignUp';
    if (!user.emailVerified)  return 'Verification';
    return 'Welcome';
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={getInitialRoute()}>

          {/* ── Auth screens ──────────────────────────────────────────────── */}
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ title: 'Create Account' }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Sign In' }}
          />
          <Stack.Screen
            name="Verification"
            component={VerificationScreen}
            options={{ title: 'Verify Email', headerBackVisible: false }}
          />

          {/* ── Main app screens ─────────────────────────────────────────── */}
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ItemList"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ItemDetails"
            component={DetailsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ReportItem"
            component={ReportItemScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ReportConfirmation"
            component={ConfirmationScreen}
            options={{ title: 'Done', headerBackVisible: false }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
