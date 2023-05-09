import React from 'react';
import {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Linking } from 'react-native';

import { settingsController } from '../../store/store.js';

import { useSelector } from 'react-redux';




export default function WordsPerDayScreen({ navigation }) {

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


  const confirmValidation = async () => {
    if(Active != 'none'){
      settingsController.SettingsModel.wordsPerDay = Active;
      await settingsController.saveWordsPerDay();
      navigation.navigate('LanguageLevel');
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
        <Text  style={styles.title}>{localization.data.howManyWordsPerDayLabelText}</Text>


        <View style={styles.row}>
          <TouchableOpacity style={Active != '10' ? styles.smallWhiteButton : styles.smallWhiteButtonActive} onPress={() => handleClick('10')}>          
            <Text style={Active != '10' ? styles.whiteButtonTitle : styles.whiteButtonTitleActive}>10</Text>                            
          </TouchableOpacity>
          <TouchableOpacity style={Active != '20' ? styles.smallWhiteButton : styles.smallWhiteButtonActive} onPress={() => handleClick('20')}>          
            <Text style={Active != '20' ? styles.whiteButtonTitle : styles.whiteButtonTitleActive}>20</Text>                            
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={Active != '30' ? styles.smallWhiteButton : styles.smallWhiteButtonActive} onPress={() => handleClick('30')}>          
            <Text style={Active != '30' ? styles.whiteButtonTitle : styles.whiteButtonTitleActive}>30</Text>                            
          </TouchableOpacity>
          <TouchableOpacity style={Active != '40' ? styles.smallWhiteButton : styles.smallWhiteButtonActive} onPress={() => handleClick('40')}>          
            <Text style={Active != '40' ? styles.whiteButtonTitle : styles.whiteButtonTitleActive}>40</Text>                            
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={Active != '50' ? styles.smallWhiteButton : styles.smallWhiteButtonActive} onPress={() => handleClick('50')}>          
          <Text style={Active != '50' ? styles.whiteButtonTitle : styles.whiteButtonTitleActive}>50</Text>                            
        </TouchableOpacity>



        <TouchableOpacity style={styles.button} onPress={() => confirmValidation()}>          
          <Text style={styles.buttonTitle}>{localization.data.confirmBtnText}</Text>                            
        </TouchableOpacity>
        
        <View style={styles.progresWrapper}>
          <Text style={styles.progresWrapperTitle}>4/5</Text>
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
