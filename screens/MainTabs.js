import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, MessageCircle, User } from 'lucide-react-native';

import ListScreen   from './ListScreen';
import InboxScreen  from './InboxScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Browse: Home,
  Chats:  MessageCircle,
  You:    User,
};

function TabIcon({ routeName, focused }) {
  const Icon = TAB_ICONS[routeName];
  return (
    <Icon
      size={22}
      color={focused ? '#1a237e' : '#9aa0b4'}
      strokeWidth={focused ? 2.4 : 2}
    />
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#1a237e',
        tabBarInactiveTintColor: '#9aa0b4',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIcon: ({ focused }) => <TabIcon routeName={route.name} focused={focused} />,
      })}
    >
      <Tab.Screen name="Browse" component={ListScreen} />
      <Tab.Screen name="Chats" component={InboxScreen} />
      <Tab.Screen name="You" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: Platform.OS === 'ios' ? 84 : 66,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 28 : 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 10,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '700',
  },
});
