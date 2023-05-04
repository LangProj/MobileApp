import React, { useState } from 'react';

import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Linking } from 'react-native';

import { useSelector } from 'react-redux';

import {userController} from '../../store/store.js';

import { useForm, Controller } from 'react-hook-form';


export default function SignUpScreen({ navigation }) {
  const localization = useSelector(state => state.localization);
  
  const { control, watch, handleSubmit, setError, formState: {errors, isValid} } = useForm({
    defaultValues: {
      contact: '',
      password: '',
      confirmPassword: ''
    },
    mode: 'onSubmit'
  });

  const onSubmit = async (values) => {
    if (!errors.length) {
      const data = await userController.createNewUser(values);
      if (data.payload.status === 409)
        setError('root.serverError', {
          type: data.payload.status,
          message: data.payload.userData
        });
      else {
        await userController.UserModel.setId(data.payload.userData._id);
        await userController.UserModel.setToken(data.payload.userData.token);
        navigation.navigate('CodeConfirmation');
      }
    }
  }

  return (
    
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainWrapper}>
        <View style={styles.wrapper}>
          <View style={styles.container}>
            <Image source={require('../../assets/img/speech_logo.png')} style={styles.image}></Image>                   
          </View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name='contact'
            render={({field: { onChange, onBlur, value} }) => (
              <TextInput
                keyboardType='email-address'
                placeholder={localization.data.emailPhoneInputText}
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={ value => onChange(value)}
                value={value}
              />
            )}
          />
          {errors.contact && <Text>This is required.</Text>}
          {errors.root?.serverError.type === 409 && <Text>Such email is already in use</Text>}
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 8,
            }}
            name='password'
            render={({field: { onChange, onBlur, value} }) => (
              <TextInput 
                placeholder={localization.data.passwordInputText} 
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
          />
          {errors.password && <Text>Min 8 symbols</Text>}
          <Controller
            control={control}
            rules={{
              required: true,
              validate: (value) => {
                if (watch('password') != value)
                  return "Password don`t match";
              }
            }}
            name='confirmPassword'
            render={({field: { onChange, onBlur, value} }) => (
              <TextInput 
                placeholder={localization.data.repeatPasswordInputText} 
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />   
            )}
          />
          {errors.confirmPassword && <Text>Password do not match</Text>}

          
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)} type>        
            <Text style={styles.buttonTitle}>{localization.data.confirmBtnText}</Text>                            
        </TouchableOpacity>
        <Text style={styles.footer}>{localization.data.haveQuestionsLabelText}<Text style={styles.innerfooter} onPress={() => Linking.openURL('http://google.com')}> {localization.data.writeBtnText}</Text></Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex:1,
    alignItems:'center',
    
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop:100,
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
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:40,
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
    marginTop: 80,
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