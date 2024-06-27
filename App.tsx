// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { Provider } from 'react-redux';
// import store from './redux/store';
// import HomePage from './pages/HomePage';
// import Login from './auth/Login';
// import Register from './auth/register/Register';
// import RegisterInfo from './auth/register/RegisterInfo';
// import RegisterNeeds from './auth/register/RegisterNeeds';
// import RegisterDocuments from './auth/register/RegisterDocuments';
// import RegisterWantedFeature from './auth/register/RegisterWantedFeature';
// import NotFound from './pages/NotFound';

// const Stack = createNativeStackNavigator();

// function App() {
//   return (
//     <SafeAreaProvider>
//       <Provider store={store}>
//         <NavigationContainer>
//           <Stack.Navigator initialRouteName="Home">
//             <Stack.Screen name="Home" component={HomePage} />
//             <Stack.Screen name="Login" component={Login} />
//             <Stack.Screen name="Register" component={Register} />
//             <Stack.Screen name="RegisterInfo" component={RegisterInfo} />
//             <Stack.Screen name="RegisterNeeds" component={RegisterNeeds} />
//             <Stack.Screen name="RegisterDocuments" component={RegisterDocuments} />
//             <Stack.Screen name="RegisterWantedFeature" component={RegisterWantedFeature} />
//             <Stack.Screen name="NotFound" component={NotFound} />
//           </Stack.Navigator>
//         </NavigationContainer>
//       </Provider>
//     </SafeAreaProvider>
//   );
// }

// export default App;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <Text>HomePage</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
