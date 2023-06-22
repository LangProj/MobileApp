import React, { useEffect } from 'react';
import {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Image, ScrollView, BackHandler} from 'react-native';

import * as Speech from 'expo-speech';
import Voice from '@react-native-voice/voice';

import { StatusBar } from 'expo-status-bar';
import { Linking } from 'react-native';
import { useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { userController } from '../../store/store';





export default function PassiveRecordScreen({ navigation }) {

    const localization = useSelector(state => state.localization);

    let [started, setStarted] = useState(false);
    let [results, setResults] = useState([]);
    let [sortedRes, setSortedRes] = useState([]);
    let [needToCheckRecognition, setNeedToCheckRecognition] = useState(false);
    let [resStr, setResStr] = useState("");
    let [resArray, setResArray] = useState([]);
    let [wordsToSave, setWordsToSave] = useState([]);
    let [modalVisible, setModalVisible] = useState(false);

    let [logs, setLogs] = useState([]);


    // useEffect(() => {
    //     // results filtering
    //     const res = [];
    //     for (let i = 0; i < results.length; i++) {
    //         if (!res.includes(results[i]))
    //             res.push(results[i]);
    //     }
    //     setSortedRes(res);
    // }, [results]);

    const onBackPress = () => {
        navigation.goBack();
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', onBackPress);

        Voice.onSpeechError = onSpeechError;
        Voice.onSpeechResults = onSpeechResults;
    
        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        }
    }, []);
    
    const startSpeechToText = async () => {
        setStarted(true);
        setNeedToCheckRecognition(true);
        await Voice.start("en-US", { continuous: true });
        setInterval(async () => {
            if (needToCheckRecognition) {
                await Voice.isRecognizing().then((result) => {
                    if (result != 1) {
                        Voice.start("en-US", { continuous: true });
                      } else {
                        return true;
                      }
                });
            }
        }, 2000);
    };

    const stopSpeechToText = async () => {
        setNeedToCheckRecognition(false);
        await Voice.stop();
        setStarted(false);
    };

    const onSpeechResults = (result) => {
        let resStr = result.value[0];

        let gotArray = resStr.split(" ");

        let oldRes = results;
        let res = oldRes.concat(gotArray);
        setResults(res);

        let resSorted = sortedRes;
        for (let i = 0; i < res.length; i++) {
            if (!resSorted.includes(res[i])) {
                resSorted.push(res[i]);
            }
        }
        setSortedRes(resSorted);

        if (needToCheckRecognition) {
            startSpeechToText();
        }
    };

    const onSpeechError = (error) => {
        console.log(error);
    };

    const toggleSelect = (index) => {
        let new_words = [];
        if (wordsToSave.includes(sortedRes[index])) {
            new_words = wordsToSave.filter((item) => item !== sortedRes[index]);
        }
        else {
            new_words = wordsToSave.filter((item) => true);
            new_words.push(sortedRes[index]);
            console.log(new_words);
        }
        setWordsToSave(new_words);
    }

    const loadSimpleWords = async () => {
        if (wordsToSave.length < 1)
            setModalVisible(true);
        else {
            console.log("Here");
            const fetchRes = await userController.addWordsToDBByWords(wordsToSave);
            console.log(fetchRes);
        }
    };

    const backButtonHandler = () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        navigation.goBack();

    };
    return (
    
        <View style={{flex: 1, alignItems: 'center'}}>
            <View style={[{backgroundColor:'#00B9D2',height:110,width:'100%',justifyContent:'space-around',zIndex:999}]}>
                <View style={[{marginTop:20,flexDirection:'row',width:'100%',justifyContent:'space-around', alignItems:'center'}]}>
                    <TouchableOpacity style={[{width:60,height:60}]} onPress={backButtonHandler} >
                        <IonIcon
                            name='chevron-back'
                            size={60}
                            color='white'
                        />
                    </TouchableOpacity>
                    <Text style={[{fontSize:28,color:'white',fontWeight:'bold',textAlign:'center'}]}>{localization.data.recordLabelText}</Text>
                    <TouchableOpacity style={[{backgroundColor:'#00B9D2',width:60,height:60}]}></TouchableOpacity>
                </View>
            
            </View>
            <View style={{flex: 1, maxHeight:50, flexDirection:'row',}}>
                {started ? 
                    <TouchableOpacity style={[styles.shadow,{marginTop:20, marginRight: 10, borderRadius:10, width:'46%',height:50,backgroundColor:'#FF7676',alignItems:'center',justifyContent:'center'}]} onPress={stopSpeechToText}>
                        <Text style={{color:'white',fontSize:18,fontWeight:500}}>Stop Recording</Text>
                    </TouchableOpacity> 
                    : 
                    <TouchableOpacity style={[styles.shadow,{marginTop:20, marginRight: 10, borderRadius:10, width:'46%',height:50,backgroundColor:'#65A3FF',alignItems:'center',justifyContent:'center'}]} onPress={startSpeechToText}>
                        <Text style={{color:'white',fontSize:18,fontWeight:500}}>Start Recording</Text>
                    </TouchableOpacity>
                }
                <TouchableOpacity style={[styles.shadow,{marginTop:20, marginLeft: 10, borderRadius:10, width:50,height:50,backgroundColor:'#65A3FF',alignItems:'center',justifyContent:'center'}]} disabled={started} onPress={loadSimpleWords}>
                    <Icon
                        name='save-alt'
                        size={30}
                        color='white'
                    />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{flex: 1,marginTop:40, marginBottom:30, width:'85%', padding:30, borderWidth:1, borderColor: '#65A3FF', borderRadius: 10, textAlign: 'center'}}>
                {sortedRes.map((result, index) => <TouchableOpacity style={{paddingHorizontal: 20, paddingVertical: 15, verticalAlign: 'middle', borderBottomWidth: 1, borderBottomColor: '#B9C5D7'}} key={index} disabled={started}  onPress={() => toggleSelect(index)}>
                    {wordsToSave.includes(result) ? <Text style={{fontSize: 18, color:'#65A3FF'}}>{result}</Text> : <Text style={{fontSize: 18, color:'black'}}>{result}</Text>}
                </TouchableOpacity>)}
                <Text style={{marginBottom:30}}></Text>
                <Modal
                    animationType={'fade'}
                    transparent={true}
                    visible={modalVisible}
                    statusBarTranslucent={true}
                    onRequestClose={() => {
                        
                    }}>
                    
                    <View style={styles.centeredView}>
                        
                        <View style={[styles.modalView]}>
                        <View style={[{marginBottom:15,marginTop:20,height:75,width:'100%',justifyContent:'center',alignItems:'center'}]}>
                            <TouchableOpacity style={[{height:50,width:50,backgroundColor:'gray',position:'relative',left:120,top:0}]} onPress={() => setModalVisible(false)}></TouchableOpacity>
                        </View>
                        <Text style={{fontSize:25, fontWeight:500,color:'white'}}>Choose at least one word</Text>
                        </View>
                    </View>

                    <View style={styles.activeFilterUI}/>       
                </Modal>
            </ScrollView>
            <View style={{position:'absolute',zIndex: modalVisible ? 999 : -4,backgroundColor:'black',height:'100%',width:'100%',opacity: modalVisible ? 0.5 : 0}}>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    shadow:{
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
    
        elevation: 16,
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
        height:200,
        width:340,
        margin: 20,
        backgroundColor: '#FF7676',
        borderRadius: 25,
        
        alignItems: 'center',
        
      },
});
