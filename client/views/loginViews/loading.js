import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { userController, localizationController, settingsController, statisticsController } from '../../store/store';
import { useSelector } from 'react-redux';

export default function LoadingScreen({navigation}) {
  useEffect(() => {
    async function fetchFromLocalStorage() {
      localizationController.fetchCurrentLocale();
      const response = await userController.loadLocalData();
      if (response != "null") {
        await settingsController.loadLocalData();
        await statisticsController.loadLocalData();
        navigation.navigate("MainScreen");
      }
      else navigation.navigate("Guest");
    }
    fetchFromLocalStorage();
  }, []);
  
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
