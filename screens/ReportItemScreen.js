import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { ChevronLeft, Camera, Image as ImageIcon, X, FileText } from 'lucide-react-native';
import { auth } from '../firebaseConfig';
import { createItem } from '../backend/itemsService';
import { uploadImage } from '../backend/storageService';

export default function ReportItemScreen({ navigation }) {
  const [itemName,    setItemName]    = useState('');
  const [description, setDescription] = useState('');
  const [location,    setLocation]    = useState('');
  const [reportType,  setReportType]  = useState('Found');
  const [imageUri,    setImageUri]    = useState(null);
  const [submitting,  setSubmitting]  = useState(false);

  // ── Image picker — Gallery ────────────────────────────────────────────────

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        'Permission Required',
        "Please allow access to your photos so you can attach an image.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // ── Image picker — Camera ─────────────────────────────────────────────────

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        'Camera Permission Required',
        "Please allow access to your camera so you can take a photo.",
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // ── Submit ────────────────────────────────────────────────────────────────────

  const handleSubmit = async () => {
    if (!itemName || !description || !location) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Error', 'You must be signed in to report an item.');
      return;
    }

    setSubmitting(true);
    try {
      // 1. Upload image to Firebase Storage (if one was selected)
      let imageUrl = null;
      if (imageUri) {
        imageUrl = await uploadImage(imageUri);
      }

      // 2. Save item document to Firestore `items` collection
      await createItem({
        name:         itemName,
        description,
        location,
        type:         reportType,
        imageUrl,
        reportedBy:   user.uid,
        reporterName: user.displayName ?? 'Anonymous',
      });

      Alert.alert(
        'Report Submitted!',
        `Your ${reportType.toLowerCase()} item report has been saved.`,
        [{ text: 'OK', onPress: () => navigation.navigate('ItemList') }],
      );
    } catch (error) {
      console.error('Submit error:', error);
      Alert.alert('Error', 'Failed to submit the report. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.canGoBack() && navigation.goBack()}
          activeOpacity={0.7}
        >
          <ChevronLeft size={22} color="#1a1a2e" strokeWidth={2.4} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report an Item</Text>
      </View>

      <ScrollView style={styles.scrollArea}>
      <Text style={styles.subtitle}>
        Help others by reporting lost or found items on campus
      </Text>

      {/* Report type toggle */}
      <View style={styles.typeSelector}>
        <Text style={styles.label}>Report Type</Text>
        <View style={styles.typeButtons}>
          {['Lost', 'Found'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.typeButton, reportType === type && styles.activeTypeButton]}
              onPress={() => setReportType(type)}
              disabled={submitting}
            >
              <Text style={[styles.typeButtonText, reportType === type && styles.activeTypeButtonText]}>
                {type} Item
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.formSection}>
        <Text style={styles.label}>Item Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Blue Backpack, iPhone, Textbook"
          value={itemName}
          onChangeText={setItemName}
          editable={!submitting}
        />

        <Text style={styles.label}>Description *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Provide details (colour, brand, distinguishing features…)"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          editable={!submitting}
        />

        <Text style={styles.label}>Location *</Text>
        <TextInput
          style={styles.input}
          placeholder="Where was the item lost / found?"
          value={location}
          onChangeText={setLocation}
          editable={!submitting}
        />

        {/* Image picker */}
        <Text style={styles.label}>Add an Image (Optional)</Text>
        {!imageUri ? (
          <View style={styles.imageButtonRow}>
            {/* Take photo with camera */}
            <TouchableOpacity
              style={[styles.imageOptionButton, styles.cameraButton]}
              onPress={takePhoto}
              disabled={submitting}
            >
              <Camera size={28} color="#FF9800" strokeWidth={2} style={styles.imageOptionIcon} />
              <Text style={styles.imageOptionTitle}>Take Photo</Text>
              <Text style={styles.imageOptionSub}>Use camera</Text>
            </TouchableOpacity>

            {/* Choose from gallery */}
            <TouchableOpacity
              style={[styles.imageOptionButton, styles.galleryButton]}
              onPress={pickImage}
              disabled={submitting}
            >
              <ImageIcon size={28} color="#2196F3" strokeWidth={2} style={styles.imageOptionIcon} />
              <Text style={styles.imageOptionTitle}>Choose Photo</Text>
              <Text style={styles.imageOptionSub}>From gallery</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
            {/* Overlay action buttons on the preview */}
            <View style={styles.imageActions}>
              <TouchableOpacity
                style={[styles.imageActionBtn, { backgroundColor: 'rgba(33,150,243,0.85)' }]}
                onPress={takePhoto}
                disabled={submitting}
              >
                <Camera size={13} color="#fff" strokeWidth={2.4} />
                <Text style={styles.imageActionText}>Retake</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.imageActionBtn, { backgroundColor: 'rgba(0,0,0,0.55)' }]}
                onPress={pickImage}
                disabled={submitting}
              >
                <ImageIcon size={13} color="#fff" strokeWidth={2.4} />
                <Text style={styles.imageActionText}>Change</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.imageActionBtn, { backgroundColor: 'rgba(229,57,53,0.85)' }]}
                onPress={() => setImageUri(null)}
                disabled={submitting}
              >
                <X size={13} color="#fff" strokeWidth={2.6} />
                <Text style={styles.imageActionText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Notes */}
        <View style={styles.noteSection}>
          <View style={styles.noteTitleRow}>
            <FileText size={16} color="#333" strokeWidth={2.2} />
            <Text style={styles.noteTitle}>Important Notes:</Text>
          </View>
          <Text style={styles.noteText}>• Be as specific as possible with your description</Text>
          <Text style={styles.noteText}>• Include any unique identifying features</Text>
          <Text style={styles.noteText}>• All communication will be handled securely</Text>
          <Text style={styles.noteText}>• False reports may result in account suspension</Text>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <View style={styles.submitLoading}>
              <ActivityIndicator color="#fff" style={{ marginRight: 10 }} />
              <Text style={styles.submitButtonText}>
                {imageUri ? 'Uploading image…' : 'Saving report…'}
              </Text>
            </View>
          ) : (
            <Text style={styles.submitButtonText}>Submit Report</Text>
          )}
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // ── Header ─────────────────────────────────────────────────────────────────
  header: {
    flexDirection:   'row',
    alignItems:      'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical:   14,
  },
  backButton: {
    width:           34,
    height:          34,
    borderRadius:    17,
    backgroundColor: '#F0F1F6',
    justifyContent:  'center',
    alignItems:      'center',
    marginRight:      12,
  },
  headerTitle: {
    fontSize:   22,
    fontWeight: '800',
    color:      '#101014',
  },
  scrollArea: {
    flex: 1,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
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
    borderRadius: 40,
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
  // ── Image option buttons (camera / gallery) ───────────────────────────────
  imageButtonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  imageOptionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  cameraButton: {
    backgroundColor: '#FFF8F0',
    borderColor: '#FF9800',
  },
  galleryButton: {
    backgroundColor: '#F0F6FF',
    borderColor: '#2196F3',
  },
  imageOptionIcon: {
    marginBottom: 6,
  },
  imageOptionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },
  imageOptionSub: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },

  // ── Image preview ─────────────────────────────────────────────────────────
  imagePreviewContainer: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  imagePreview: {
    width: '100%',
    height: 210,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f0f0f0',
  },
  imageActions: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  imageActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  imageActionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  noteSection: {
    backgroundColor: '#f0f8ff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 30,
  },
  noteTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  noteText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  submitButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 40,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitLoading: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
