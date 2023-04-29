import React, { useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Linking } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useSelector } from 'react-redux';
import { localizationController } from '../../store/store.js';


export default function GuestScreen({ navigation }) {
  const localization = useSelector(state => state.localization);
  
  useEffect(() => {
    localizationController.fetchCurrentLocale();
  }, []);
  console.log(localization);
  return (
    <View style={styles.mainWrapper}>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <Image source={require('../../assets/img/speech_logo.png')} style={styles.image}></Image>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.buttonTitle} >{localization.data.signUpBtnText}</Text>
        </TouchableOpacity>
        <Text style={styles.orTitle}>{localization.data.orLabelText}</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonTitle}>{localization.data.logInBtnText}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.footer}>{localization.data.haveQuestionsLabelText}<Text style={styles.innerfooter} onPress={() => Linking.openURL('http://google.com')}> {localization.data.writeBtnText}</Text></Text>
    </View> 
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex:1,
    alignItems:'center',
    
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    
    alignItems: 'center',
    justifyContent: 'flex-end',
    maxHeight: 100,
    marginBottom: 40,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgimage: {
    height: '100%',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  image:{
    width: 120,
    height: 120,
    
  },
  button:{
    marginTop: 0,
    maxHeight: 60,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 55,
    borderColor:'#8ed7ff',
    borderWidth:2,
    borderRadius: 55,
  },
  buttonTitle:{
    fontSize:25,
    
  },
  orTitle:{
    fontSize:30,
    margin: 10,
    color:'black',
    marginBottom:20,
    marginTop:20,
    
  },
  name:{
    fontSize: 50,
    marginLeft: 25,
    
  },
  footer:{
    fontSize: 20,
    paddingBottom:30,
    color:'black',
    textAlign:'center',
  },
  innerfooter:{
    fontSize: 20,
    marginLeft: 25,
    color:'#12bddb',
  },
});
