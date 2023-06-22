import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function ProfileCreationScreen() {
  return (
    <View style={styles.container}>        
      <Image source={require('../../assets/img/profilecreation1.png')} style={styles.image}></Image>     
      <Text style={styles.title}>Creating profile</Text>
      <Image source={require('../../assets/img/speech_logo.png')} style={styles.loadingGIF}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  title:{
    fontSize:20,
    marginTop:10,
    marginBottom:35,
  },
  loadingGIF:{
    width:84,
    height:84,
  },
  container: {
    flex: 1,
    
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    width: 200,
    height: 200,
    
  },
  name:{
    fontSize: 80,
    marginLeft: 25,
    
  },
});
