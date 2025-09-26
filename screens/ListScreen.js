import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

// Dummy data for lost & found items
const DUMMY_ITEMS = [
  {
    id: '1',
    name: 'Blue Backpack',
    location: 'Library 3rd Floor',
    type: 'Found',
    date: '2 hours ago',
    image: 'https://skybags.co.in/cdn/shop/files/BPSQPR04SBL.png?v=1698144146', // Replace with your image
  },
  {
    id: '2',
    name: 'iPhone 14 Pro',
    location: 'Student Center',
    type: 'Lost',
    date: '5 hours ago',
    image: 'https://assets-prd.ignimgs.com/2022/10/13/iphone-14-pro-3-1665638231796.jpg', // Replace with your image
  },
  {
    id: '3',
    name: 'Textbook: Chemistry 101',
    location: 'Science Building',
    type: 'Found',
    date: '1 day ago',
    image: 'https://i2.wp.com/www.4onemore.com/wp-content/uploads/IMG_20210218_140140457-scaled.jpg?fit=775%2C581&ssl=1', // Replace with your image
  },
  {
    id: '4',
    name: 'Black Wallet',
    location: 'Gym Locker Room',
    type: 'Lost',
    date: '2 days ago',
    image: 'https://m.media-amazon.com/images/I/61ZpSoxVNUL.jpg', // Replace with your image
  },
  {
    id: '5',
    name: 'Red Water Bottle',
    location: 'Cafeteria',
    type: 'Found',
    date: '3 days ago',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSUfWVE5ar2G1-gjUCIwmU0Lk-vL2IgLISxQ&s', // Replace with your image
  },
  {
  id: '6',
    name: 'Dark Blue Cap',
    location: 'Computer Science Lab',
    type: 'Lost',
    date: '8 days ago',
    image: 'https://thumbs.dreamstime.com/b/print-demand-sellers-dad-cap-mockup-navy-blue-baseball-hat-mockup-hand-holding-dad-hat-mockup-baseball-field-314672729.jpg', // Replace with your image
  },
];

export default function ListScreen({ navigation }) {
  const handleItemPress = (item) => {
    navigation.navigate('ItemDetails', { item });
  };

  const handleReportItem = () => {
    navigation.navigate('ReportItem');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemCard}
      onPress={() => handleItemPress(item)}
    >
      <View style={styles.itemContent}>
        <Image
          source={{ uri: item.image }}
          style={styles.itemImage}
          resizeMode="cover"
        />
        <View style={styles.itemInfo}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
            <View style={[
              styles.typeTag,
              { backgroundColor: item.type === 'Lost' ? '#FF5722' : '#4CAF50' }
            ]}>
              <Text style={styles.typeText}>{item.type}</Text>
            </View>
          </View>
          <Text style={styles.itemLocation}>📍 {item.location}</Text>
          <Text style={styles.itemDate}>🕒 {item.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lost & Found Items</Text>
        <TouchableOpacity style={styles.reportButton} onPress={handleReportItem}>
          <Text style={styles.reportButtonText}>+ Report Item</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={DUMMY_ITEMS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  reportButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  reportButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  listContainer: {
    padding: 20,
    paddingTop: 10,
  },
  itemCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: '#e0e0e0',
  },
  itemInfo: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  typeTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  itemLocation: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  itemDate: {
    fontSize: 14,
    color: '#999',
  },
});