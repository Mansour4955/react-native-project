import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const Stepper = () => {
  const navigation = useNavigation();
  const {currentStep, complete} = useSelector(state => state.register);

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
                index + 1 < currentStep && styles.completeStep,
                (currentStep === index + 1 || complete) && styles.activeStep,
              ]}>
              {index + 1 < currentStep || (complete && index + 1 <= 4) ? (
                <Text style={styles.iconText}>✔️</Text>
              ) : (
                <Text style={styles.stepNumber}>{index + 1}</Text>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  stepItem: {
    alignItems: 'center',
    position: 'relative',
  },
  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ddd', // Default color for incomplete steps
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
  iconText: {
    color: 'white', // White color
    fontSize: 20, // Smaller size
  },
});

export default Stepper;
