import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';

export default function DetailsScreen({ navigation, route }) {
  const { item } = route.params;

  const handleStartChat = () => {
    navigation.navigate('Chat', { item });
  };

  // Extended dummy data for item details
  const itemDetails = {
    ...item,
    description: item.type === 'Lost' 
      ? 'I lost this item and would really appreciate if someone found it. It has sentimental value to me.'
      : 'Found this item and looking for the owner. Please provide details to verify ownership.',
    contactInfo: 'Available through secure chat',
    reporter: item.type === 'Lost' ? 'Sarah Johnson' : 'Mike Chen',
    studentId: item.type === 'Lost' ? 'Class of 2024' : 'Class of 2023',
  };

  // DIFFERENT WAYS TO HANDLE IMAGES FOR EACH SPECIFIC ITEM:
  const getImageSource = () => {
    // METHOD 1: Using the image from the item data (passed from ItemListScreen)
    if (item.image) {
      // If it's a require() statement (local image)
      if (typeof item.image === 'number') {
        return item.image;
      }
      // If it's a URL string
      if (typeof item.image === 'string') {
        return { uri: item.image };
      }
    }

    // METHOD 2: Individual images for each specific item using item ID
    switch(item.id) {
      case '1': // Blue Backpack (Found)
       // return require('../assets/images/blue-backpack.jpg');
        // Or: return { uri: 'https://yourdomain.com/images/blue-backpack.jpg' };
        
      case '2': // iPhone 14 Pro (Lost)
        //return require('../assets/images/iphone-14-pro.jpg');
        // Or: return { uri: 'https://yourdomain.com/images/iphone-14-pro.jpg' };
        
      case '3': // Chemistry Textbook (Found)
        //return require('../assets/images/chemistry-textbook.jpg');
        // Or: return { uri: 'https://yourdomain.com/images/chemistry-textbook.jpg' };
        
      case '4': // Black Wallet (Lost)
        //return require('../assets/images/black-wallet.jpg');
        // Or: return { uri: 'https://yourdomain.com/images/black-wallet.jpg' };
        
      case '5': // Red Water Bottle (Found)
        //return require('../assets/images/red-water-bottle.jpg');
        // Or: return { uri: 'https://yourdomain.com/images/red-water-bottle.jpg' };
        
      default:
        // Fallback image for any new items
        return { uri: 'https://via.placeholder.com/250x200/CCCCCC/FFFFFF?text=No+Image' };
    }

    // METHOD 3: Different images based on item type (Lost vs Found)
    /*
    if (item.type === 'Lost') {
      // Use a "missing" style image for lost items
      return require('../assets/images/lost-item-placeholder.jpg');
    } else {
      // Use a "found" style image for found items  
      return require('../assets/images/found-item-placeholder.jpg');
    }
    */

    // METHOD 4: Images based on item name/category
    /*
    if (item.name.toLowerCase().includes('backpack')) {
      return require('../assets/images/backpack-category.jpg');
    } else if (item.name.toLowerCase().includes('phone') || item.name.toLowerCase().includes('iphone')) {
      return require('../assets/images/phone-category.jpg');
    } else if (item.name.toLowerCase().includes('book') || item.name.toLowerCase().includes('textbook')) {
      return require('../assets/images/book-category.jpg');
    } else if (item.name.toLowerCase().includes('wallet')) {
      return require('../assets/images/wallet-category.jpg');
    } else if (item.name.toLowerCase().includes('bottle')) {
      return require('../assets/images/bottle-category.jpg');
    }
    return require('../assets/images/default-item.jpg');
    */
  };

  return (
    <ScrollView style={styles.container}>
      {/* Item Image */}
      <View style={styles.imageContainer}>
        <Image
          source={getImageSource()}
          style={styles.itemImage}
          resizeMode="cover"
          onError={() => console.log('Image failed to load')}
        />
        {/* Optional: Add a small indicator if it's a Lost vs Found item */}
        <View style={[
          styles.imageTypeIndicator,
          { backgroundColor: itemDetails.type === 'Lost' ? '#FF5722' : '#4CAF50' }
        ]}>
          <Text style={styles.imageTypeText}>{itemDetails.type}</Text>
        </View>
      </View>

      <View style={styles.header}>
        <Text style={styles.itemName}>{itemDetails.name}</Text>
        <View style={[
          styles.typeTag,
          { backgroundColor: itemDetails.type === 'Lost' ? '#FF5722' : '#4CAF50' }
        ]}>
          <Text style={styles.typeText}>{itemDetails.type}</Text>
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Details</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.value}>📍 {itemDetails.location}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.value}>🕒 {itemDetails.date}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Reported by:</Text>
          <Text style={styles.value}>👤 {itemDetails.reporter}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Student:</Text>
          <Text style={styles.value}>🎓 {itemDetails.studentId}</Text>
        </View>
      </View>

      <View style={styles.descriptionSection}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{itemDetails.description}</Text>
      </View>

      <View style={styles.contactSection}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <Text style={styles.contactInfo}>
          For privacy and security, all communication happens through our secure chat system.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.chatButton} onPress={handleStartChat}>
          <Text style={styles.chatButtonText}>💬 Start Chat</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 20,
    position: 'relative',
  },
  itemImage: {
    width: 250,
    height: 200,
    borderRadius: 12,
    backgroundColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  imageTypeIndicator: {
    position: 'absolute',
    top: 30,
    right: 30,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  imageTypeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  typeTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  typeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    width: 100,
  },
  value: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  descriptionSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  contactSection: {
    padding: 20,
  },
  contactInfo: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    fontStyle: 'italic',
  },
  buttonContainer: {
    padding: 20,
    paddingTop: 10,
  },
  chatButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  chatButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});