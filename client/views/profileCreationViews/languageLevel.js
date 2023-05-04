import React from 'react';
import {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Linking } from 'react-native';

import { userController } from '../../store/store.js';


export default function LanguageLevelScreen({ navigation }) {
  
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


  const confirmValidation = async () => {
    if(Active != 'none'){
      const userState = userController.UserModel.store.getState().user.userData;
      const result = await userController.updateSettings({
        userId: userState.personalData.id,
        avatar: userState.settings.avatar,
        appLanguage: userState.settings.appLanguage,
        username: userState.settings.username,
        wordsPerDay: userState.settings.wordsPerDay,
        level: userState.settings.level
      });
      if (result.payload.status == 200)
        navigation.navigate('Card');
    }
    
  };

  return (
    
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainWrapper}>   
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>          
                                       
          </TouchableOpacity>
          
          <Image source={require('../../assets/img/speech_logo.png')} style={styles.image}></Image> 
        </View>
        <Text  style={styles.title}>Choose your language level</Text>


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

        <TouchableOpacity style={Active != 'C1' ? styles.bigWhiteButton : styles.bigWhiteButtonActive} onPress={() => handleClick('C1')}>          
          <Text style={Active != 'C1' ? styles.whiteButtonTitle : styles.whiteButtonTitleActive}>C1</Text>                            
        </TouchableOpacity>



        <TouchableOpacity style={styles.button} onPress={() => confirmValidation()}>          
          <Text style={styles.buttonTitle}>Confirm</Text>                            
        </TouchableOpacity>
        
        <View style={styles.progresWrapper}>
          <Text style={styles.progresWrapperTitle}>5/5</Text>
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
    backgroundColor: 'gray',
    width: 64,
    height: 64,
    left:10,
    top:22,
    position:"absolute",
    
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
    height: 90 ,
    width: '100%',
    backgroundColor:'#87E2FF',
    flex:1,
    alignItems:'center',
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
    fontSize:25,
    color:'white',
  },
  
  
 
  
});