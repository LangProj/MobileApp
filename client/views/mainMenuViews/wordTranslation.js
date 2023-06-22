import React from 'react';
import {useState,useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TextInput, BackHandler} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { settingsController, userController } from '../../store/store';



export default function WordTranslationScreen({ navigation }) {
  const [hasChanged, setHasChanged] = useState(false);
  let [currentWordIndex, setCurrentWordIndex] = useState(0);
  let [words, setWords] = useState(userController.UserModel.words.filter(item => {
    return item.learned < 0.8;
  }));
  let [List, setList] = useState(words);
  let [isCardFlipped, setIsCardFlipped] = useState(false);
  let [cardTitle, setCardTitle] = useState(List[currentWordIndex].word.translation[settingsController.SettingsModel.motherTongue]);
  let [cardDesc, setCardDesc] = useState('word desc');

  let [inputValue, setInputValue] = useState('');
  let [translationResult, setTranslationResult] = useState('disabled');
  
  let [buttonState, setButtonState] = useState(true);
  
  useEffect(() => {
    const onBackPress = () => {
      if (hasChanged) {
        userController.updateWordsLocaly();
        userController.updateWordsInDB();
      }
      navigation.goBack();
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
  }, []);

  const getPopupStyle = () => {
    if(translationResult == 'Wrong translation'){
      return styles.wrongTranslation;
    }else if(translationResult == 'Correct translation'){
      return styles.correctTranslation;
    }else{
      return styles.disableTranslation;
    }
  };


  const flipCard = () => {
    if(isCardFlipped){
      
    }else{
      setIsCardFlipped(true);
      setCardTitle(List[currentWordIndex].word.word);
      setCardDesc(List[currentWordIndex].word.sentence.en);
      setButtonState(false);
    }
  };

  const handleBack = () => {
    if (hasChanged) {
      userController.updateWordsLocaly();
      userController.updateWordsInDB();
    }
    navigation.goBack();
  }

  const checkWord = () => {
    if(compareValues(inputValue, List[currentWordIndex].word.word)){
      for (let i = 0; i < userController.UserModel.words.length; i++) {
        if (userController.UserModel.words[i].word._id === words[currentWordIndex].word._id) {
          userController.UserModel.words[i].learned += 0.2;
          setHasChanged(true);
        }
      }
      setTranslationResult('Correct translation');
      flipCard();
    }else{
      setTranslationResult('Wrong translation')
    }
  };

  const nextWord = () => {
    if (currentWordIndex == words.length - 1) {
      setCurrentWordIndex(0);
      setWords(userController.UserModel.words.filter(item => {
        return item.learned < 0.8;
      }));
      setList(words);
    }
    else setCurrentWordIndex(currentWordIndex + 1);
    setCardTitle(List[currentWordIndex].word.translation[settingsController.SettingsModel.motherTongue])
    setIsCardFlipped(false)
    setButtonState(true)
    setTranslationResult('disabled')
    setInputValue('')
  };

  const Check_skip = () => (
    <View style={[{width:'100%',marginTop:30,maxHeight:50,alignItems:'center',justifyContent:'center',flex:1,flexDirection:'row',}]}>
      <TouchableOpacity onPress={() => checkWord()} style={[styles.shadow,{borderRadius:10, width:'42%',height:50,backgroundColor:'#70D457',alignItems:'center',justifyContent:'center'}]}><Text style={[{color:'white',fontSize:18,fontWeight:500}]}>Check</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => flipCard()} style={[styles.shadow,{borderRadius:10,marginLeft:20, width:'42%',height:50,backgroundColor:'#FF7676',alignItems:'center',justifyContent:'center'}]}><Text style={[{color:'white',fontSize:18,fontWeight:500}]}>Skip</Text></TouchableOpacity>
    </View>
  );

  const Next = () => (
    <View style={[{width:'100%',marginTop:30,maxHeight:50,alignItems:'center',justifyContent:'center',flex:1,flexDirection:'row',}]}>
      <TouchableOpacity onPress={() => nextWord()} style={[styles.shadow,{borderRadius:10, width:'88%',height:50,backgroundColor:'#70D457',alignItems:'center',justifyContent:'center'}]}><Text style={[{color:'white',fontSize:18,fontWeight:500}]}>Next</Text></TouchableOpacity>  
    </View>
  );


  const compareValues = (value1, value2) => {
    const commonWords = ['a', 'an', 'the', 'to'];
    const removeCommonWords = (str) => {
      const words = str.toLowerCase().split(' ');
      if (commonWords.includes(words[0])) {
        return words.slice(1).join(' ');
      }
      return str;
    };

    const cleanedValue1 = removeCommonWords(value1.trim().toLowerCase());
    const cleanedValue2 = removeCommonWords(value2.trim().toLowerCase());

    return cleanedValue1 === cleanedValue2;
  };



  useEffect(() => {
    setCardTitle(List[currentWordIndex].word.translation[settingsController.SettingsModel.motherTongue]);
  }, [currentWordIndex, List]);
 
  return (
    // onPress={() => navigation.goBack()}

    <View style={{flex: 1}}>
      <View style={[{backgroundColor:'#00B9D2',height:110,width:'100%',justifyContent:'space-around',zIndex:999}]}>
        <View style={[{marginTop:20,flexDirection:'row',width:'100%',justifyContent:'space-around'}]}>
          <TouchableOpacity style={[{width:75,height:75,backgroundColor:'gray'}]} onPress={() => handleBack()} ></TouchableOpacity>
          <Text style={[{fontSize:28,color:'white',fontWeight:'bold',textAlign:'center',marginTop:20}]}>Translate</Text>
          <TouchableOpacity style={[{backgroundColor:'#00B9D2',width:75,height:75}]}></TouchableOpacity>
          {/* <Image source={require('../../assets/img/speech_logo.png')} style={styles.image}></Image>  */}
        </View>
      
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={styles.mainWrapper}>   
          
          


          

          
          <View style={[getPopupStyle()]}>
            <Text style={[{color:'white',fontSize:18}]}>{translationResult}</Text>
          </View>

          <LinearGradient
            colors={['#4ad3b6', '#4f9ae1']}
            style={[ styles.cardWrapper, {flex:1,alignItems:'center',justifyContent:'center',marginTop:120} ]}>       

            <View style={[{flex:1,alignItems:'center',justifyContent:'center'}]}>
              <Text style={styles.cardWord} >{cardTitle}</Text>
              <Text style={isCardFlipped ? styles.cardTransciption: styles.disabledCardTransciption}>{cardDesc}</Text>
            </View>

          </LinearGradient>
          
          
          <TextInput
            style={styles.input}        
            value={inputValue}         
            placeholder="Enter translation"
            onChangeText={newText => setInputValue(newText)}
          />

          {buttonState ? <Check_skip /> : <Next />}
          {/* <Check_skip></Check_skip>
          <Next></Next> */}

        </View>
        {/* <View style={styles.navBar}>
        <View style={{flex:1,flexDirection:'row',justifyContent:'space-around',marginTop:10,}}>

          <TouchableOpacity style={{height:50,backgroundColor:'gray',width:50}} onPress={() => navigation.navigate('MainStatsMenuScreen')}>

          </TouchableOpacity>

          <TouchableOpacity style={{height:50,backgroundColor:'gray',width:50, borderBottomColor:'#65A3FF', borderBottomWidth:3,}} onPress={() => navigation.navigate('VocabularyScreen')}>
                        
          </TouchableOpacity>

          <TouchableOpacity style={{height:50,backgroundColor:'gray',width:50}} onPress={() => navigation.navigate('ListScreen')}>
                        
          </TouchableOpacity>
        </View>
      </View> */}
      </ScrollView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  input:{
    width:300,
    height:50,
    borderWidth:1,
    borderColor:'grey',
    borderRadius:15,
    marginTop:50,
    textAlign: 'center'
  },
  correctTranslation:{
    width:350,
    height:50, 
    position:'absolute',
    alignItems:'center',
    justifyContent:'center', 
    top:35, 
    backgroundColor:'#4DBA6B', 
    borderRadius:10, 
    display: 'flex'
  },

  wrongTranslation:{
    width:350,
    height:50, 
    position:'absolute',
    alignItems:'center',
    justifyContent:'center', 
    top:35, 
    backgroundColor:'#FF5454', 
    borderRadius:10, 
    display: 'flex'
  },

  disableTranslation:{
    width:350,
    height:50, 
    position:'absolute',
    alignItems:'center',
    justifyContent:'center', 
    top:35, 
    backgroundColor:'#FF5454', 
    borderRadius:10, 
    display: 'none'
  },



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
    height:565,
    justifyContent:'flex-start',
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
    backgroundColor:'gray',
    borderRadius:50,
  },
  
  
  cardWrapper:{
    padding:10,
    height:100,
    width:100,
    maxWidth: 100,
    maxHeight:200,
    flex:1,
    minHeight: 100,
    minWidth: 300,
    borderRadius:26,
    marginTop:20,
    backfaceVisibility:'hidden',
    shadowColor: "#000",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },
  
  shadow:{
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },
  cardWord:{
    color:'white',
    fontSize:36,
    
    fontWeight: 500,
  },

  cardTransciption:{
    color:'white',
    fontSize:20,
    display:'flex',
    textAlign:'center'
  },
  disabledCardTransciption:{
    color:'white',
    fontSize:20,
    display:'none',
    textAlign:'center'
  },
});
