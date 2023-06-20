import React from 'react';
import {useState,useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TextInput, Modal} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useRoute } from '@react-navigation/native';
import { settingsController, userController } from '../../store/store';

const ALL_SENTENCES = [
  {
    sentence:'sentence 1 sentence 1 sentence 1 sentence 1',
    sentence_translated:'переклад речення 1 переклад речення 1 переклад речення 1 переклад речення 1 переклад речення 1'
  },
  {
    sentence:'sentence 2 sentence 2 sentence 2 sentence 2',
    sentence_translated:'переклад речення 2 переклад речення 2 переклад речення 2 переклад речення 2 переклад речення 2'
  },
  {
    sentence:'sentence 3 sentence 3 sentence 3 sentence 3',
    sentence_translated:'переклад речення 3 переклад речення 3 переклад речення 3 переклад речення 3 переклад речення 3'
  }
];

export default function SentenceTranslationScreen({ navigation }) {
  const route = useRoute();

  const [chosenTopics, setChosenTopics] = useState(route.params?.data);
  const [allLevels, setAllLevels] = useState([]);

  const [sentence, setSentence] = useState("ssssssssss");
  const [translatedSentence, setTranslatedSentence] = useState("");
  const [level, setLevel] = useState("");
  const [topic, setTopic] = useState("");

  let [currentWordIndex, setCurrentWordIndex] = useState(0);
  let [List, setList] = useState(ALL_SENTENCES);
  let [modalVisible, setModalVisible] = useState(false)
  let [inputValue, setInputValue] = useState('');
  
  let [cardDesc, setCardDesc] = useState(List[currentWordIndex].sentence);
  let [translatedCardDesc, setTranslatedCardDesc] = useState(List[currentWordIndex].sentence_translated);
  
  
  
  let [buttonState, setButtonState] = useState(true);
  

  const nextWord = () => {
    setCurrentWordIndex(currentWordIndex + 1)
    setCardDesc(List[currentWordIndex].sentence)
    setTranslatedCardDesc(List[currentWordIndex].sentence_translated)
    setButtonState(true)
    setModalVisible(false)
    setInputValue('')
  };

  const Check_skip = () => (
    <View style={[{width:'100%',marginTop:30,maxHeight:50,alignItems:'center',justifyContent:'center',flex:1,flexDirection:'row',}]}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={[styles.shadow,{borderRadius:10, width:'42%',height:50,backgroundColor:'#70D457',alignItems:'center',justifyContent:'center'}]}><Text style={[{color:'white',fontSize:18,fontWeight:500}]}>Check</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => nextWord()} style={[styles.shadow,{borderRadius:10,marginLeft:20, width:'42%',height:50,backgroundColor:'#FF7676',alignItems:'center',justifyContent:'center'}]}><Text style={[{color:'white',fontSize:18,fontWeight:500}]}>Skip</Text></TouchableOpacity>
    </View>
  );

  const Next = () => (
    <View style={[{width:'100%',marginTop:30,maxHeight:50,alignItems:'center',justifyContent:'center',flex:1,flexDirection:'row',}]}>
      <TouchableOpacity onPress={() => nextWord()} style={[styles.shadow,{borderRadius:10, width:'42%',height:50,backgroundColor:'#65A3FF',alignItems:'center',justifyContent:'center'}]}><Text style={[{color:'white',fontSize:18,fontWeight:500}]}>Next</Text></TouchableOpacity>  
    </View>
  );

  const generateSentence = async () => {
    const lang = settingsController.SettingsModel.motherTongue == 'ru' ? "русском" : "украинском";
    const result = await userController.generateSentence({
      language: lang,
      level: level,
      grammaticalTheme: topic
    });
    setSentence(result.payload.data.nativeLangSentence);
    setTranslatedSentence(result.payload.data.englishSentence);
  };


  useEffect(() => {
    async function loadData() {
      // exclude empty levels & add available levels
      const filteredTopics = {};
      const levels = [];
      for (const key in chosenTopics) {
        const arr = Array.from(chosenTopics[key]);
        if (arr.length != 0){
          levels.push(key);
          filteredTopics[key] = arr;
        }
      }

      setChosenTopics(filteredTopics);
      setAllLevels(levels);

      // randomize level & topic

      const levelIndex = Math.floor(Math.random() * levels.length);
      const topicIndex = Math.floor(Math.random() * filteredTopics[levels[levelIndex]].length);
      setLevel(levels[levelIndex]);
      setTopic(filteredTopics[levels[levelIndex]][topicIndex]);

      // generate sentence
      await generateSentence();
    }
    loadData(); 
    
  }, []);
  
  return (
    

    <View style={{flex: 1}}>
      <View style={[{backgroundColor:'#00B9D2',height:110,width:'100%',justifyContent:'space-around',zIndex:999}]}>
        <View style={[{marginTop:20,flexDirection:'row',width:'100%',justifyContent:'space-around'}]}>
          <TouchableOpacity style={[{width:75,height:75,backgroundColor:'gray'}]} onPress={() => navigation.goBack()} ></TouchableOpacity>
          <Text style={[{fontSize:28,color:'white',fontWeight:'bold',textAlign:'center',marginTop:20}]}>{level}</Text>
          <TouchableOpacity style={[{backgroundColor:'#00B9D2',width:75,height:75}]}></TouchableOpacity>
          {/* <Image source={require('../../assets/img/speech_logo.png')} style={styles.image}></Image>  */}
        </View>
      
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={styles.mainWrapper}>   
          
          


          

          
          <View style={[{marginTop:20,marginBottom:-60,height:60,width:300,borderColor:'#00B2FF',borderWidth:2,borderRadius:20,alignItems:'center',justifyContent:'center'}]}>
            <Text style={{fontSize:22, fontWeight:600,color:'black'}}>{topic}</Text>
          </View>

          <LinearGradient
            colors={['#4ad3b6', '#4f9ae1']}
            style={[ styles.cardWrapper, {flex:1,alignItems:'center',justifyContent:'center',marginTop:120} ]}>       

            <View style={[{flex:1,alignItems:'center',justifyContent:'center'}]}>          
              <Text style={styles.cardTransciption}>{sentence}</Text>
            </View>

          </LinearGradient>
          
          
          <TextInput
            style={styles.input}        
            value={inputValue}         
            placeholder="Enter translation"
            onChangeText={newText => setInputValue(newText)}
          />

          {buttonState ? <Check_skip /> : <Viev />}
          {/* <Check_skip></Check_skip>
          <Next></Next> */}
          <Modal
          animationType={'fade'}
          transparent={true}
          visible={modalVisible}
          statusBarTranslucent={true}
          onRequestClose={() => {
            
          }}>
            
            <View style={styles.centeredView}>
              
              <View style={[styles.modalView]}>
                <View style={[{marginBottom:15,marginTop:20,height:75,flexDirection:'row',width:'100%',justifyContent:'center',alignItems:'center'}]}>
                  <Text style={{fontSize:25, fontWeight:600,color:'black'}}>Recommended</Text>
                  <TouchableOpacity style={[{height:50,width:50,backgroundColor:'gray',position:'relative',left:40,top:0}]} onPress={() => setModalVisible(false)}></TouchableOpacity>
                </View>
                <Text style={{fontSize:18, fontWeight:500,color:'gray', width:250, textAlign:'center'}}>{translatedSentence}</Text>
              </View>
              <Next/>
            </View>

            <View style={styles.activeFilterUI}/>       
          </Modal>

        </View>
      </ScrollView>
      <View style={{position:'absolute',zIndex: modalVisible ? 999 : -4,backgroundColor:'black',height:'100%',width:'100%',opacity: modalVisible ? 0.5 : 0}}>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input:{
    width:300,
    height:100,
    borderWidth:1,
    borderColor:'grey',
    borderRadius:15,
    marginTop:50,
    textAlign: 'center',
    flexWrap: 'wrap'
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
    height:665,
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
    height:90,
    width:100,
    maxWidth: 100,
    maxHeight:170,
    flex:1,
    minHeight: 100,
    minWidth: 300,
    borderRadius:26,
    marginTop:80,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    opacity:1,
    zIndex:999,
    
       
  },
  modalView: {
    height:250,
    width:340,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 25,
    borderWidth:1,
    borderColor:'black',
    alignItems: 'center',
    
  },
});
