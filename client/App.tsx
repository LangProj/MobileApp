import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



import LoadingScreen from './pages/loading'; 
import GuestScreen from './pages/guest'; 
import SignUpScreen from './pages/registration'; 
import LogInScreen from './pages/login'; 
import CodeConfirmationScreen from './pages/codeConfimation'; 
import PasswordChangeRequestScreen from './pages/passChangeRequest'; 
import PasswordChangeScreen from './pages/passChange'; 




const Stack = createNativeStackNavigator();

export default function App() {
  return (
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
