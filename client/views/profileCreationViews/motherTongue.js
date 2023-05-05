import React from 'react';
import {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Linking } from 'react-native';



let CurActive = 'none';


export default function MotherTongueScreen({ navigation }) {
  
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


  const confirmValidation = () => {
    if(Active != 'none'){
      navigation.navigate('LoginConfirmation')
    }
    
  };



  return (
    
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainWrapper}>   
        <View style={styles.header}>
        <Image source={require('../../assets/img/speech_logo.png')} style={styles.image}></Image> 
        </View>
        <Text  style={styles.title}>What is your mother tongue?</Text>

        <TouchableOpacity style={Active != 'ru' ? styles.whiteButton : styles.whiteButtonActive} onPress={() => handleClick('ru')}>          
          <Text style={Active != 'ru' ? styles.whiteButtonTitle : styles.whiteButtonTitleActive }>Russian</Text>                            
        </TouchableOpacity>

        <TouchableOpacity style={Active != 'ua' ? styles.whiteButton : styles.whiteButtonActive} onPress={() => handleClick('ua')}>          
          <Text style={Active != 'ua' ? styles.whiteButtonTitle : styles.whiteButtonTitleActive }>Ukrainian</Text>                            
        </TouchableOpacity>



        <TouchableOpacity style={styles.button} onPress={() => confirmValidation()}>          
          <Text style={styles.buttonTitle}>Next</Text>                            
        </TouchableOpacity>
        
        <View style={styles.progresWrapper}>
          <Text style={styles.progresWrapperTitle}>1/5</Text>
        </View>


      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  
  whiteButton:{
    marginTop: 20,
    minHeight: 65,
    maxHeight: 65,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 280,
    height: 65,
    backgroundColor: '#FFFFFF',
    borderColor:'#00A3FF',
    borderWidth:1,
    borderRadius: 55,
    marginBottom: 10,
  },
  whiteButtonActive:{
    marginTop: 20,
    minHeight: 65,
    maxHeight: 65,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 280,
    height: 65,
    backgroundColor: '#00A3FF',
    borderColor:'#00A3FF',
    borderWidth:1,
    borderRadius: 55,
    marginBottom: 10,
  },
  whiteButtonTitle:{
    fontSize:21,
    color:'#000000',
  },
  whiteButtonTitleActive:{
    fontSize:21,
    color:'#FFFFFF',
  },
  title:{
    fontSize:24,
    marginTop:120,
    marginBottom:40,
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
