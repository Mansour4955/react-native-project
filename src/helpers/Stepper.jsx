import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Example icon import

const Stepper = () => {
  const navigation = useNavigation();
  const { currentStep, complete } = useSelector((state) => state.register);

  useEffect(() => {
    if (currentStep === 2) {
      navigation.navigate('RegisterNeeds');
    } else if (currentStep === 3) {
      navigation.navigate('RegisterDocuments');
    } else if (currentStep === 4) {
      navigation.navigate('RegisterWantedFeature');
    }
    if (complete) {
      navigation.navigate('Login');
    }
  }, [currentStep, complete, navigation]);

  const steps = [
    'User Information',
    'User Needs',
    'Document Upload',
    'Preferred Feature',
  ];

  return (
    <View style={styles.container}>
      <View style={styles.stepsContainer}>
        {steps.map((step, index) => (
          <View key={index} style={styles.stepItem}>
            <View
              style={[
                styles.stepCircle,
                (index + 1 < currentStep || complete) && styles.completeStep,
                currentStep === index + 1 && styles.activeStep,
              ]}
            >
              {index + 1 < currentStep || complete ? (
                <Icon name="check" size={24} color="#fff" />
              ) : (
                <Text style={styles.stepNumber}>{index + 1}</Text>
              )}
            </View>
            <Text
              style={[
                styles.stepText,
                currentStep === index + 1 && styles.activeStepText,
              ]}
            >
              {step}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.24)',
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  stepItem: {
    alignItems: 'center',
    position: 'relative',
  },
  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  completeStep: {
    backgroundColor: '#007bff', // Blue color for completed steps
  },
  activeStep: {
    backgroundColor: '#007bff', // Blue color for active step
  },
  stepNumber: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  stepText: {
    marginTop: 6,
    color: '#6c757d',
    fontSize: 14,
    textAlign: 'center',
  },
  activeStepText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default Stepper;
