import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '', // Clear any previous error for the field
    });
  };

  const handleSubmit = () => {
    const { email, password } = formData;

    // Simple form validation
    if (!email.trim()) {
      setErrors({ ...errors, email: 'Email is required' });
      return;
    }

    if (!password.trim()) {
      setErrors({ ...errors, password: 'Password is required' });
      return;
    }

    if (password.length < 8) {
      setErrors({
        ...errors,
        password: 'Password must be at least 8 characters',
      });
      return;
    }

    // If validations pass, you can proceed with authentication logic
    console.log('Form data:', formData);
    // Example: Call an API to authenticate the user

    // Simulate a successful login with toast message
    Toast.show({
      type: 'success',
      text1: 'Logged in successfully!',
      visibilityTime: 2000,
      autoHide: true,
    });

    // Reset form after successful submission if needed
    setFormData({
      email: '',
      password: '',
    });
    setErrors({
      email: '',
      password: '',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={[styles.input, errors.email && styles.errorInput]}
          placeholder="Enter your email"
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email}</Text>
        )}
        <TextInput
          style={[styles.input, errors.password && styles.errorInput]}
          placeholder="Enter your password"
          secureTextEntry
          value={formData.password}
          onChangeText={(text) => handleInputChange('password', text)}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
        <Button
          title="Login"
          onPress={handleSubmit}
          style={styles.loginButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  formContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
  loginButton: {
    marginTop: 20,
  },
});

export default Login;
