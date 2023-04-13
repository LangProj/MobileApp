import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



import LoadingScreen from './views/loading'; 
import GuestScreen from './views/guest'; 
import SignUpScreen from './views/registration'; 
import LogInScreen from './views/login'; 
import CodeConfirmationScreen from './views/codeConfimation'; 
import PasswordChangeRequestScreen from './views/passChangeRequest'; 
import PasswordChangeScreen from './views/passChange'; 


import { Provider } from 'react-redux';
import store from './store/store.js';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>        
        <Stack.Navigator>       
          <Stack.Screen  name="Guest" component={GuestScreen} options={{headerShown:false}}/>

          <Stack.Screen  name="SignUp" component={SignUpScreen} options={{headerShown:false}}/>
          <Stack.Screen  name="CodeConfirmation" component={CodeConfirmationScreen} options={{headerShown:false}}/>

          <Stack.Screen  name="Login" component={LogInScreen} options={{headerShown:false}}/>

          <Stack.Screen  name="PasswordChangeRequest" component={PasswordChangeRequestScreen} options={{headerShown:false}}/>
          <Stack.Screen  name="PasswordChange" component={PasswordChangeScreen} options={{headerShown:false}}/>
        </Stack.Navigator>        
      </NavigationContainer>
    </Provider>

 
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
