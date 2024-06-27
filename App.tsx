import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';

import store from './src/redux/store';
import HomePage from './src/pages/HomePage';
import Login from './src/auth/Login';
import Register from './src/auth/register/Register';
import NotFound from './src/pages/NotFound';
import Header from './src/components/Header';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Header />
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="NotFound" component={NotFound} />
          </Stack.Navigator>
          <Toast />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
