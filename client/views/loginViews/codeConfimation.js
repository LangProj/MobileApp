import React, { useState } from 'react';

import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Linking } from 'react-native';

import { useSelector } from 'react-redux';
import { userController } from '../../store/store';



export default function CodeConfirmationScreen({ navigation }) {
  const localization = useSelector(state => state.localization);

  const [code, setCode] = useState('');

  const handleSubmit = async () => {
    const res = await userController.checkCode(code);
    if (res.payload.status === 200)
      navigation.navigate('MotherTongue');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.wrapper}>
        <TouchableOpacity style={{position:'relative',top:-20,left:-170, height:30,width:30,marginBottom:-30}}> 
          <Image resizeMode="cover" source={require('../../assets/img/backblack.png')} style={{ height:30,width:30}}></Image>
        </TouchableOpacity>
        <View style={styles.wrapper}>
          <View style={styles.container}>
            <Image source={require('../../assets/img/speech_logo.png')} style={styles.image}></Image>                    
          </View>
          <Text style={styles.description}>{localization.data.confirmLabelText}</Text>
          <TextInput placeholder={localization.data.confirmInputText} value={code} onChangeText={newValue => setCode(newValue)} style={styles.textInput} />
                              
          
        </View>
        <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>          
            <Text style={styles.buttonTitle}>{localization.data.logInBtnText}</Text>                              
        </TouchableOpacity>
        <Text style={styles.footer}>{localization.data.haveQuestionsLabelText}<Text style={styles.innerfooter} onPress={() => Linking.openURL('http://google.com')}> {localization.data.writeBtnText}</Text></Text>
      </View>
    </ScrollView>
    
    
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
  lgradient: {
    
    maxHeight: 75,
    color: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    height: 150,
    
    borderRadius: 55,
  },
  description: {
    fontSize:21,
    paddingLeft:50,
    paddingRight:50,
    paddingBottom:30,
    textAlign:'center',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:70,
  },
  image:{
    width: 120,
    height: 120,
    
  },
  bgimage: {
    height: '100%',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  button:{
    marginTop: 140,
    minHeight: 75,
    maxHeight: 75,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    height: 75,
    backgroundColor: '#4f94e5',
    borderRadius: 55,
    marginBottom: 30,
  },
  buttonTitle:{
    fontSize:25,
    color:'white',
  },
  orTitle:{
    fontSize:30,
    margin: 10,
  },
  name:{
    fontSize: 50,
    marginLeft: 25,
    
  },
  textInput:{
    maxHeight: 60,
    minHeight:60,
    
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 55,
    marginBottom: 20,
    fontSize: 18,
    borderColor:'#8ed7ff',
    borderWidth:2,
    borderRadius: 55,
    textAlign: 'center',
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
