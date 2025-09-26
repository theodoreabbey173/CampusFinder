import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignUpScreen from './screens/SignUpScreen';
import VerificationScreen from './screens/VerificationScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import ListScreen from './screens/ListScreen';
import DetailsScreen from './screens/DetailsScreen';
import ReportItemScreen from './screens/ReportItemScreen';
import ChatScreen from './screens/ChatScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="ItemList" component={ListScreen} />
        <Stack.Screen name="ItemDetails" component={DetailsScreen} />
        <Stack.Screen name="ReportItem" component={ReportItemScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="ReportConfirmation" component={ConfirmationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
