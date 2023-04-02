import React from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Linking } from 'react-native';


export default function GuestScreen() {
  return (
    

    <ImageBackground source={require('../login_bg.png')} resizeMode="cover" style={styles.bgimage}>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <Image source={require('../speech_logo.png')} style={styles.image}></Image>
        </View>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonTitle}>Sign up</Text>
        </TouchableOpacity>
        <Text style={styles.orTitle}>or</Text>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonTitle}>Log in</Text>
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
    maxHeight: 75,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    height: 50,
    backgroundColor: '#ffffff',
    borderColor:'#78ceff',
    borderWidth:2,
    borderRadius: 55,
  },
  buttonTitle:{
    fontSize:25,
    
  },
  orTitle:{
    fontSize:30,
    margin: 10,
    color:'#ffffff',
  },
  name:{
    fontSize: 50,
    marginLeft: 25,
    
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
