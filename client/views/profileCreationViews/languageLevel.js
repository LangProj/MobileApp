import React from 'react';
import {useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, BackHandler} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Linking } from 'react-native';

import { userController, settingsController, statisticsController } from '../../store/store.js';

import { useSelector } from 'react-redux';

import IonIcon from 'react-native-vector-icons/Ionicons';


export default function LanguageLevelScreen({ navigation }) {

  const localization = useSelector(state => state.localization);

  
  const [Active, setActive] = useState('none');
  
  const handleClick = (item) => {
    if(Active == item){
      setActive('none')
    }
    else if(Active != item){
      setActive(item)
    }
    else if(Active == 'none'){
      setActive(item)   
    } 
  };

  const onBackPress = () => {
    navigation.goBack();
    BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
  }, []);



  const confirmValidation = async () => {
    if(Active != 'none'){
      settingsController.SettingsModel.level = Active;
      await settingsController.saveLevel();
      await statisticsController.createLocaleData();
      await statisticsController.updateInDB();
      const result = await settingsController.updateSettings({
        userId: userController.UserModel.id,
        avatar: settingsController.SettingsModel.avatar,
        appLanguage: settingsController.SettingsModel.motherTongue,
        username: settingsController.SettingsModel.username,
        wordsPerDay: settingsController.SettingsModel.wordsPerDay,
        level: settingsController.SettingsModel.level
      });
      if (result.payload.status == 200)
        navigation.navigate('MainScreen');
    }
    
  };

  return (
    
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainWrapper}>   
        <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBackPress} >
          <IonIcon
              name='chevron-back'
              size={54}
              color='black'
          />
        </TouchableOpacity>
          
          <Image source={require('../../assets/img/speech_logo.png')} style={styles.image}></Image> 
        </View>
        <Text  style={styles.title}>{localization.data.chooseLevelLabelText}</Text>


        <View style={styles.row}>
          <TouchableOpacity style={Active != 'A1' ? styles.smallWhiteButton : styles.smallWhiteButtonActive} onPress={() => handleClick('A1')}>          
            <Text style={Active != 'A1' ? styles.whiteButtonTitle : styles.whiteButtonTitleActive}>A1</Text>                            
          </TouchableOpacity>
          <TouchableOpacity style={Active != 'A2' ? styles.smallWhiteButton : styles.smallWhiteButtonActive} onPress={() => handleClick('A2')}>          
            <Text style={Active != 'A2' ? styles.whiteButtonTitle : styles.whiteButtonTitleActive}>A2</Text>                            
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={Active != 'B1' ? styles.smallWhiteButton : styles.smallWhiteButtonActive} onPress={() => handleClick('B1')}>          
            <Text style={Active != 'B1' ? styles.whiteButtonTitle : styles.whiteButtonTitleActive}>B1</Text>                            
          </TouchableOpacity>
          <TouchableOpacity style={Active != 'B2' ? styles.smallWhiteButton : styles.smallWhiteButtonActive} onPress={() => handleClick('B2')}>          
            <Text style={Active != 'B2' ? styles.whiteButtonTitle : styles.whiteButtonTitleActive}>B2</Text>                            
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={Active != 'C1' ? styles.smallWhiteButton : styles.smallWhiteButtonActive} onPress={() => handleClick('C1')}>          
          <Text style={Active != 'C1' ? styles.whiteButtonTitle : styles.whiteButtonTitleActive}>C1</Text>                            
        </TouchableOpacity>



        <TouchableOpacity style={styles.button} onPress={() => confirmValidation()}>          
          <Text style={styles.buttonTitle}>{localization.data.confirmBtnText}</Text>                            
        </TouchableOpacity>
        
        <View style={styles.progresWrapper}>
          <Text style={styles.progresWrapperTitle}>4/4</Text>
        </View>


      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row:{
    flex:1,
    flexDirection:'row',
  },
  progresWrapper:{
    marginTop: 30,
    minHeight: 25,
    maxHeight: 25,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 25,
    backgroundColor: '#93D1FF',
    
    borderRadius: 55,
    marginBottom: 30,
  },
  progresWrapperTitle:{
    fontSize:16,
    color:'#FFFFFF',
  },
  bigWhiteButton:{
    marginTop: 20,
    minHeight: 60,
    maxHeight: 60,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderColor:'#00A3FF',
    borderWidth:1,
    borderRadius: 55,
    marginBottom: 10,
  },
  bigWhiteButtonActive:{
    marginTop: 20,
    minHeight: 60,
    maxHeight: 60,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    height: 60,
    backgroundColor: '#00A3FF',
    borderColor:'#00A3FF',
    borderWidth:1,
    borderRadius: 55,
    marginBottom: 10,
  },
  backButton:{
    
    width: 64,
    height: 64,
    left:10,
    top:22,
    position:"absolute",
    alignItems:'center',
    justifyContent:'center'
  },
  smallWhiteButton:{
    margin:10,
    minHeight: 60,
    maxHeight: 60,
    maxWidth:170,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 170,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderColor:'#00A3FF',
    borderWidth:1,
    borderRadius: 55,
    
  },
  smallWhiteButtonActive:{
    margin:10,
    minHeight: 60,
    maxHeight: 60,
    maxWidth:170,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 170,
    height: 60,
    backgroundColor: '#00A3FF',
    borderColor:'#00A3FF',
    borderWidth:1,
    borderRadius: 55,
    
  },
  whiteButtonTitle:{
    fontSize:21,
    color:'#000000',
  },
  whiteButtonTitleActive:{
    fontSize:21,
    color:'white',
  },
  title:{
    fontSize:24,
    marginTop:80,
    marginBottom:40,
    textAlign:'center',
    paddingLeft:80,
    paddingRight:80,
  },
  header: {
    height: 100 ,
    width: '100%',
    backgroundColor:'#87E2FF',
    flex:1,
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
  },
  mainWrapper: {
    flex:1,
    alignItems:'center',
    
  },
  
  
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:40,
  },

  image:{
    width: 64,
    height: 64,
    marginTop:20,
  },
  
  button:{
    marginTop: 50,
    minHeight: 50,
    maxHeight: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 175,
    height: 50,
    backgroundColor: '#4f94e5',
    borderRadius: 55,
    marginBottom: 30,
  },
  buttonTitle:{
    fontSize:22,
    color:'white',
  },
  
  backBtn: {
    height: 60,
    width: 60,
    position: 'absolute',
    top: 33,
    left: 15,
  }
 
  
});
