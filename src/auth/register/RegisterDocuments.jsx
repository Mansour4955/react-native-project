import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import DocumentPicker from 'react-native-document-picker'; // For document picking
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStep } from '../../redux/registerSlice';

const RegisterDocuments = () => {
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDocumentType, setSelectedDocumentType] = useState('passport');
  const dispatch = useDispatch();
  const { currentStep } = useSelector(state => state.register);

  // Function to handle file selection
  const handleFileChange = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf], // Accept JPEG, PNG, and PDF files
      });

      setSelectedFile({
        name: res.name,
        uri: res.uri,
      });
      setError('');
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
        console.log('Document picker cancelled');
      } else {
        console.error('DocumentPicker error:', err);
      }
    }
  };

  // Function to handle document type selection
  const handleDocumentTypeChange = value => {
    setSelectedDocumentType(value);
  };

  // Function to handle next step
  const handleNext = () => {
    if (!selectedFile) {
      setError('Please upload a valid document (JPEG, PNG, or PDF)');
      return;
    }

    if (
      selectedDocumentType === 'passport' ||
      selectedDocumentType === 'identityCard'
    ) {
      // Additional logic for verifying the authenticity of documents can be implemented here
      dispatch(setCurrentStep(currentStep + 1));
    } else {
      setError('Please select a document type.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Upload document label and input */}
      <Text style={styles.label}>
        Upload Document for Identity Verification
      </Text>
      <TouchableOpacity onPress={handleFileChange} style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>Select Document</Text>
      </TouchableOpacity>
      {selectedFile && <Text style={styles.fileName}>{selectedFile.name}</Text>}

      {/* Error message for file upload */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Select dropdown for document type */}
      <Text style={styles.label}>Choose Document Type</Text>
      <View style={styles.selectContainer}>
        <Button
          title="Passport"
          onPress={() => handleDocumentTypeChange('passport')}
          color={selectedDocumentType === 'passport' ? '#007bff' : '#6c757d'}
        />
        <Button
          title="Identity Card"
          onPress={() => handleDocumentTypeChange('identityCard')}
          color={
            selectedDocumentType === 'identityCard' ? '#007bff' : '#6c757d'
          }
        />
      </View>

      {/* Next button */}
      <View style={styles.buttonContainer}>
        <Button title="Next" onPress={handleNext} color="#007bff" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  uploadButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  uploadButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  fileName: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 10,
  },
  errorText: {
    color: '#ff0000',
    fontSize: 14,
    marginBottom: 10,
  },
  selectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default RegisterDocuments;
