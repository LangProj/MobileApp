import React, { useEffect } from 'react';
import {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, BackHandler} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Linking } from 'react-native';
import { useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';








export default function MainStatsMenuScreen({ navigation }) {
  const statistics = useSelector(state => state.statistics);
  useEffect(() => {
    setLearnedWordsToday(statistics.wordsADay);
    setUnlearnedWords(statistics.wordsInLevel);
    setLearnedWordsAllTime(statistics.wordsAllTime);
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

  return (
    
    <View style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainWrapper}>   
          <View style={styles.header}>
            <Image source={require('../../assets/img/profileavatart.png')} style={styles.image}></Image>
          </View>
          <TouchableOpacity style={{position:'absolute', top:45, left: 45, width:50, height: 50}} onPress={()=>navigation.navigate("PassiveRecord")}>
            <Icon
              name='record-voice-over'
              size={40}
              color='#65A3FF'
            />
          </TouchableOpacity>


          <View elevation={24} style={styles.statCard} >
            <ImageBackground source={require('../../assets/img/reqgreen.png')} resizeMode="cover" style={{marginLeft:-10,marginTop:0,width:370,height:139}}>
            
            <Text style={[styles.statCardTitle,{color:'#00CB82',marginTop:20,}]}>Learned words</Text>
            <Text style={[styles.whiteButtonTitle, {marginLeft:19}]}>(today)</Text>
            <Text style={[styles.whiteButtonTitle, {position:'relative',top:-30,left:260,fontWeight:700,}]}>Amount</Text>
            <View style={{flex:1,width:'100%',alignItems:'flex-end',marginLeft:-20,marginTop:-33}}>
              <Text style={{fontSize:45,fontWeight:700,color:'#00CB82' }}>{LearnedWordsToday}</Text>
            </View>
            </ImageBackground>
          </View>

          <View elevation={24} style={styles.statCard} >
            <ImageBackground source={require('../../assets/img/reqblue.png')} resizeMode="cover" style={{marginLeft:-10,marginTop:0,width:370,height:139}}>
            <Text style={[styles.statCardTitle,{color:'#00B9D2',marginTop:20,}]}>Learned words</Text>
            <Text style={[styles.whiteButtonTitle, {marginLeft:19}]}>(all time)</Text>
            
            <View style={{flex:1,width:'100%',alignItems:'flex-end',marginLeft:-20,marginTop:-10}}>
              <Text style={{fontSize:45,fontWeight:700,color:'#00B9D2' }}>{LearnedWordsAllTime}</Text>
            </View>
            </ImageBackground>
          </View>

          

          <View elevation={24} style={[styles.statCard,{marginBottom:30}]} >
            <ImageBackground source={require('../../assets/img/reqpurple.png')} resizeMode="cover" style={{marginLeft:-10,marginTop:0,width:370,height:139}}>
            <Text style={[styles.statCardTitle,{color:'#778DFF',marginTop:20,}]}>Unlearned words</Text>
            <Text style={[styles.whiteButtonTitle, {marginLeft:19}]}>(in level)</Text>
            
            <View style={{flex:1,width:'100%',alignItems:'flex-end',marginLeft:-20,marginTop:-10}}>
              <Text style={{fontSize:45,fontWeight:700,color:'#778DFF' }}>{UnlearnedWords}</Text>
            </View>
            </ImageBackground>
          </View>
          


          <TouchableOpacity style={styles.whiteButton} onPress={() => navigation.navigate('Card')}>
            <Text style={styles.whiteButtonTitle}>Discover new words</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.whiteButton} onPress={() => navigation.navigate('WordTranslationScreen')}>
            <Text style={styles.whiteButtonTitle}>Start learning words</Text>
          </TouchableOpacity>



          
          <View elevation={24} style={styles.extendedStatCard} >
            <Text style={[styles.statCardTitle,{color:'#8E761F',flexWrap:'wrap',width:130,textAlign:'center'}]}>RECORD OF THE WEEK</Text>
            <Image source={require('../../assets/img/coin.png')} style={{width:80,height:80}}></Image>
          </View>



        </View>
      </ScrollView>
      <View style={styles.navBar}>
        <View style={{flex:1,flexDirection:'row',justifyContent:'space-around',marginTop:10,}}>

          <TouchableOpacity style={{height:50,width:50, borderBottomColor:'#65A3FF', borderBottomWidth:3,}} onPress={() => navigation.navigate('MainStatsMenuScreen')}>
            <Image source={require('../../assets/img/home.png')} resizeMode="contain" style={{height:50,width:50}}></Image>
          </TouchableOpacity>

          <TouchableOpacity style={{height:50,width:50}} onPress={() => navigation.navigate('VocabularyScreen')}>
            <Image source={require('../../assets/img/dictionary.png')} resizeMode="contain" style={{height:50,width:50}}></Image>         
          </TouchableOpacity>

          <TouchableOpacity style={{height:50,width:50}} onPress={() => navigation.navigate('ListScreen')}>
            <Image source={require('../../assets/img/Subtract.png')} resizeMode="contain" style={{height:50,width:50}}></Image>                   
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
    width: 350,
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
    height: 90 ,
    width: '100%',
    
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
    marginTop:30,
    
    borderRadius:50,
  },
  
  
  
  
 
  
});
