import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form'; // For form handling
import emailjs from 'emailjs-com';
import Toast from 'react-native-toast-message'; // For toast messages (Cross-platform)
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStep } from '../../redux/registerSlice';

const RegisterInfo = () => {
  const dispatch = useDispatch();
  const { currentStep } = useSelector(state => state.register);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [expectedCode, setExpectedCode] = useState(null);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [formData, setFormData] = useState(null);
  const [resendClicked, setResendClicked] = useState(false); // State to manage resend button click

  const onSubmit = data => {
    if (validateFormData(data)) {
      setFormData(data);
      sendVerificationCode(data.email);
    }
  };

  const validateFormData = data => {
    return (
      data.email &&
      data.firstName &&
      data.lastName &&
      data.birthDate &&
      data.gender
    );
  };

  const sendVerificationCode = email => {
    const newVerificationCode = Math.floor(100000 + Math.random() * 900000);
    setExpectedCode(newVerificationCode);

    // Prepare email parameters
    const templateParams = {
      to_email: email,
      to_name: `${formData?.firstName} ${formData?.lastName}`,
      from_name: 'Website Name',
      message: newVerificationCode.toString(),
    };

    // EmailJS configuration
    const serviceId = 'your_service_id'; // Replace with your EmailJS service ID
    const templateId = 'your_template_id'; // Replace with your EmailJS template ID
    const userId = 'your_user_id'; // Replace with your EmailJS user ID

    // Send email using EmailJS
    emailjs
      .send(serviceId, templateId, templateParams, userId)
      .then(response => {
        console.log('Email sent:', response.status, response.text);
        setShowVerification(true); // Show verification input after email is sent
        setResendClicked(false); // Reset resend button state
        Toast.show({
          type: 'success',
          text1: 'Verification code sent successfully!',
        });
      })
      .catch(error => {
        console.error('Email sending failed:', error);
        Toast.show({
          type: 'error',
          text1: 'Failed to send verification code. Please try again.',
        });
      });
  };

  const handleVerificationSubmit = () => {
    if (verificationCode === expectedCode.toString()) {
      console.log('Verification successful');
      Toast.show({
        type: 'success',
        text1: 'Verification successful!',
      });
      dispatch(setCurrentStep(currentStep + 1));
      setVerificationCode(''); // Clear previous verification code input
    } else {
      Toast.show({
        type: 'error',
        text1: 'Incorrect verification code. Please try again.',
      });
      setVerificationCode(''); // Clear previous verification code input
      setResendClicked(true); // Set resend button clicked state
    }
  };

  const handleResendVerification = () => {
    sendVerificationCode(formData.email); // Resend verification code
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
        rules={{ required: 'Email is required', pattern: /^\S+@\S+$/i }}
        defaultValue=""
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}

      <Text style={styles.label}>First Name</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="First Name"
            onChangeText={onChange}
            value={value}
          />
        )}
        name="firstName"
        rules={{ required: 'First Name is required' }}
        defaultValue=""
      />
      {errors.firstName && (
        <Text style={styles.errorText}>{errors.firstName.message}</Text>
      )}

      <Text style={styles.label}>Last Name</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            onChangeText={onChange}
            value={value}
          />
        )}
        name="lastName"
        rules={{ required: 'Last Name is required' }}
        defaultValue=""
      />
      {errors.lastName && (
        <Text style={styles.errorText}>{errors.lastName.message}</Text>
      )}

      <Text style={styles.label}>Birth Date</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            onChangeText={onChange}
            value={value}
          />
        )}
        name="birthDate"
        rules={{ required: 'Birth Date is required' }}
        defaultValue=""
      />
      {errors.birthDate && (
        <Text style={styles.errorText}>{errors.birthDate.message}</Text>
      )}

      <Text style={styles.label}>Gender</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Gender"
            onChangeText={onChange}
            value={value}
          />
        )}
        name="gender"
        rules={{ required: 'Gender is required' }}
        defaultValue=""
      />
      {errors.gender && (
        <Text style={styles.errorText}>{errors.gender.message}</Text>
      )}

      <Button onPress={handleSubmit(onSubmit)} title="Next" color="#007bff" />

      {showVerification && (
        <View style={styles.verificationContainer}>
          <Text style={styles.label}>
            Enter Verification Code (sent to {formData?.email})
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Verification Code"
            onChangeText={value => setVerificationCode(value.slice(0, 6))}
            value={verificationCode}
          />
          <View style={styles.buttonContainer}>
            <Button
              onPress={handleVerificationSubmit}
              title="Verify"
              color="#007bff"
            />
            {resendClicked && (
              <Button
                onPress={handleResendVerification}
                title="Resend Verification Code"
                color="#007bff"
              />
            )}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  verificationContainer: {
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default RegisterInfo;
