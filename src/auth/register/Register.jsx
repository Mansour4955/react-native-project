import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Stepper from '../../helpers/Stepper';
import RegisterInfo from './RegisterInfo';
import RegisterNeeds from './RegisterNeeds';
import RegisterDocuments from './RegisterDocuments';
import RegisterWantedFeature from './RegisterWantedFeature';

const Register = () => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* <Stepper /> */}
         {/* Assuming Stepper manages the step navigation */}
        {/* Replace this with specific screens or components */}
        {/* based on your navigation structure in React Native */}
        <View style={styles.outletContainer}>
          <RegisterInfo />
          {/* <RegisterNeeds />
          <RegisterDocuments />
          <RegisterWantedFeature /> */}
         {/* <Text> register register</Text> */}
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
