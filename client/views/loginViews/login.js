import React, { useEffect } from 'react';

import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Linking } from 'react-native';

import { useSelector } from 'react-redux';

import { settingsController, statisticsController, userController } from '../../store/store.js';

import { useForm, Controller } from 'react-hook-form';


export default function LoginScreen({ navigation }) {
  const localization = useSelector(state => state.localization);

  const { control, handleSubmit, setError, formState: {errors} } = useForm({
    defaultValues: {
      contact: '',
      password: '',
    },
    mode: 'onSubmit'
  });

   
  const onSubmit = async (values) => {
    if (!errors.length) {
      const data = await userController.fetchUser(values);
      console.log(data);
      if (data.payload.status === 404 || data.payload.status === 400)
        setError('root.serverError', {
          type: data.payload.status,
          message: data.payload.userData
        });
      else {
        console.log(data.payload.userData);

        userController.UserModel.id = data.payload.userData._id;
        userController.UserModel.token = data.payload.userData.token;
        userController.UserModel.words = data.payload.userData.words;
        await userController.saveId();
        await userController.saveToken();
        await userController.saveWords();

        await statisticsController.loadLocalData();
        
        settingsController.SettingsModel.username = data.payload.userData.settings.username;
        settingsController.SettingsModel.avatar = data.payload.userData.settings.avatar;
        settingsController.SettingsModel.motherTongue = data.payload.userData.settings.appLanguage;
        settingsController.SettingsModel.wordsPerDay = data.payload.userData.settings.wordsPerDay;
        settingsController.SettingsModel.level = data.payload.userData.settings.level;
        await settingsController.saveUsername();
        await settingsController.saveAvatar();
        await settingsController.saveMotherTongue();
        await settingsController.saveWordsPerDay();
        await settingsController.saveLevel();

        navigation.navigate('MainScreen');
      }
    }
  }

  return (
    <ScrollView  showsVerticalScrollIndicator={false}>
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
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.contact && <Text>One of contacts is required.</Text>}
          {errors.root?.serverError.type === 404 && <Text>Perhaps you are not registered.</Text>}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name='password'
            render={({field: { onChange, onBlur, value} }) => (
              <TextInput
                placeholder={localization.data.passwordInputText} 
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />                      
            )}
          />
          {errors.password && <Text>Password is required.</Text>}
          {errors.root?.serverError.type === 400 && <Text>Incorrect password</Text>}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>          
          <Text style={styles.buttonTitle}>{localization.data.logInBtnText}</Text>                              
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
    marginTop:170,
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
    marginTop: 130,
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
