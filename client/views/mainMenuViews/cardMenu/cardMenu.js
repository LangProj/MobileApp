import React, { Component } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import * as Progress from 'react-native-progress';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Pressable,
  Image,
  ScrollView,
  BackHandler
} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import cardMenuWrapper from './cardMenuWrapper';
import { settingsController, statisticsController, userController } from '../../../store/store.js';



class CardScreen extends Component {
  UNSAFE_componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    })
    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    })
  }

  async componentDidMount() {

    const { user, settings } = this.props;
    this.words = await userController.getNewWords({
      userId: user.userData.personalData.id,
      maxWords: settings.settings.wordsPerDay
    })
    .then(response => {
      return response.payload.data.words;
    })
    .catch(error => {
      console.log(error);
      return null;
    });
    console.log(this.words);
    this.currentWordInd = 0;
    this.setState({wordProgress: `1/${this.words.length}`});
    this.setState({floatProgress: 1/this.words.length/2});
    this.setState({word: this.words[this.currentWordInd].word});
    this.setState({wordTranslated: this.words[this.currentWordInd].translation[settingsController.SettingsModel.motherTongue]});
    this.setState({category: this.words[this.currentWordInd].category[settingsController.SettingsModel.motherTongue]});
    this.setState({pronunciation: this.words[this.currentWordInd].pronunciation});
    this.setState({sentence: this.words[this.currentWordInd].sentence.en});
    this.setState({sentenceTranslated: this.words[this.currentWordInd].sentence[settingsController.SettingsModel.motherTongue]});
    
    this.learnedWords = [];
    this.notLearnedWords = [];

    
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = async () => {
    if (this.learnedWords != undefined && this.notLearnedWords != undefined) {
      await userController.addWords(this.learnedWords.concat(this.notLearnedWords));
      await statisticsController.addWords(this.learnedWords.concat(this.notLearnedWords).length);
    }
    this.props.navigation.goBack();
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    return true;
  };

  constructor(props) {
    super(props);
    this.state = {
      myText: 'I\'m ready to get swiped!',
      gestureName: 'none',
      backgroundColor: '#fff',
      category:'',
      word:'',
      wordTranslated:'',
      pronunciation: '',
      sentence:'',
      sentenceTranslated:'sentence Translated',
      wordProgress:``,
      floatProgress:0.01,
    };
  }

  onSwipeLeft(gestureState) {
    //this code is triggered on swipe left
    if (this.currentWordInd == this.words.length - 1) {
      this.learnedWords.push({ word: this.words[this.currentWordInd], learned: 0.8 });
      this.currentWordInd++;
      this.setState({floatProgress: this.state.floatProgress + 1/this.words.length});
    }
    else if (this.currentWordInd < this.words.length - 1) {
      this.learnedWords.push({ word: this.words[this.currentWordInd], learned: 0.8 });
      this.currentWordInd++;
      this.setState({myText: 'You swiped left!'});
      console.log(this.currentWordInd);
      this.setState({word: this.words[this.currentWordInd].word});
      this.setState({category: this.words[this.currentWordInd].category[settingsController.SettingsModel.motherTongue]});
      this.setState({wordTranslated: this.words[this.currentWordInd].translation[settingsController.SettingsModel.motherTongue]});
      this.setState({sentence: this.words[this.currentWordInd].sentence.en});
      this.setState({sentenceTranslated: this.words[this.currentWordInd].sentence[settingsController.SettingsModel.motherTongue]});
      if (this.currentWordInd == 1)
        this.setState({floatProgress: this.state.floatProgress + 1/this.words.length/2});
      else
        this.setState({floatProgress: this.state.floatProgress + 1/this.words.length});

      this.setState({wordProgress: this.currentWordInd+1 + `/${this.words.length}`});
      this.setState({pronunciation: this.words[this.currentWordInd].pronunciation});
    }
  }
 
  onSwipeRight(gestureState) {
    //this code is triggered on swipe right
    if (this.currentWordInd == this.words.length - 1) {
      this.notLearnedWords.push({ word: this.words[this.currentWordInd], learned: 0.1});
      this.currentWordInd++;
      this.setState({floatProgress: this.state.floatProgress + 1/this.words.length});
    }
    else if (this.currentWordInd < this.words.length - 1) {
      this.notLearnedWords.push({ word: this.words[this.currentWordInd], learned: 0.1});
      this.currentWordInd++;
      this.setState({myText: 'You swiped right!'});
      this.setState({word: this.words[this.currentWordInd].word});
      this.setState({category: this.words[this.currentWordInd].category[settingsController.SettingsModel.motherTongue]});
      this.setState({wordTranslated: this.words[this.currentWordInd].translation[settingsController.SettingsModel.motherTongue]});
      this.setState({sentence: this.words[this.currentWordInd].sentence.en});
      this.setState({sentenceTranslated: this.words[this.currentWordInd].sentence[settingsController.SettingsModel.motherTongue]});
      if (this.currentWordInd == 1)
        this.setState({floatProgress: this.state.floatProgress + 1/this.words.length/2});
      else
        this.setState({floatProgress: this.state.floatProgress + 1/this.words.length});
      this.setState({wordProgress: this.currentWordInd+1 + `/${this.words.length}`});
      this.setState({pronunciation: this.words[this.currentWordInd].pronunciation});
    }
  }

  onSwipe(gestureName, gestureState) {
    const { SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    this.setState({gestureName: gestureName});
    switch (gestureName) {      
      case SWIPE_LEFT:
        this.setState({backgroundColor: 'blue'});
        break;
      case SWIPE_RIGHT:
        this.setState({backgroundColor: 'yellow'});
        break;
    }
  }

  flipCard() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue,{
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true
      }).start();
    } else {
      Animated.spring(this.animatedValue,{
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true
      }).start();
    }

  }

  async handleFinish() {
    if (this.learnedWords != undefined && this.notLearnedWords != undefined) {
      await userController.addWords(this.learnedWords.concat(this.notLearnedWords));
      await statisticsController.addWords(this.learnedWords.concat(this.notLearnedWords).length);
    }
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    this.props.navigation.goBack();
  }

  render() {
    const {localization} = this.props;
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate }
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <GestureRecognizer onSwipe={(direction, state) => this.onSwipe(direction, state)}
        
        onSwipeLeft={(state) => this.onSwipeLeft(state)}
        onSwipeRight={(state) => this.onSwipeRight(state)}>
        <View style={styles.mainWrapper}>


        <View style={styles.header}>
        <Image source={require('../../../assets/img/speech_logo.png')} style={styles.image}></Image> 
        </View>


        <View style={styles.topicWrapper}>          
          <Text style={styles.topicWrapperTitle}>{this.state.category}</Text>                            
        </View>



        <View>
          <Animated.View style={[styles.flipCard, frontAnimatedStyle, {opacity: this.frontOpacity}]} onPress={() => this.flipCard()}>
            <LinearGradient
              colors={['#4ad3b6', '#4f9ae1']}
              style={[ styles.cardWrapper ]}
              >
              <Text style={styles.cardWord} >{this.state.word}</Text>
              <Text style={styles.cardTransciption}>{this.state.pronunciation}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.cardSentence}>{this.state.sentence}</Text>
                         
              </View>     
              <Text style={styles.cardProgress}>{this.state.wordProgress}</Text>
            </LinearGradient>
          </Animated.View>
          <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle, {opacity: this.backOpacity}]}>
            <LinearGradient
              colors={['#4ad3b6', '#4f9ae1']}
              style={[ styles.cardWrapper ]}>
              <Text style={styles.cardWord}>{this.state.wordTranslated}</Text>
              <Text style={styles.cardTransciption}>{this.state.pronunciation}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.cardSentence}>{this.state.sentenceTranslated}</Text>
                      
              </View>    
              <Text style={styles.cardProgress}>{this.state.wordProgress}</Text>    
            </LinearGradient>
          </Animated.View>
        </View>


        <Text style={styles.progressBarTitle}>{localization.data.progressLabelText}</Text>
        <Progress.Bar style={styles.progressBar} progress={this.state.floatProgress} width={310} color={'#00D22E'}  unfilledColor={'#E8E8E8'} borderWidth={0}/>



        <TouchableOpacity style={styles.button} onPress={() => this.handleFinish()}>
          <Text style={styles.buttonTitle}>{localization.data.finishLabelText}</Text>
        </TouchableOpacity>




        <Pressable style={styles.cardPressHandler} onPress={() => this.flipCard()}></Pressable>




        </View>
        </GestureRecognizer>
        
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  progressBarTitle:{
    marginTop:80,
    fontSize:20,
  },
  progressBar:{
    
    marginTop:10,
  },
  cardPressHandler:{
    
    maxWidth: 360,
    
    minHeight: 200,
    minWidth: 360,
    borderRadius:26,
    
    
    opacity:0.3,
    position:'absolute',
    left:30,
    top:280,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  flipCard: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:20,
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    
    position: "absolute",
    top: 0,
  },
  flipText: {
    width: 90,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  cardContainer:{
    flex:1,
  },
  cardSentence:{
    color:'white',
    fontSize:18,  
    maxWidth:190,
    
  },
  cardProgress:{
    color:'white',
    fontSize:18,  
    width:115,
    textAlign:'right',
    position:'absolute',
    left:210,
    top:150,
  },
  cardFooter:{
    marginLeft:20,
    marginRight:20,
    marginBottom:20,
    flex:1,
    flexDirection: 'row',
    alignItems:'flex-end',
    
  },


  cardTransciption:{
    color:'white',
    fontSize:25,
    marginLeft:20,
    marginTop:0,
    
  },


  cardWord:{
    color:'white',
    fontSize:36,
    marginLeft:20,
    marginTop:10,
    fontWeight: 500,
  },

  

  cardWrapper:{
    padding:10,
    maxWidth: 360,
    flex:1,
    minHeight: 200,
    minWidth: 360,
    borderRadius:26,
    marginTop:50,
    backfaceVisibility:'hidden',
  },

  

  topicWrapper:{
    marginTop: 50,
    minHeight: 50,
    maxHeight: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 230,
    
    minHeight:65,
    backgroundColor: '#67A4FF',
    borderRadius: 55,
    marginBottom: 30,
  },
  topicWrapperTitle:{
    fontSize:19,
    color:'white',
  },





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
    minHeight: 85,
    maxHeight: 85,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    height: 85,
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
    maxHeight: 90 ,
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
    marginTop: 60,
    minHeight: 50,
    maxHeight: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 175,
    height: 50,
    backgroundColor: '#8C8C8C',
    borderRadius: 55,
    marginBottom: 30,
  },
  buttonTitle:{
    fontSize:25,
    color:'white',
  },
});

export default cardMenuWrapper(CardScreen);

//AppRegistry.registerComponent('CardScreen', () => CardScreen);