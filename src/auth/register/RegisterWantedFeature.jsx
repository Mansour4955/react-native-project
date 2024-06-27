import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ToastAndroid, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStep, setComplete } from '../../redux/registerSlice';

const RegisterWantedFeature = () => {
  const dispatch = useDispatch();
  const { currentStep } = useSelector(state => state.register);

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
    feature: '',
  });

  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: '',
    feature: '',
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const onSubmit = () => {
    // Validate password
    if (!formData.password) {
      setErrors({ ...errors, password: 'Password is required' });
      return;
    } else if (formData.password.length < 8) {
      setErrors({
        ...errors,
        password: 'Password must be at least 8 characters',
      });
      return;
    }

    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      setErrors({ ...errors, confirmPassword: 'Passwords do not match' });
      return;
    }

    // Validate feature selection
    if (!formData.feature) {
      setErrors({ ...errors, feature: 'Please select a feature' });
      return;
    }

    // All validations passed
    ToastAndroid.show('Registered successfully', ToastAndroid.LONG);
    dispatch(setCurrentStep(currentStep + 1));
    dispatch(setComplete(true));
  };

  const featureOptions = [
    'Cloud Storage',
    'Advanced Analytics',
    'Customer Support',
    'Mobile App',
    'Data Security',
    'Integration with APIs',
    'Real-time Notifications',
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Register with Wanted Feature</Text>

      {/* Password field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={[styles.input, errors.password && styles.inputError]}
          secureTextEntry
          placeholder="Enter your password"
          value={formData.password}
          onChangeText={text => handleInputChange('password', text)}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
      </View>

      {/* Confirm password field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={[styles.input, errors.confirmPassword && styles.inputError]}
          secureTextEntry
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChangeText={text => handleInputChange('confirmPassword', text)}
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        )}
      </View>

      {/* Feature selection */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Select a Feature</Text>
        {featureOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.featureButton,
              formData.feature === option && styles.featureButtonSelected
            ]}
            onPress={() => handleInputChange('feature', option)}
          >
            <Text style={[
              styles.featureButtonText,
              formData.feature === option && styles.featureButtonTextSelected
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
        {errors.feature && (
          <Text style={styles.errorText}>{errors.feature}</Text>
        )}
      </View>

      {/* Submit button */}
      <View style={styles.buttonContainer}>
        <Button title="Register" onPress={onSubmit} color="#007bff" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 5,
  },
  inputError: {
    borderColor: '#dc3545',
  },
  radioContainer: {
    marginBottom: 5,
  },
  errorText: {
    color: '#dc3545',
    fontSize: 12,
  },
  featureButton: {
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#6c757d',
    marginBottom: 5,
  },
  featureButtonSelected: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  featureButtonText: {
    fontSize: 16,
    color: '#6c757d',
  },
  featureButtonTextSelected: {
    color: '#ffffff',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default RegisterWantedFeature;
