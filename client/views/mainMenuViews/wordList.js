import React from 'react';
import {useState,useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Linking } from 'react-native';
import {Alert, Modal,Pressable,SafeAreaView,FlatList,} from 'react-native';


const Item = ({word,word_translated}) => (
  <View style={styles.item}>
    <Text style={[{fontSize:23,fontWeight:600,textAlign:'center'}]}>{word}/{word_translated}</Text>
  </View>
);



const ALL_WORDS = [
  {
    id: 1,
    word: 'nobleman',
    word_translated: 'вельможа',
    level: 'C1',
    category: 'Travel',
    part_of_speech: 'Noun',
    status: 'On study'
  },
  {
    id: 2,
    word: 'honeycomb',
    word_translated: 'стільник',
    level: 'B1',
    category: 'Eat',
    part_of_speech: 'Noun',
    status: 'Not learned'
  },
  {
    id: 3,
    word: 'tumbleweeds',
    word_translated: 'перекотиполе',
    level: 'B2',
    category: 'Travel',
    part_of_speech: 'Noun',
    status: 'Not learned'
  },
  
]


export default function WordListScreen({ navigation }) {

  let [filterUI, setFilterUI] = useState('disabled');
  let [List, setList] = useState(ALL_WORDS);

  let [filter_config, setFilter_config] = useState({
    parts_of_speech:[],
    word_status:[],
    category:[],
    level:[]
  });


  


  
  

  const handleFilterItemClick = (item,topic) => {
    
    let result = JSON.parse(JSON.stringify(filter_config))
    if(result[topic].includes(item)){
      const index = result[topic].indexOf(item)
      result[topic].splice(index, 1)     
    }else{
      console.log('i added an item')
      result[topic].push(item)
    }
    setFilter_config(result)
  };
  
  useEffect(() => {
    sortList();
  }, [filter_config]);
  
  
  
  function sortList(){
    
    let result = []
    
    if(filter_config.parts_of_speech.length == 0 &&
      filter_config.category.length == 0 &&
      filter_config.level.length == 0 &&
      filter_config.word_status.length == 0){
      result = ALL_WORDS
    }else{
      for(i = 0;i < ALL_WORDS.length;i++){
        if(filter_config.parts_of_speech.includes(ALL_WORDS[i].part_of_speech) || 
        filter_config.category.includes(ALL_WORDS[i].category) || 
        filter_config.word_status.includes(ALL_WORDS[i].status) || 
        filter_config.level.includes(ALL_WORDS[i].level)){
          result.push(ALL_WORDS[i])
        }
      }
    }  
    setList(result);
  }


  return (
    

    <View style={{flex: 1}}>
      <View style={[{backgroundColor:'#00B9D2',height:110,width:'100%',justifyContent:'space-around',zIndex:999}]}>
        <View style={[{marginTop:20,flexDirection:'row',width:'100%',justifyContent:'space-around'}]}>
          <TouchableOpacity style={[{width:75,height:75,backgroundColor:'gray'}]} onPress={() => navigation.goBack()}></TouchableOpacity>
          <Text style={[{fontSize:28,color:'white',fontWeight:'bold',textAlign:'center',marginTop:20}]}>Words</Text>
          <TouchableOpacity style={[{width:75,height:75,backgroundColor:'gray'}]} onPress={() => setFilterUI('main') }></TouchableOpacity>
          {/* <Image source={require('../../assets/img/speech_logo.png')} style={styles.image}></Image>  */}
        </View>
        
      </View>

        
        
      <View style={styles.mainWrapper}>   
      
      
        <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:5}]}
        style={[{height:500,width:350,backgroundColor:'white',}]}
        data={List}
        renderItem={({item}) => <Item word={item.word} word_translated={item.word_translated}/>}
        keyExtractor={item => item.id}/>

      
        

      </View>
        
      {/* filter menu modal   */}
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={filterUI != 'main' ? false : true}
        statusBarTranslucent={true}
        onRequestClose={() => {
          
        }}>
        
        <View style={styles.centeredView}>
          
          <View style={[styles.modalView]}>
            <View style={[{marginTop:40,height:50,width:'100%',justifyContent:'center',alignItems:'center'}]}>
              <Text style={[{fontSize:42,fontWeight:600}]}>Filter</Text>
              <TouchableOpacity style={[{height:50,width:50,backgroundColor:'gray',position:'relative',left:120,top:-45}]} onPress={() => setFilterUI('disabled')}></TouchableOpacity>
            </View>
            
            <TouchableOpacity style={styles.filterItemDisabled} onPress={() => setFilterUI('parts_of_speech')}>
              <Text style={[{fontSize:20}]} >Parts of speech</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.filterItemDisabled} onPress={() => setFilterUI('words_status')}>
              <Text style={[{fontSize:20}]} >Words status</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.filterItemDisabled} onPress={() => setFilterUI('category')}>
              <Text style={[{fontSize:20}]} >Category</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.filterItemDisabled} onPress={() => setFilterUI('level')}>
              <Text style={[{fontSize:20}]} >Level</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => setFilterUI('disabled')}>
              <Text style={styles.buttonTitle}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.activeFilterUI}/>       
      </Modal>

      {/* filter Parts of speech modal   */}
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={filterUI != 'parts_of_speech' ? false : true}
        statusBarTranslucent={true}
        onRequestClose={() => {
          
        }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView,{height:400}]}>
            <View style={[{marginBottom:15,marginTop:20,height:75,width:'100%',justifyContent:'center',alignItems:'center'}]}>
              <TouchableOpacity style={[{height:50,width:50,backgroundColor:'gray',position:'relative',left:-120,top:60}]} onPress={() => setFilterUI('main')}></TouchableOpacity>
              <Text style={[{fontSize:30,fontWeight:600,width:150,textAlign:'center'}]}>Parts of speech</Text>
              <TouchableOpacity style={[{height:50,width:50,backgroundColor:'gray',position:'relative',left:120,top:-55}]} onPress={() => setFilterUI('disabled')}></TouchableOpacity>
            </View>
            
            <TouchableOpacity 
            style={filter_config.parts_of_speech.includes('Verb') ? styles.filterItemActive: styles.filterItemDisabled} 
            onPress={() => handleFilterItemClick('Verb','parts_of_speech')}>
              <Text style={filter_config.parts_of_speech.includes('Verb') ? styles.filterItemTitleActive: styles.filterItemTitleDisabled}>Verb</Text>
            </TouchableOpacity>
             
            <TouchableOpacity 
            style={filter_config.parts_of_speech.includes('Adjective') ? styles.filterItemActive: styles.filterItemDisabled} 
            onPress={() => handleFilterItemClick('Adjective','parts_of_speech')}>
              <Text style={filter_config.parts_of_speech.includes('Adjective') ? styles.filterItemTitleActive: styles.filterItemTitleDisabled}>Adjective</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            style={filter_config.parts_of_speech.includes('Noun') ? styles.filterItemActive: styles.filterItemDisabled} 
            onPress={() => handleFilterItemClick('Noun','parts_of_speech')}>
              <Text style={filter_config.parts_of_speech.includes('Noun') ? styles.filterItemTitleActive: styles.filterItemTitleDisabled}>Noun</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => setFilterUI('disabled')}>
              <Text style={styles.buttonTitle}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.activeFilterUI}/>       
      </Modal>

      {/* filter Words status modal   */}
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={filterUI != 'words_status' ? false : true}
        statusBarTranslucent={true}
        onRequestClose={() => {
          
        }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView,{height:400}]}>
            <View style={[{marginBottom:15,marginTop:20,height:75,width:'100%',justifyContent:'center',alignItems:'center'}]}>
              <TouchableOpacity style={[{height:50,width:50,backgroundColor:'gray',position:'relative',left:-120,top:60}]} onPress={() => setFilterUI('main')}></TouchableOpacity>
              <Text style={[{fontSize:30,fontWeight:600,width:150,textAlign:'center'}]}>Words status</Text>
              <TouchableOpacity style={[{height:50,width:50,backgroundColor:'gray',position:'relative',left:120,top:-55}]} onPress={() => setFilterUI('disabled')}></TouchableOpacity>
            </View>
            
            <TouchableOpacity 
            style={filter_config.word_status.includes('Learned') ? styles.filterItemActive: styles.filterItemDisabled} 
            onPress={() => handleFilterItemClick('Learned','word_status')}>
              <Text style={filter_config.word_status.includes('Learned') ? styles.filterItemTitleActive: styles.filterItemTitleDisabled}>Learned</Text>
            </TouchableOpacity>
             
            <TouchableOpacity 
            style={filter_config.word_status.includes('On study') ? styles.filterItemActive: styles.filterItemDisabled} 
            onPress={() => handleFilterItemClick('On study','word_status')}>
              <Text style={filter_config.word_status.includes('On study') ? styles.filterItemTitleActive: styles.filterItemTitleDisabled}>On study</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            style={filter_config.word_status.includes('Not learned') ? styles.filterItemActive: styles.filterItemDisabled} 
            onPress={() => handleFilterItemClick('Not learned','word_status')}>
              <Text style={filter_config.word_status.includes('Not learned') ? styles.filterItemTitleActive: styles.filterItemTitleDisabled}>Not learned</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => setFilterUI('disabled')}>
              <Text style={styles.buttonTitle}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.activeFilterUI}/>       
      </Modal>

      {/* filter Category modal   */}
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={filterUI != 'category' ? false : true}
        statusBarTranslucent={true}
        onRequestClose={() => {
          
        }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView,{height:470}]}>
            <View style={[{marginBottom:15,marginTop:20,height:75,width:'100%',justifyContent:'center',alignItems:'center'}]}>
              <TouchableOpacity style={[{height:50,width:50,backgroundColor:'gray',position:'relative',left:-120,top:40}]} onPress={() => setFilterUI('main')}></TouchableOpacity>
              <Text style={[{fontSize:30,fontWeight:600,width:150,textAlign:'center'}]}>Category</Text>
              <TouchableOpacity style={[{height:50,width:50,backgroundColor:'gray',position:'relative',left:120,top:-45}]} onPress={() => setFilterUI('disabled')}></TouchableOpacity>
            </View>
            
            <TouchableOpacity 
            style={filter_config.category.includes('Family') ? styles.filterItemActive: styles.filterItemDisabled} 
            onPress={() => handleFilterItemClick('Family','category')}>
              <Text style={filter_config.category.includes('Family') ? styles.filterItemTitleActive: styles.filterItemTitleDisabled}>Family</Text>
            </TouchableOpacity>
             
            <TouchableOpacity 
            style={filter_config.category.includes('Travel') ? styles.filterItemActive: styles.filterItemDisabled} 
            onPress={() => handleFilterItemClick('Travel','category')}>
              <Text style={filter_config.category.includes('Travel') ? styles.filterItemTitleActive: styles.filterItemTitleDisabled}>Travel</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            style={filter_config.category.includes('Work') ? styles.filterItemActive: styles.filterItemDisabled} 
            onPress={() => handleFilterItemClick('Work','category')}>
              <Text style={filter_config.category.includes('Work') ? styles.filterItemTitleActive: styles.filterItemTitleDisabled}>Work</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            style={filter_config.category.includes('Eat') ? styles.filterItemActive: styles.filterItemDisabled} 
            onPress={() => handleFilterItemClick('Eat','category')}>
              <Text style={filter_config.category.includes('Eat') ? styles.filterItemTitleActive: styles.filterItemTitleDisabled}>Eat</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => setFilterUI('disabled')}>
              <Text style={styles.buttonTitle}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.activeFilterUI}/>       
      </Modal>


      {/* filter Level modal   */}
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={filterUI != 'level' ? false : true}
        statusBarTranslucent={true}
        onRequestClose={() => {
          
        }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView,{height:340}]}>
            <View style={[{marginBottom:15,marginTop:20,height:75,width:'100%',justifyContent:'center',alignItems:'center'}]}>
              <TouchableOpacity style={[{height:50,width:50,backgroundColor:'gray',position:'relative',left:-120,top:60}]} onPress={() => setFilterUI('main')}></TouchableOpacity>
              <Text style={[{fontSize:30,fontWeight:600,width:150,textAlign:'center'}]}>Words status</Text>
              <TouchableOpacity style={[{height:50,width:50,backgroundColor:'gray',position:'relative',left:120,top:-55}]} onPress={() => setFilterUI('disabled')}></TouchableOpacity>
            </View>
            
            <View>
              <View style={[{flexDirection:'row',alignItems:'center',justifyContent:'center',height:75}]}>
                <TouchableOpacity 
              style={filter_config.level.includes('A1') ? styles.smallFilterItemActive: styles.smallFilterItemDisabled} 
              onPress={() => handleFilterItemClick('A1','level')}>
                  <Text style={filter_config.level.includes('A1') ? styles.smallFilterItemTitleActive: styles.smallFilterItemTitleDisabled}>A1</Text>
                </TouchableOpacity>
                <TouchableOpacity 
              style={filter_config.level.includes('A2') ? styles.smallFilterItemActive: styles.smallFilterItemDisabled} 
              onPress={() => handleFilterItemClick('A2','level')}>
                  <Text style={filter_config.level.includes('A2') ? styles.smallFilterItemTitleActive: styles.smallFilterItemTitleDisabled}>A2</Text>
                </TouchableOpacity>
                <TouchableOpacity 
              style={filter_config.level.includes('B1') ? styles.smallFilterItemActive: styles.smallFilterItemDisabled} 
              onPress={() => handleFilterItemClick('B1','level')}>
                  <Text style={filter_config.level.includes('B1') ? styles.smallFilterItemTitleActive: styles.smallFilterItemTitleDisabled}>B1</Text>
                </TouchableOpacity>
              </View>

              <View style={[{flexDirection:'row',alignItems:'center',justifyContent:'center',height:75,marginTop:-15}]}>
                <TouchableOpacity 
              style={filter_config.level.includes('B2') ? styles.smallFilterItemActive: styles.smallFilterItemDisabled} 
              onPress={() => handleFilterItemClick('B2','level')}>
                  <Text style={filter_config.level.includes('B2') ? styles.smallFilterItemTitleActive: styles.smallFilterItemTitleDisabled}>B2</Text>
                </TouchableOpacity>
                <TouchableOpacity 
              style={filter_config.level.includes('C1') ? styles.smallFilterItemActive: styles.smallFilterItemDisabled} 
              onPress={() => handleFilterItemClick('C1','level')}>
                  <Text style={filter_config.level.includes('C1') ? styles.smallFilterItemTitleActive: styles.smallFilterItemTitleDisabled}>C1</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => setFilterUI('disabled')}>
              <Text style={styles.buttonTitle}>OK</Text>
            </TouchableOpacity>
             
            
          </View>
        </View>
        <View style={styles.activeFilterUI}/>       
      </Modal>


    </View>
  );
}

const styles = StyleSheet.create({
  smallFilterItemActive: {
    margin:5,
    width:90,
    height:50,
    backgroundColor:'#5498FF',
    borderColor:'black',
    borderWidth:1,
    justifyContent:'center',
    alignItems:'center',
    color:'white'
  },
  smallFilterItemDisabled: {
    margin:5,
    width:90,
    height:50,
    backgroundColor:'white',
    borderColor:'black',
    borderWidth:1,
    justifyContent:'center',
    alignItems:'center',
    color:'black'
  },
  filterItemActive: {
    marginTop:20,
    width:300,
    height:50,
    backgroundColor:'#5498FF',
    borderColor:'black',
    borderWidth:1,
    justifyContent:'center',
    alignItems:'center',
    color:'white'
  },
  filterItemDisabled: {
    marginTop:20,
    width:300,
    height:50,
    backgroundColor:'white',
    borderColor:'black',
    borderWidth:1,
    justifyContent:'center',
    alignItems:'center',
    color:'black'
  },
  filterItemTitleActive:{
    fontSize:20,
    color:'white'
  },
  filterItemTitleDisabled:{
    fontSize:20,
    color:'black'
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
    height:450,
    width:340,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    
    alignItems: 'center',
    
  },


  filterMenuContainer: {
    height:400,
    borderRadius:10,
    backgroundColor:'white',
  },


  activeFilterUI: {
    position:'absolute',
    height:'100%',
    width:'100%',
    backgroundColor:'black',
    opacity:0.5,  
    
  },
  

  item: {
    // flex:1,
    // backgroundColor: '#f9c2ff',
    // maxHeight:900,
    // padding:20,
    // marginVertical: 8,
    // justifyContent:'center',
    // alignItems:'center',
    // marginHorizontal: 16,
    height:120,
    marginTop:20,
    width:300,
    backgroundColor:'white',
    borderRadius:10,
    borderColor:'#00B2FF',
    borderWidth:3,
    alignItems:'center',
    justifyContent:'center'
  },
  title: {
    // color:'black',          
    // fontSize: 22,
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
    zIndex:999,
    backgroundColor:'red',
    flex:1,
    alignItems:'center',
  },

  mainWrapper: {
    flex:1,
    alignItems:'center',
    zIndex:998
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
  
  
  button:{
    marginTop: 20,
    minHeight: 45,
    maxHeight: 45,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 125,
    height: 45,
    backgroundColor: '#4f94e5',
    borderRadius: 55,
     
  },
  buttonTitle:{
    fontSize:25,
    color:'white',
  },
  
 
  
});
