import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import HomePage from './src/pages/HomePage';
import Login from './src/auth/Login';
import Register from './src/auth/register/Register';
import RegisterInfo from './src/auth/register/RegisterInfo';
import RegisterNeeds from './src/auth/register/RegisterNeeds';
import RegisterDocuments from './src/auth/register/RegisterDocuments';
import RegisterWantedFeature from './src/auth/register/RegisterWantedFeature';
import NotFound from './src/pages/NotFound';
import Header from './src/components/Header';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          {/* <View style={styles.container}>
            <Text>HomePage aaaaaaaa</Text>
          </View> */}
          {/* <Header/> */}
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="RegisterInfo" component={RegisterInfo} />
            <Stack.Screen name="RegisterNeeds" component={RegisterNeeds} />
            <Stack.Screen name="RegisterDocuments" component={RegisterDocuments} />
            <Stack.Screen name="RegisterWantedFeature" component={RegisterWantedFeature} />
            <Stack.Screen name="NotFound" component={NotFound} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default App;
