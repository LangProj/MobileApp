import React, { useEffect } from 'react';
import {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, BackHandler, ImageBackground} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Linking } from 'react-native';
import { useSelector } from 'react-redux';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { settingsController } from '../../store/store';







export default function MainStatsMenuScreen({ navigation }) {

  const localization = useSelector(state => state.localization);
  
  const statistics = useSelector(state => state.statistics);
  useEffect(() => {
    setLearnedWordsToday(statistics.wordsADay);
    setUnlearnedWords(statistics.wordsInLevel);
    setLearnedWordsAllTime(statistics.wordsAllTime);
    setCurrentLevel(settingsController.SettingsModel.level);
  }, [statistics.wordsADay, statistics.wordsInLevel, statistics.wordsAllTime]);
  
  useEffect(() => {
    const onBackPress = () => {
      console.log("System back gesture or click");
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
  }, []);
  const [LearnedWordsToday, setLearnedWordsToday] = useState(String(statistics.wordsADay));
  const [LearnedWordsAllTime, setLearnedWordsAllTime] = useState(String(statistics.wordsInLevel));
  const [UnlearnedWords, setUnlearnedWords] = useState(String(statistics.wordsAllTime));

  const [currentLevel, setCurrentLevel] = useState(settingsController.SettingsModel.level);
  
  return (
    
    <View style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainWrapper}>   
          <View style={styles.header}>
            <TouchableOpacity style={{width:50, height: 50, marginLeft:10}} onPress={()=>navigation.navigate("PassiveRecord")}>
              <MaterialIcon
                name='record-voice-over'
                size={44}
                color='#65A3FF'
              />
            </TouchableOpacity>
            <View style={{
              width: 70,
              height: 70,
              backgroundColor:'#E4EFFF',
              borderRadius:50,
              borderWidth: 2,
              borderColor: '#5B9CFD',
              alignItems:'center', justifyContent: 'center'
            }}>
            <FontAwesome5Icon
              name='user-alt'
              size={40}
              color='gray'
            />
            </View>

            <Text style={{width:50, height: 50, textAlign:'center', color: "#65A3FF", fontSize:33, fontWeight:900, verticalAlign: 'middle', marginRight:10}}>{currentLevel}</Text>

          </View>
          


          <View elevation={24} style={styles.statCard} >
            <Text style={[styles.statCardTitle,{color:'#00CB82',marginTop:20,}]}>{localization.data.learnedWordsLabelText}</Text>
            <Text style={[styles.whiteButtonTitle, {marginLeft:19}]}>({localization.data.todayLabelText})</Text>
            <View style={{flex:1,width:'100%',alignItems:'flex-end',marginLeft:-20,marginTop:-25}}>
              <Text style={{fontSize:45,fontWeight:700,color:'#00CB82' }}>{LearnedWordsToday}</Text>
            </View>
          </View>

          <View elevation={24} style={styles.statCard} >
            <Text style={[styles.statCardTitle,{color:'#00B9D2',marginTop:20,}]}>{localization.data.learnedWordsLabelText}</Text>
            <Text style={[styles.whiteButtonTitle, {marginLeft:19}]}>({localization.data.allTimeLabelText})</Text>
            
            <View style={{flex:1,width:'100%',alignItems:'flex-end',marginLeft:-20,marginTop:-25}}>
              <Text style={{fontSize:45,fontWeight:700,color:'#00B9D2' }}>{LearnedWordsAllTime}</Text>
            </View>
          </View>

          

          <View elevation={24} style={[styles.statCard,{marginBottom:30}]} >
            <Text style={[styles.statCardTitle,{color:'#778DFF',marginTop:20,}]}>{localization.data.unlearnedWordsLabelText}</Text>
            <Text style={[styles.whiteButtonTitle, {marginLeft:19}]}>({localization.data.inLevelLabelText})</Text>
            
            <View style={{flex:1,width:'100%',alignItems:'flex-end',marginLeft:-25,marginTop:-25}}>
              <Text style={{fontSize:45,fontWeight:700,color:'#778DFF' }}>{UnlearnedWords}</Text>
            </View>
          </View>
          


          <TouchableOpacity style={styles.whiteButton} onPress={() => navigation.navigate('Card')}>
            <Text style={styles.whiteButtonTitle}>{localization.data.discoverNewWordsBtnText}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.whiteButton} onPress={() => navigation.navigate('WordTranslationScreen')}>
            <Text style={styles.whiteButtonTitle}>{localization.data.startLearningWordsButtonText}</Text>
          </TouchableOpacity>



          
          <View elevation={24} style={styles.extendedStatCard} >
            <Text style={[styles.statCardTitle,{color:'#8E761F',flexWrap:'wrap',width:130,textAlign:'center'}]}>{localization.data.recordOfWeekLabelText}</Text>
            <Image source={require('../../assets/img/coin.png')} style={{width:80,height:80}}></Image>
          </View>



        </View>
      </ScrollView>
      <View style={styles.navBar}>
        <View style={{flex:1,flexDirection:'row',justifyContent:'space-around',marginTop:10,}}>

          <TouchableOpacity style={{height:50,width:50, borderBottomColor:'#65A3FF', borderBottomWidth:3,alignItems:'center', justifyContent: 'center'}} onPress={() => navigation.navigate('MainScreen')}>
            <MaterialIcon
              name='home'
              size={40}
              color='#65A3FF'
            />
          </TouchableOpacity>

          <TouchableOpacity style={{height:50,width:50,alignItems:'center', justifyContent: 'center'}} onPress={() => navigation.navigate('VocabularyScreen')}>
          <FontAwesome5Icon
              name='book-open'
              size={30}
              color='#65A3FF'
            />    
          </TouchableOpacity>

          <TouchableOpacity style={{height:50,width:50, alignItems:'center', justifyContent: 'center'}} onPress={() => navigation.navigate('PreSentenceScreen')}>
          <MaterialCommunityIcon
              name='text-box'
              size={40}
              color='#65A3FF'
            />                
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  navBar:{
    
    backgroundColor:'white',
    borderTopColor:'#65A3FF',
    borderTopWidth:3,
    height:75,
  },



  statCardTitle:{
    fontSize:25,
    fontWeight:700,    
    marginLeft:20,
  },
  extendedStatCard:{
    marginTop:30,
    minHeight: 190,
    maxHeight: 190,
    height: 190,
    flexDirection:'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    borderRadius:21,
    backgroundColor:'white',
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: {
      height: 11,
      width: 11
    },
    marginBottom:50
    
  },

  statCard:{
    marginTop: 20,
    minHeight: 125,
    maxHeight: 125,
    height: 125,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: 350,
    borderRadius:21,
    backgroundColor:'white',
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: {
      height: 11,
      width: 11
    },
    marginBottom: 10,
    
  },
  
  whiteButton:{
    marginTop: 10,
    minHeight: 65,
    maxHeight: 65,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 65,
    backgroundColor: '#FFFFFF',
    borderColor:'#00A3FF',
    borderWidth:1,
    borderRadius: 55,
    marginBottom: 10,
  },
  whiteButtonActive:{
    marginTop: 20,
    minHeight: 85,
    maxHeight: 85,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    height: 85,
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
    marginTop: 30,
    height: 90 ,
    width: '100%',
    flexDirection: 'row',
    flex:1,
    alignItems:'center',
    justifyContent: 'space-around',
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
    marginTop:30,
    
    borderRadius:50,
  },
  
  
  
  
 
  
});
