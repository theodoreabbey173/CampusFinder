import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ListScreen    from './ListScreen';
import ActivityScreen from './ActivityScreen';
import InboxScreen    from './InboxScreen';
import ProfileScreen  from './ProfileScreen';

const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Browse:   '🏠',
  Activity: '✨',
  Chats:    '💬',
  You:      '👤',
};

function EmptyRoute() {
  return null;
}

function TabIcon({ routeName, focused }) {
  return (
    <Text style={[styles.tabIcon, focused && styles.tabIconActive]}>
      {TAB_ICONS[routeName]}
    </Text>
  );
}

function ReportTabButton({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.reportButtonWrap}
      activeOpacity={0.85}
    >
      <View style={styles.reportButton}>
        <Text style={styles.reportButtonText}>＋</Text>
      </View>
    </TouchableOpacity>
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
      <Tab.Screen name="Activity" component={ActivityScreen} />
      <Tab.Screen
        name="Report"
        component={EmptyRoute}
        options={{
          tabBarButton: (props) => <ReportTabButton onPress={props.onPress} />,
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('ReportItem');
          },
        })}
      />
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
  tabIcon: {
    fontSize: 20,
    opacity: 0.5,
  },
  tabIconActive: {
    opacity: 1,
  },

  // Center floating "Report" button
  reportButtonWrap: {
    top: -22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#1a237e',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1a237e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  reportButtonText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 28,
  },
});
