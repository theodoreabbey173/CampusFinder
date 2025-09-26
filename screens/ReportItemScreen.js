import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image, // Keep Image component
} from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Import the library

export default function ReportItemScreen({ navigation }) {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [reportType, setReportType] = useState('Found');
  const [imageUri, setImageUri] = useState(null); // State to hold the local image URI

  // Function to handle picking an image from the gallery
  const pickImage = async () => {
    // Request permission to access the media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "You've refused to allow this app to access your photos.");
      return;
    }

    // Launch the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // If the user didn't cancel, set the image URI
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };
  
  const handleSubmit = () => {
    if (!itemName || !description || !location) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    // Now you can handle the imageUri in your submission logic
    console.log({
        reportType,
        itemName,
        description,
        location,
        imageUri // The local file path to the image
    });

    Alert.alert(
      'Success',
      `Your ${reportType.toLowerCase()} item report has been submitted!`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('ItemList')
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Report an Item</Text>
      <Text style={styles.subtitle}>
        Help others by reporting lost or found items on campus
      </Text>

      <View style={styles.typeSelector}>
        <Text style={styles.label}>Report Type</Text>
        <View style={styles.typeButtons}>
          <TouchableOpacity
            style={[styles.typeButton, reportType === 'Lost' && styles.activeTypeButton]}
            onPress={() => setReportType('Lost')}
          >
            <Text style={[styles.typeButtonText, reportType === 'Lost' && styles.activeTypeButtonText]}>
              Lost Item
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, reportType === 'Found' && styles.activeTypeButton]}
            onPress={() => setReportType('Found')}
          >
            <Text style={[styles.typeButtonText, reportType === 'Found' && styles.activeTypeButtonText]}>
              Found Item
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.formSection}>
        <Text style={styles.label}>Item Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Blue Backpack, iPhone, Textbook"
          value={itemName}
          onChangeText={setItemName}
        />

        <Text style={styles.label}>Description *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Provide details about the item (color, brand, distinguishing features, etc.)"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        <Text style={styles.label}>Location *</Text>
        <TextInput
          style={styles.input}
          placeholder="Where was the item lost/found?"
          value={location}
          onChangeText={setLocation}
        />

        {/* --- Start of New Image Upload Section --- */}
        <Text style={styles.label}>Add an Image (Optional)</Text>
        
        {/* If no image is selected, show the upload button */}
        {!imageUri ? (
          <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
            <Text style={styles.imagePickerButtonText}> Select Image from Photos</Text>
          </TouchableOpacity>
        ) : (
          // If an image is selected, show the preview and a remove button
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
            
            <TouchableOpacity style={styles.removeImageButton} onPress={() => setImageUri(null)}>
              <Text style={styles.removeImageButtonText}>Remove Image</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* --- End of New Image Upload Section --- */}

        <View style={styles.noteSection}>
          <Text style={styles.noteTitle}>📝 Important Notes:</Text>
          <Text style={styles.noteText}>• Be as specific as possible with your description</Text>
          <Text style={styles.noteText}>• Include any unique identifying features</Text>
          <Text style={styles.noteText}>• All communication will be handled securely</Text>
          <Text style={styles.noteText}>• False reports may result in account suspension</Text>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Report</Text>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
    paddingHorizontal: 20,
  },
  typeSelector: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  typeButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  activeTypeButton: {
    borderColor: '#2196F3',
    backgroundColor: '#2196F3',
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  activeTypeButtonText: {
    color: '#fff',
  },
  formSection: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 100,
  },
  // --- New Styles for Image Picker ---
  imagePickerButton: {
    backgroundColor: '#f0f8ff',
    borderWidth: 2,
    borderColor: '#2196F3',
    borderStyle: 'dashed',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePickerButtonText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePreviewContainer: {
    marginBottom: 20,
    alignItems: 'center',
    position: 'relative',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f0f0f0',
  },
  removeImageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  removeImageButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  // --- End of New Styles ---
  noteSection: {
    backgroundColor: '#f0f8ff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 30,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  noteText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  submitButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});