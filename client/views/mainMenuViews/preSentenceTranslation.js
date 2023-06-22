import React from 'react';
import {useState,useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TextInput, Touchable, TouchableWithoutFeedback, Modal, BackHandler} from 'react-native';
import Checkbox from 'expo-checkbox';
import { StatusBar } from 'expo-status-bar';
import { Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ALL_TOPICS = {
  A1: [
    'Глагол to be',
    'Единственное и множественное число. Понятие «артикль».',
    'Местоимения.',
    'Present Simple.',
    'Наречия частоты.',
    'Prepositions of time.',
    'Открытые и закрытые вопросы, разница с be и do.',
    'Can и can\'t.',
    'Like, love, hate с герундием.',
    'Present Continuous.',
    'There is/There are.',
    'Prepositions of place.',
    'Повелительное наклонение.',
    'Past Simple.',
    'Irregular verbs.',
    'There was/There were.',
    'Some/any.',
    'Many/much и little/few, a lot of.',
    'Исчисляемые/неисчисляемые существительные.',
    'How much/How many.',
    'Прилагательные сравнительное степени.',
    'Прилагательные превосходной степени.',
    'Future Simple.',
    'To be going to.',
    'Present Perfect.'
  ],
  A2: [
    'Союзы.',
    'Артикли.',
    'Present Continuous для будущих договоренностей.',
    'Past Continious.',
    'Past Simple и Past Continious в сложносочиненном предложении.',
    'Present Perfect.',
    'Present Perfect (for, since).',
    'Разница между Present Perfect и Past Simple.',
    'Something/anything/nothing.',
    'Too/enough.',
    'Will/wont (спонтанные обещания, решения).',
    'Употребление инфинитива.',
    'Употребление герундия.',
    'Модальные глаголы (must, mustn\'t, have to, don\'t have to).',
    'Relative clause.',
    'Модальные глаголы (should, may, might).',
    'Could/Couldn\'t.',
    'Would like.',
    'Наречия.'
  ],
  B1: [
    'Условные предложения первого и второго типов.',
    'Статичные и динамичные глаголы.',
    'Конструкция used to/ didn’t use to, разница с would.',
    'To be used to/ to get used to.',
    'Косвенная речь, разница между say и tell.',
    'Модальные глаголы (might, must, can(\'t)) для предположений.',
    'Can, could, be able to.',
    'Question tags.',
    'Past Perfect.',
    'Согласование времен.',
    'Present Perfect Continious.',
    'Пассивный залог.'
  ],
  B2: [
    'Нулевой артикль.',
    'Указатели множества a little/little, a few/few, plenty of/ a lot of, all, every, both, no, none, every, most.',
    'Third conditional и Mixed conditional.',
    'the ... the ...comparatives.',
    'Разница между Present Perfect и Present Perfect Continuous.',
    'Narrative tenses.',
    'Future time clauses.',
    'Конструкции с wish.',
    'Модальные глаголы и перфектный инфинитив.',
    'Verbs of the senses.',
    'Passive Voice.',
    'Whatever, whenever, whoever.',
    'Past Perfect Continuous, Future Continuous, Future Perfect.'
  ],
  C1: [
    'Смешанный тип условных предложений.',
    'Инверсия.',
    'Обороты с get и have.',
    'Пунктуация.',
    'Ellipsis.',
    'Future Perfect Continuous.',
    'Future in the Past.',
    'Cleft sentences.',
    'Wishes and regrets.'
  ]
};

const USER_LEVEL = ['A1']


export default function PreSentenceTranslationScreen({ navigation }) {
  let [modalVisible, setModalVisible] = useState(false)
  let [checkedItems, setCheckedItems] = useState(
    {
      A1:[],
      A2:[],
      B1:[],
      B2:[],
      C1:[]
    }
  );
  let [isExpanded, setIsExpanded] = useState(
    {
      A1:false,
      A2:false,
      B1:false,
      B2:false,
      C1:false
    }
  );

  useEffect(() => {
    const onBackPress = () => {
      navigation.goBack();
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
  }, []);

  const handleToggle = (level) => {
    if (USER_LEVEL.includes(level)){
      setIsExpanded(prevState => {
        return {
          ...prevState,
          [level]: !prevState[level]
        };
      });
    }
  };
  
  const handleCheckboxToggle = (level, item) => {
    let temp = JSON.parse(JSON.stringify(checkedItems));
  
    if (!temp[level]) {
      temp[level] = []; 
    }
  
    if (temp[level].includes(item)) {
      temp[level] = temp[level].filter((checkedItem) => checkedItem !== item);
    } else {
      temp[level] = [...temp[level], item];
    }
  
    setCheckedItems(temp);
  };



  
  const generate = () => {
    let counter = checkedItems.A1.length + checkedItems.A2.length + checkedItems.B1.length + checkedItems.B2.length + checkedItems.C1.length 
    if (counter == 0){
      setModalVisible(true)
    }else{
      navigation.navigate("SentenceScreen", {data: checkedItems});
      // - this code executes when generate() is proper :)
      // - No way. You must be kidding
    }
  };



  const test = () => {
    
    console.log(checkedItems);
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: '#00B9D2',
          height: 110,
          width: '100%',
          justifyContent: 'space-around',
          zIndex: 999,
        }}
      >
        <View style={{ marginTop: 20, flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
          <TouchableOpacity style={{ width: 75, height: 75, backgroundColor: 'gray' }} onPress={() => test()} />
          <Text style={{ fontSize: 28, color: 'white', fontWeight: 'bold', textAlign: 'center', marginTop: 20 }}>
            Sentences
          </Text>
          <TouchableOpacity style={{ backgroundColor: '#00B9D2', width: 75, height: 75 }} />
          {/* <Image source={require('../../assets/img/speech_logo.png')} style={styles.image}></Image> */}
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainWrapper}>
          {/* a1 */}
          <View style={[{ textAlign: 'center',justifyContent:'center',alignItems:'center', width:350, borderRadius: 10, borderColor: '#00B2FF', borderWidth: 2 ,marginTop:20}]}>
            <TouchableOpacity style={[{ textAlign: 'center', margin: 20, height:65,justifyContent:'center',alignItems:'center', width:350, }]} onPress={() => handleToggle('A1')}>
              <Text style={[{ textAlign: 'center', margin: 20,fontSize:20,fontWeight:500 }]} >{`${'A1'}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{ position:'relative', height:50, width:50,top:-25 ,left:100,backgroundColor: isExpanded.A1 ? 'green' : 'red',marginTop:-50}]} onPress={() => handleToggle('A1')}/>
            <TouchableOpacity style={[{ position:'relative',display: USER_LEVEL.includes('A1') ? 'none' : 'flex', height:50, width:50,top:-25 ,left:-100,backgroundColor: 'red',marginTop:-50}]} onPress={() => handleToggle('A1')}/>
            {isExpanded.A1 && (
              <View style={{ marginLeft: 40 ,marginRight:40,marginBottom:20}}>
                {ALL_TOPICS.A1.map((item, index) => (
                  <TouchableWithoutFeedback key={index} onPress={() => handleCheckboxToggle('A1',item)}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 10,
                        margin: 5,
                      }}
                    >
                      <Checkbox
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginVertical: 5,
                          margin: 15,
                        }}
                        value={checkedItems.A1.includes(item)}
                        onValueChange={() => handleCheckboxToggle('A1',item)}
                        color={"#65A3FF"}
                      />

                      <Text style={{ fontSize: 20, fontWeight: '500' , width:270}}>{item}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                ))}
              </View>
            )}
          </View>

          {/* a2 */}
          <View style={[{ textAlign: 'center',justifyContent:'center',alignItems:'center', width:350, borderRadius: 10, borderColor: '#00B2FF', borderWidth: 2 ,marginTop:20}]}>
            <TouchableOpacity style={[{ textAlign: 'center', margin: 20, height:65,justifyContent:'center',alignItems:'center', width:350, }]} onPress={() => handleToggle('A2')}>
              <Text style={[{ textAlign: 'center', margin: 20,fontSize:20,fontWeight:500 }]} >{`${'A2'}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{ position:'relative', height:50, width:50,top:-25 ,left:100,backgroundColor: isExpanded.A2 ? 'green' : 'red',marginTop:-50}]} onPress={() => handleToggle('A2')}/>
            <TouchableOpacity style={[{ position:'relative',display: USER_LEVEL.includes('A2') ? 'none' : 'flex', height:50, width:50,top:-25 ,left:-100,backgroundColor: 'red',marginTop:-50}]} onPress={() => handleToggle('A2')}/>
            {isExpanded.A2 && (
              <View style={{ marginLeft: 40 ,marginRight:40,marginBottom:20}}>
                {ALL_TOPICS.A2.map((item, index) => (
                  <TouchableWithoutFeedback key={index} onPress={() => handleCheckboxToggle('A2',item)}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 10,
                        margin: 5,
                      }}
                    >
                      <Checkbox
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginVertical: 5,
                          margin: 15,
                        }}
                        value={checkedItems.A2.includes(item)}
                        onValueChange={() => handleCheckboxToggle('A2',item)}
                        color={"#65A3FF"}
                      />
                      <Text style={{ fontSize: 20, fontWeight: '500', width:270 }}>{item}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                ))}
              </View>
            )}
          </View>
          

          {/* b1 */}
          <View style={[{ textAlign: 'center',justifyContent:'center',alignItems:'center', width:350, borderRadius: 10, borderColor: '#00B2FF', borderWidth: 2 ,marginTop:20}]}>
            <TouchableOpacity style={[{ textAlign: 'center', margin: 20, height:65,justifyContent:'center',alignItems:'center', width:350, }]} onPress={() => handleToggle('B1')}>
              <Text style={[{ textAlign: 'center', margin: 20,fontSize:20,fontWeight:500 }]} >{`${'B1'}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{ position:'relative', height:50, width:50,top:-25 ,left:100,backgroundColor: isExpanded.B1 ? 'green' : 'red',marginTop:-50}]} onPress={() => handleToggle('B1')}/>
            <TouchableOpacity style={[{ position:'relative',display: USER_LEVEL.includes('B1') ? 'none' : 'flex', height:50, width:50,top:-25 ,left:-100,backgroundColor: 'red',marginTop:-50}]} onPress={() => handleToggle('B1')}/>
            {isExpanded.B1 && (
              <View style={{ marginLeft: 40 ,marginRight:40,marginBottom:20}}>
                {ALL_TOPICS.B1.map((item, index) => (
                  <TouchableWithoutFeedback key={index} onPress={() => handleCheckboxToggle('B1',item)}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 10,
                        margin: 5,
                      }}
                    >
                      <Checkbox
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginVertical: 5,
                          margin: 15,
                        }}
                        value={checkedItems.B1.includes(item)}
                        onValueChange={() => handleCheckboxToggle('B1',item)}
                        color={"#65A3FF"}
                      />
                      <Text style={{ fontSize: 20, fontWeight: '500', width:270 }}>{item}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                ))}
              </View>
            )}
          </View>
          
          {/* b2 */}
          <View style={[{ textAlign: 'center',justifyContent:'center',alignItems:'center', width:350, borderRadius: 10, borderColor: '#00B2FF', borderWidth: 2 ,marginTop:20}]}>
            <TouchableOpacity style={[{ textAlign: 'center', margin: 20, height:65,justifyContent:'center',alignItems:'center', width:350, }]} onPress={() => handleToggle('B2')}>
              <Text style={[{ textAlign: 'center', margin: 20,fontSize:20,fontWeight:500 }]} >{`${'B2'}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{ position:'relative', height:50, width:50,top:-25 ,left:100,backgroundColor: isExpanded.B2 ? 'green' : 'red',marginTop:-50}]} onPress={() => handleToggle('B2')}/>
            <TouchableOpacity style={[{ position:'relative',display: USER_LEVEL.includes('B2') ? 'none' : 'flex', height:50, width:50,top:-25 ,left:-100,backgroundColor: 'red',marginTop:-50}]} onPress={() => handleToggle('B2')}/>
            {isExpanded.B2 && (
              <View style={{ marginLeft: 40 ,marginRight:40,marginBottom:20}}>
                {ALL_TOPICS.B2.map((item, index) => (
                  <TouchableWithoutFeedback key={index} onPress={() => handleCheckboxToggle('B2',item)}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 10,
                        margin: 5,
                      }}
                    >
                      <Checkbox
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginVertical: 5,
                          margin: 15,
                        }}
                        value={checkedItems.B2.includes(item)}
                        onValueChange={() => handleCheckboxToggle('B2',item)}
                        color={"#65A3FF"}
                      />
                      <Text style={{ fontSize: 20, fontWeight: '500', width:270 }}>{item}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                ))}
              </View>
            )}
          </View>

          {/* c1 */}
          <View style={[{ textAlign: 'center',justifyContent:'center',alignItems:'center',marginBottom:40, width:350, borderRadius: 10, borderColor: '#00B2FF', borderWidth: 2 ,marginTop:20}]}>
            <TouchableOpacity style={[{ textAlign: 'center', margin: 20, height:65,justifyContent:'center',alignItems:'center', width:350, }]} onPress={() => handleToggle('C1')}>
              <Text style={[{ textAlign: 'center', margin: 20,fontSize:20,fontWeight:500 }]} >{`${'C1'}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{ position:'relative', height:50, width:50,top:-25 ,left:100,backgroundColor: isExpanded.C1 ? 'green' : 'red',marginTop:-50}]} onPress={() => handleToggle('C1')}/>
            <TouchableOpacity style={[{ position:'relative',display: USER_LEVEL.includes('C1') ? 'none' : 'flex', height:50, width:50,top:-25 ,left:-100,backgroundColor: 'red',marginTop:-50}]} onPress={() => handleToggle('C1')}/>
            {isExpanded.C1 && (
              <View style={{ marginLeft: 40 ,marginRight:40,marginBottom:20}}>
                {ALL_TOPICS.C1.map((item, index) => (
                  <TouchableWithoutFeedback key={index} onPress={() => handleCheckboxToggle('C1',item)}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 10,
                        margin: 5,
                      }}
                    >
                      <Checkbox
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginVertical: 5,
                          margin: 15,
                        }}
                        value={checkedItems.C1.includes(item)}
                        onValueChange={() => handleCheckboxToggle('C1',item)}
                        color={"#65A3FF"}
                      />
                      <Text style={{ fontSize: 20, fontWeight: '500', width:270 }}>{item}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                ))}
              </View>
            )}
          </View>

          
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
              <Text style={{fontSize:25, fontWeight:500,color:'white'}}>Choose at least one topic</Text>
            </View>
          </View>

          <View style={styles.activeFilterUI}/>       
        </Modal>



        </View>
      </ScrollView>
      <View>
        <TouchableOpacity onPress={() => generate()} style={[styles.shadow,{position:'absolute',left:'29%',bottom:10,borderRadius:10, width:'42%',height:50,backgroundColor:'#70D457',alignItems:'center',justifyContent:'center'}]}>
          <Text style={[{color:'white',fontSize:18,fontWeight:500}]}>Generate</Text>
        </TouchableOpacity>
      </View>
      <View style={{position:'absolute',zIndex: modalVisible ? 999 : -4,backgroundColor:'black',height:'100%',width:'100%',opacity: modalVisible ? 0.5 : 0}}>
      </View>
      <View style={styles.navBar}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
          <TouchableOpacity
            style={{ height: 50, backgroundColor: 'gray', width: 50 }}
            onPress={() => navigation.navigate('MainScreen')}
          />
          <TouchableOpacity
            style={{ height: 50, backgroundColor: 'gray', width: 50 }}
            onPress={() => navigation.navigate('VocabularyScreen')}
          />
          <TouchableOpacity
            style={{ height: 50, backgroundColor: 'gray', width: 50, borderBottomColor: '#65A3FF', borderBottomWidth: 3 }}
            onPress={() => navigation.navigate('PreSentenceScreen')}
          />
        </View>
      </View>


      
      
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
    height:'auto',
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
