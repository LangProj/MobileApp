import React, { useState, useEffect } from 'react';

import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TextInput, BackHandler } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Linking } from 'react-native';

import { settingsController } from '../../store/store';

import { useSelector } from 'react-redux';

import { useForm, Controller } from 'react-hook-form';

import IonIcon from 'react-native-vector-icons/Ionicons';


export default function LoginConfirmationScreen({ navigation }) {

  const localization = useSelector(state => state.localization);


  const [username, setUsername] = useState('');

  const { control, handleSubmit, setError, formState: {errors, isValid}, clearErrors } = useForm({
    defaultValues: {
      username: ''
    },
    mode: 'onSubmit'
  });

  const handleNext = async (values) => {
    settingsController.SettingsModel.username = values.username;
    const check = await settingsController.checkUsernameExist(values);
    if (check.payload.status === 409) {
      setError('root.serverError', {
        type: check.payload.status,
        message: check.payload.data
      });
    }
    else {
      await settingsController.saveUsername();
      navigation.navigate('WordsPerDay');
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


        <Text style={styles.title}>{localization.data.enterLoginLabelText}</Text>

        
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          name='username'
          render={({field: {onChange, onBlur, value} }) => (
            <TextInput 
              placeholder={localization.data.loginInputText} 
              style={styles.whiteButton}
              onBlur={onBlur}
              onChangeText={ value => {
                onChange(value);
                clearErrors('username');
                clearErrors('root');
              }}
              value={value} 
            />
          )}
        />
        {errors.username && <Text style={styles.errorMsg}>* Username is required</Text>}
        {errors.root?.serverError.type === 409 && <Text style={styles.errorMsg}>{localization.data.usernameAlreadyInUseErrorLabelText}</Text>}
        

        <TouchableOpacity style={styles.button} onPress={handleSubmit(handleNext)}>          
          <Text style={styles.buttonTitle}>{localization.data.nextBtnText}</Text>                            
        </TouchableOpacity>
        
        
        <View style={styles.progresWrapper}>
          <Text style={styles.progresWrapperTitle}>2/4</Text>
        </View>

      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backButton:{
    
    width: 64,
    height: 64,
    left:10,
    top:22,
    position:"absolute",
    alignItems:'center',
    justifyContent:'center'
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
    textAlign:'center'
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
    fontSize:22,
    color:'white',
  },
  errorMsg: {
    color: 'red',
    marginTop:0,
    marginBottom:10
  },
  backBtn: {
    height: 60,
    width: 60,
    position: 'absolute',
    top: 33,
    left: 15,
  }
});
