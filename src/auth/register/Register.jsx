import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Stepper from '../../helpers/Stepper';
import RegisterInfo from './RegisterInfo';
import RegisterNeeds from './RegisterNeeds';
import RegisterDocuments from './RegisterDocuments';
import RegisterWantedFeature from './RegisterWantedFeature';
import {useSelector} from 'react-redux';

const Register = () => {
  const {currentStep} = useSelector(state => state.register);
  const [theStep, setTheStep] = useState(currentStep);
  useEffect(() => {
    setTheStep(currentStep);
  }, [currentStep]);
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Assuming Stepper manages the step navigation */}
        <Stepper />
        {/* Assuming Stepper manages the step navigation */}
        {/* Replace this with specific screens or components */}
        {/* based on your navigation structure in React Native */}
        <View style={styles.outletContainer}>
          {theStep === 1 && <RegisterInfo />}
          {theStep === 2 && <RegisterNeeds />}
          {theStep === 3 && <RegisterDocuments />}
          {theStep === 4 && <RegisterWantedFeature />}
        </View>
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
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outletContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Register;
