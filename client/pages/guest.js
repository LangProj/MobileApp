import React from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Linking } from 'react-native';


export default function GuestScreen() {
  return (
    <View>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <Image source={require('../assets/img/speech_logo.png')} style={styles.image}></Image>
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
    </View> 
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
