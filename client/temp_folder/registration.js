import React from 'react';

import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Linking } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';


export default function SignUpScreen() {
  return (
    <ImageBackground source={require('../login_bg.png')} resizeMode="cover" style={styles.bgimage}>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <Image source={require('../speech_logo.png')} style={styles.image}></Image>
          
          
        </View>
        <TextInput placeholder="Email/phone" style={styles.textInput} />
        <TextInput placeholder="Password" style={styles.textInput} />
        <TextInput placeholder="Password 2" style={styles.textInput} />
        
        
        <TouchableOpacity style={styles.button}>
          <LinearGradient
            // Button Linear Gradient
            colors={['#4ad3b6', '#5095e5']}
            style={styles.lgradient}>
            <Text style={styles.buttonTitle}>Confirm</Text>
          </LinearGradient>
          
          
        </TouchableOpacity>
      </View>
      <Text style={styles.footer}>You have questions?<Text style={styles.innerfooter} onPress={() => Linking.openURL('http://google.com')}> Write to us.</Text></Text>
    </ImageBackground>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    
    alignItems: 'center',
    justifyContent: 'flex-end',
    maxHeight: 100,
    marginBottom: 40,
  },
  lgradient: {
    
    maxHeight: 75,
    color: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    height: 150,
    
    borderRadius: 55,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    width: 120,
    height: 120,
    
  },
  bgimage: {
    height: '100%',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  button:{
    marginTop: 50,
    maxHeight: 75,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    height: 50,
    backgroundColor: 'lightgray',
    borderRadius: 55,
    
  },
  buttonTitle:{
    fontSize:25,
    color:'white',
  },
  orTitle:{
    fontSize:30,
    margin: 10,
  },
  name:{
    fontSize: 50,
    marginLeft: 25,
    
  },
  textInput:{
    maxHeight: 75,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 55,
    marginBottom: 20,
    paddingLeft:55,
    borderColor:'#78ceff',
    borderWidth:2,
    borderRadius: 55,
  },
  footer:{
    fontSize: 20,
    paddingBottom:30,
    color:'#d3d1d7',
    textAlign:'center',
    
  },
  innerfooter:{
    fontSize: 20,
    marginLeft: 25,
    color:'#12bddb',
  },
});
