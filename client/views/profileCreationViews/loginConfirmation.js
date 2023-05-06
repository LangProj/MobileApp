import React, { useState } from 'react';

import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TextInput} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Linking } from 'react-native';

import { userController } from '../../store/store';

import { useSelector } from 'react-redux';



export default function LoginConfirmationScreen({ navigation }) {

  const localization = useSelector(state => state.localization);


  const [username, setUsername] = useState('');

  const handleNext = async () => {
    await userController.UserModel.setUsername(username);
    navigation.navigate('Photo');
  }
  
  return (
    
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainWrapper}>   
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>          
                                       
          </TouchableOpacity>
          
          <Image source={require('../../assets/img/speech_logo.png')} style={styles.image}></Image> 
        </View>
        <Text  style={styles.title}>{localization.data.enterLoginLabelText}</Text>

        

        <TextInput placeholder={localization.data.loginInputText} style={styles.whiteButton} value={username} onChangeText={setUsername}/>

        <TouchableOpacity style={styles.button} onPress={() => handleNext()}>          
          <Text style={styles.buttonTitle}>{localization.data.nextBtnText}</Text>                            
        </TouchableOpacity>
        
        
        <View style={styles.progresWrapper}>
          <Text style={styles.progresWrapperTitle}>2/5</Text>
        </View>

      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backButton:{
    backgroundColor: 'gray',
    width: 64,
    height: 64,
    left:10,
    top:22,
    position:"absolute",
    
  },
  progresWrapper:{
    marginTop: 150,
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
    width: 350,
    height: 65,
    backgroundColor: '#FFFFFF',
    borderColor:'#00A3FF',
    borderWidth:1,
    borderRadius: 55,
    marginBottom: 10,
    fontSize:21,
    color:'#000000',
    paddingLeft:153,
  },
  whiteButtonTitle:{
    fontSize:21,
    color:'#000000',
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
    flexDirection:'row',
    justifyContent:'center',
  },
  mainWrapper: {
    flex:1,
    alignItems:'center',
    flexDirection:'column',
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
