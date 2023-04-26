import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function LoadingScreen() {
  return (
    <View style={styles.container}>        
      <Image source={require('../../assets/img/speech_logo.png')} style={styles.image}></Image>      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
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
