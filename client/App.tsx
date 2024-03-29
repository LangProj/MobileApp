import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';






import LoadingScreen from './views/loginViews/loading'
import GuestScreen from './views/loginViews/guest'; 
import SignUpScreen from './views/loginViews/registration'; 
import LogInScreen from './views/loginViews/login'; 
import CodeConfirmationScreen from './views/loginViews/codeConfimation'; 
import PasswordChangeRequestScreen from './views/loginViews/passChangeRequest'; 
import PasswordChangeScreen from './views/loginViews/passChange'; 


import PhotoScreen from './views/profileCreationViews/photo';
import LoginConfirmationScreen from './views/profileCreationViews/loginConfirmation';
import MotherTongueScreen from './views/profileCreationViews/motherTongue';
import WordsPerDayScreen from './views/profileCreationViews/wordsPerDay';
import LanguageLevelScreen from './views/profileCreationViews/languageLevel';
import ProfileCreationScreen from './views/profileCreationViews/profileCreation';


import CardScreen from './views/mainMenuViews/cardMenu/cardMenu';
import MainStatsMenuScreen from './views/mainMenuViews/mainStatsMenu';

import { Provider } from 'react-redux';
import store from './store/store.js';
import WordListScreen from './views/mainMenuViews/wordList';
import WordTranslationScreen from './views/mainMenuViews/wordTranslation';
import PreSentenceTranslationScreen from './views/mainMenuViews/preSentenceTranslation';
import SentenceTranslationScreen from './views/mainMenuViews/sentenceTranslation';
import PassiveRecord from './views/mainMenuViews/passiveRecord';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>

      <NavigationContainer>        
        <Stack.Navigator>       
          <Stack.Screen  name="Loading" component={LoadingScreen} options={{headerShown:false, animation: 'none'}}/>
          <Stack.Screen  name="Guest" component={GuestScreen} options={{headerShown:false, animation: 'none'}}/>

          <Stack.Screen  name="SignUp" component={SignUpScreen} options={{headerShown:false, animation: 'none'}}/>
          <Stack.Screen  name="CodeConfirmation" component={CodeConfirmationScreen} options={{headerShown:false, animation: 'none'}}/>

          <Stack.Screen  name="Login" component={LogInScreen} options={{headerShown:false, animation: 'none'}}/>

          <Stack.Screen  name="PasswordChangeRequest" component={PasswordChangeRequestScreen} options={{headerShown:false, animation: 'none'}}/>
          <Stack.Screen  name="PasswordChange" component={PasswordChangeScreen} options={{headerShown:false, animation: 'none'}}/>

          <Stack.Screen  name="MotherTongue" component={MotherTongueScreen} options={{headerShown:false, animation: 'none'}}/>
          <Stack.Screen  name="LoginConfirmation" component={LoginConfirmationScreen} options={{headerShown:false, animation: 'none'}}/>
          <Stack.Screen  name="Photo" component={PhotoScreen} options={{headerShown:false, animation: 'none'}}/>
          <Stack.Screen  name="WordsPerDay" component={WordsPerDayScreen} options={{headerShown:false, animation: 'none'}}/>
          <Stack.Screen  name="LanguageLevel" component={LanguageLevelScreen} options={{headerShown:false, animation: 'none'}}/>       
          <Stack.Screen  name="MainScreen" component={MainStatsMenuScreen} options={{headerShown:false, animation: 'none'}}/>       
          <Stack.Screen  name="PassiveRecord" component={PassiveRecord} options={{headerShown:false, animation: 'none'}}/>
          <Stack.Screen  name="Card" component={CardScreen} options={{headerShown:false, animation: 'none'}}/>
          <Stack.Screen  name="VocabularyScreen" component={WordListScreen} options={{headerShown:false, animation: 'none'}}/>
          <Stack.Screen  name="WordTranslationScreen" component={WordTranslationScreen} options={{headerShown:false, animation: 'none'}}/>
          <Stack.Screen  name="PreSentenceScreen" component={PreSentenceTranslationScreen} options={{headerShown:false, animation: 'none'}}/>
          <Stack.Screen  name="SentenceScreen" component={SentenceTranslationScreen} options={{headerShown:false, animation: 'none'}}/>

        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="dark" translucent={true}/>
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
