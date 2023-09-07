import React, { Component, createRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import * as Progress from 'react-native-progress';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  PanResponder,
  Pressable,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  BackHandler,
} from 'react-native';
import GestureRecognizer, {swipeDirections,} from 'react-native-swipe-gestures';


import CardsSwipe from 'react-native-cards-swipe';

import { GestureHandlerRootView } from 'react-native-gesture-handler';



import cardMenuWrapper from './cardMenuWrapper';
import { settingsController, statisticsController, userController } from '../../../store/store.js';

import IonIcon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Speech from 'expo-speech';

import { Shadow } from 'react-native-shadow-2';



const CardsData = [
  { bg: 'red' },
  { bg: 'blue' },
  { bg: 'white' },
  { bg: 'red' },
];

class CardScreen extends Component {
  UNSAFE_componentWillMount() {
    this.pan = new Animated.ValueXY();
    this.panResponder = PanResponder.create({
        // Asking to be a responder
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,

        //onShouldBlockNativeResponder: (evt, gestureState) => false,
        // gesture started
        onPanResponderGrant: (e, gestureState) => {
          console.log("Started");
        },
        // moving
        onPanResponderMove: (e, gestureState) => {
          console.log("Moving", gestureState);
          if(gestureState.dx < -10) {
            this.setState({scaleKnow: 0.45});
            this.setState({rightOpacity: 0.55});
          }
          if(gestureState.dx < -20) {
            this.setState({scaleKnow: 0.5});
            this.setState({rightOpacity: 0.6});
          }
          if(gestureState.dx < -30) {
            this.setState({scaleKnow: 0.55});
          }
          if(gestureState.dx < -40) {
            this.setState({scaleKnow: 0.6});
            this.setState({rightOpacity: 0.65});
          }
          if(gestureState.dx < -50) {
            this.setState({scaleKnow: 0.65});
          }
          if(gestureState.dx < -60) {
            this.setState({scaleKnow: 0.7});
            this.setState({rightOpacity: 0.7});
          }
          if(gestureState.dx < -70) {
            this.setState({scaleKnow: 0.75});
          }
          if(gestureState.dx < -80) {
            this.setState({scaleKnow: 0.8});
            this.setState({rightOpacity: 0.75});
          }
          if(gestureState.dx < -90) {
            this.setState({scaleKnow: 0.85});
          }
          if(gestureState.dx < -100) {
            this.setState({scaleKnow: 0.9});
            this.setState({rightOpacity: 0.8});
          }



          if(gestureState.dx > 10) {
            this.setState({scaleNotKnow: 0.45});
            this.setState({rightOpacity: 0.55});
          }
          if(gestureState.dx > 20) {
            this.setState({scaleNotKnow: 0.5});
            this.setState({rightOpacity: 0.6});
          }
          if(gestureState.dx > 30) {
            this.setState({scaleNotKnow: 0.55});
          }
          if(gestureState.dx > 40) {
            this.setState({scaleNotKnow: 0.6});
            this.setState({rightOpacity: 0.65});
          }
          if(gestureState.dx > 50) {
            this.setState({scaleNotKnow: 0.65});
          }
          if(gestureState.dx > 60) {
            this.setState({scaleNotKnow: 0.7});
            this.setState({rightOpacity: 0.7});
          }
          if(gestureState.dx > 70) {
            this.setState({scaleNotKnow: 0.75});
          }
          if(gestureState.dx > 80) {
            this.setState({scaleNotKnow: 0.8});
            this.setState({rightOpacity: 0.75});
          }
          if(gestureState.dx > 90) {
            this.setState({scaleNotKnow: 0.85});
          }
          if(gestureState.dx > 100) {
            this.setState({scaleNotKnow: 0.9});
            this.setState({rightOpacity: 0.8});
          }

        },

        onPanResponderTerminationRequest: (evt, gestureState) => false,
        onPanResponderRelease: () => {
          console.log("Workkkkk");
          this.setState({scaleKnow: 0.4});
          this.setState({scaleNotKnow: 0.4});
          this.setState({rightOpacity: 0.5});
          this.pan.extractOffset();
        },
      });
    this.flipPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        //onShouldBlockNativeResponder: (evt, gestureState) => false,

    });


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
    const { user, settings} = this.props;
    
    console.log(typeof parseInt(this.pan.x));
    console.log(this.pan.y);
    console.log(this.panResponder);
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
    if (this.words != undefined) {
      this.setState({wordProgress: `1/${this.words.length}`});
      this.setState({floatProgress: 1/this.words.length/2});
      this.setState({category: this.words[this.currentWordInd].category[settingsController.SettingsModel.motherTongue]});
      const crData = [];
      for (let i = 0; i < this.words.length; i++) {
        crData.push({
          word: this.words[i].word,
          wordTranslated: this.words[i].translation[settingsController.SettingsModel.motherTongue],
          category: this.words[i].category[settingsController.SettingsModel.motherTongue],
          pronunciation: this.words[i].pronunciation,
          sentence: this.words[i].sentence.en,
          sentenceTranslated: this.words[i].sentence[settingsController.SettingsModel.motherTongue]
        });
      }
      this.setState({CardsData: crData});
      this.learnedWords = [];
      this.notLearnedWords = [];
      // this.setState({translatex: parseInt(this.props.pan.x)});
      // console.log("did", this.state.translateX);
    }

    
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = async () => {
    if (this.learnedWords != undefined && this.notLearnedWords != undefined) {
      await userController.addWords(this.learnedWords.concat(this.notLearnedWords));
      //await statisticsController.addWords(this.learnedWords.concat(this.notLearnedWords).length);
    }
    this.props.navigation.goBack();
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    return true;
  };

  constructor(props) {
    super(props);
    this.state = {
      scaleKnow: 0.4,
      scaleNotKnow: 0.4,
      rightOpacity: 0.5,
      gestureName: 'none',
      backgroundColor: '#fff',
      category:'',
      wordProgress:``,
      floatProgress:0.01,
      notShow: true,
      CardsData,
    };
    //console.log("Ctor", this.state.translateX);
  }

  onCardMove(event) {
    const { translationX, translationY } = event.nativeEvent;
    console.log(translationX, translationY);
  }

  // onPanGestureEvent = Animated.event(
  //   [
  //     {
  //       nativeEvent: {
  //         translationX: this.translateX,
  //       },
  //     },
  //   ],
  //   { useNativeDriver: true }
  // );

  onSwipeStart(event) {
    console.log(event);
  }

  onSwipeLeft(gestureState) {
    //this code is triggered on swipe left
    console.log(gestureState);
    if (this.words != undefined && this.learnedWords != undefined) {
      this.learnedWords.push({ word: this.words[this.currentWordInd], learned: 0.8 });
      if (this.currentWordInd == this.words.length - 1) {
        this.currentWordInd++;
        this.setState({floatProgress: this.state.floatProgress + 1/this.words.length});
      }
      else if (this.currentWordInd < this.words.length - 1) {
        this.currentWordInd++;
        this.setState({category: this.words[this.currentWordInd].category[settingsController.SettingsModel.motherTongue]});
        if (this.currentWordInd == 1)
          this.setState({floatProgress: this.state.floatProgress + 1/this.words.length/2});
        else
          this.setState({floatProgress: this.state.floatProgress + 1/this.words.length});

        this.setState({wordProgress: this.currentWordInd+1 + `/${this.words.length}`});
      }
    }
  }
 
  onSwipeRight(gestureState) {
    //this code is triggered on swipe right
    if (this.words != undefined && this.learnedWords != undefined) {
      this.notLearnedWords.push({ word: this.words[this.currentWordInd], learned: 0.1});
      if (this.currentWordInd == this.words.length - 1) {
        this.currentWordInd++;
        this.setState({floatProgress: this.state.floatProgress + 1/this.words.length});
      }
      else if (this.currentWordInd < this.words.length - 1) {
        this.currentWordInd++;
        this.setState({category: this.words[this.currentWordInd].category[settingsController.SettingsModel.motherTongue]});
        if (this.currentWordInd == 1)
          this.setState({floatProgress: this.state.floatProgress + 1/this.words.length/2});
        else
          this.setState({floatProgress: this.state.floatProgress + 1/this.words.length});
        this.setState({wordProgress: this.currentWordInd+1 + `/${this.words.length}`});
      }
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
    setTimeout(() => this.setState({notShow:!this.state.notShow}), 120);
    

  }

  startPronounce(word) {
    console.log("Pressed button");
    Speech.speak(word, {language: 'en'});
  }

  handleButtonClick(btnType) {
    if (btnType == 'flip') {
      this.flipCard();
    }
    else if (btnType == 'pronounce') {
      this.startPronounce();
    }
  }

  async handleFinish() {
    if (this.learnedWords != undefined && this.notLearnedWords != undefined) {
      await userController.addWords(this.learnedWords.concat(this.notLearnedWords));
      //await statisticsController.addWords(this.learnedWords.concat(this.notLearnedWords).length);
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
      <GestureHandlerRootView>
      <ScrollView showsVerticalScrollIndicator={false}>
        
          <View style={styles.mainWrapper}>


            <View style={styles.header}>
              <Image source={require('../../../assets/img/speech_logo.png')} style={styles.image}></Image> 
            </View>


            <View style={styles.topicWrapper}>          
              <Text style={styles.topicWrapperTitle}>{this.state.category}</Text>                            
            </View>

              <View style={styles.cardsContainer}>
                <Shadow startColor={'#32f078'} endColor={'#32f078'} distance={15} stretch={true} paintInside={true} 
                        containerStyle={{zIndex: 3, position: 'relative', left: -75, opacity: this.state.rightOpacity, transform: [{scale: this.state.scaleKnow}]}}
                        >
                  <View style={[styles.knowLabel,]}>
                    <FontAwesome
                      name='check'
                      size={45}
                      color='white'
                      style={{
                        marginRight: 7,
                        opacity: 0.8
                      }}
                    />
                  </View>
                </Shadow>
                  <CardsSwipe
                    cards={this.state.CardsData}
                    loop={false}
                    lowerCardZoom={0.7}
                    rotationAngle={20}
                    onSwipedRight={(state) => this.onSwipeRight(state)}
                    onSwipedLeft={(state) => this.onSwipeLeft(state)}
                    onSwipeStart={() => console.log("Swipe swipe swipe")}
                    renderCard={(card) => (
                      <Pressable style={styles.cardPressHandler} onPress={() => this.flipCard()}>
                        <Animated.View style={[styles.flipCard, frontAnimatedStyle, {display: this.state.notShow ? 'flex' : 'none', opacity: this.frontOpacity}]}  {...this.panResponder.panHandlers}>
                          <LinearGradient
                                colors={['#4ad3b6', '#4f9ae1']}
                                style={[ styles.cardWrapper ]}>
                              <View style={[{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
                                <Text style={styles.cardWord}>{card.word}</Text>
                                <TouchableOpacity style={styles.pronounceBtn} onPressIn={() => this.startPronounce(card.word)}>
                                    <IonIcon
                                      name='volume-medium'
                                      size={45}
                                      color='white'
                                    />
                                </TouchableOpacity>
                              </View>
                              <Text style={styles.cardTransciption}>{card.pronunciation}</Text>
                              <View style={styles.cardFooter}>
                                <Text style={styles.cardSentence}>{card.sentence}</Text>                        
                              </View>     
                              <Text style={styles.cardProgress}>{this.state.wordProgress}</Text>
                          </LinearGradient>
                        </Animated.View>
                        <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle, {display: this.state.notShow ? 'none' : 'flex', opacity: this.backOpacity}]}>
                          <LinearGradient
                            colors={['#4ad3b6', '#4f9ae1']}
                            style={[ styles.cardWrapper ]}>
                            <View style={[{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
                                <Text style={styles.cardWord}>{card.wordTranslated}</Text>
                                <TouchableOpacity style={styles.pronounceBtn} onPress={() => this.startPronounce(card.word)}>
                                    <IonIcon
                                      name='volume-medium'
                                      size={45}
                                      color='white'
                                    />
                                </TouchableOpacity>
                              </View>
                            <Text style={styles.cardTransciption}>{card.pronunciation}</Text>
                            <View style={styles.cardFooter}>
                              <Text style={styles.cardSentence}>{card.sentenceTranslated}</Text>
                                    
                            </View>    
                            <Text style={styles.cardProgress}>{this.state.wordProgress}</Text>    
                          </LinearGradient>
                    </Animated.View>
                      </Pressable>                    
                    )}/>
                <Shadow startColor={'#f23f51'} endColor={'#f23f51'} distance={15} stretch={true} paintInside={true} 
                        containerStyle={{zIndex: 3, position: 'relative', left: 75, opacity: this.state.rightOpacity, transform: [{scale: this.state.scaleNotKnow}]}}
                        >
                  <View style={[styles.notKnowLabel,]}>
                    <FontAwesome
                      name='close'
                      size={50}
                      color='white'
                      style={{
                        marginLeft: 7,
                        opacity: 0.8
                      }}
                    />
                  </View>
                </Shadow>
              </View>

             
            <Text style={styles.progressBarTitle}>{localization.data.progressLabelText}</Text>
            <Progress.Bar style={styles.progressBar} progress={this.state.floatProgress} width={310} color={'#00D22E'}  unfilledColor={'#E8E8E8'} borderWidth={0}/>



            <TouchableOpacity style={styles.button} onPress={() => this.handleFinish()}>
              <Text style={styles.buttonTitle}>{localization.data.finishLabelText}</Text>
            </TouchableOpacity>

          </View>
        
      </ScrollView>
      </GestureHandlerRootView>
    );
  }
}

const styles = StyleSheet.create({
  cardsContainer: {
    marginTop: 90,
    flex: 1,
    marginBottom: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  knowLabel: {
    width: 130,
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0,
    borderTopEndRadius: 130,
    borderBottomEndRadius: 130,
    height: 130,
    backgroundColor: '#32f078',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  notKnowLabel: {
    width: 130,
    borderTopStartRadius: 130,
    borderBottomStartRadius: 130,
    borderTopEndRadius: 0,
    borderBottomEndRadius: 0,
    height: 130,
    backgroundColor: '#f23f51',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  elevation: {
    elevation: 10,
    height: 10,
    shadowColor: '#52006A',
  },
  pronounceBtn: {
    width:45,
    height:45,
    marginRight:20,
    marginTop:10,
  },
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
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  flipCard: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
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
    maxHeight: 100,
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