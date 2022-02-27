import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView, Image, TouchableOpacity, TextInput, Alert} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {FireSQL} from 'firesql';
import 'firesql/rx';
import firebase from '../../component/firebase/firebase';
import 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';





const db = firebase.firestore(firebase);

const fireSQL = new FireSQL(firebase.firestore(),{includeId: 'id'});

export default function App(){

    

    const[search, setSearch]=useState('');
    const[formData, setFormdata]=useState([]);

    console.log(formData);


  const Buscar= ()=>{

    if (search) {
      fireSQL
        .query(`SELECT * FROM Varraco WHERE NoDelCerdo LIKE '${search}%'`)
        .then((response) => {

          setFormdata(response);
          setSearch({ NoDelCerdo:''})
          
            if(response.length === 0){
              alertNoForm();
            }  

         
        });
       
      }
      
     
  }
  

  const alertNoForm = () =>{

    Alert.alert(
      'Granja M&D',
      'No se ha encontrado ningun documento con este nombre.',
      [
        
        {
          text: 'aceptar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        }
        
      ],
      { cancelable: false }
    );
      
    }


    return(
        <View style={{backgroundColor:'#F1AD98', height:'100%'}}>

                  
            <View  style={styles.SearchBody}>

            <TextInput style={styles.Search}  placeholder='No. del cerdo'
            placeholderTextColor='#fff'
            onChangeText={(Text)=> setSearch(Text)} value={search} 
            />

            <TouchableOpacity style={styles.BuscarBotton} onPress={()=>Buscar()}>
                <Text style={styles.BuscarText}>Buscar</Text>
            </TouchableOpacity> 

            </View>

         {formData.length > 0 ? (
          
        
          <FlatList 
              
          data={formData}
          renderItem={(item)=>(
            <FormDestete 
            formData={item}
          
             /> )

          } />

        ):(

            <NoFoundDestete /> 
            
         )}
            
        </View>
    );



}



function NoFoundDestete(){
    return(
        <View style={{alignSelf: 'center'}}>
       

        
         <View style={{ alignItems:'center'}}>   
          
              <Text style={{fontSize:20, fontWeight:'bold' , 
                 marginTop:30, marginBottom:60,  color:'#fff' }}>Escribe para buscar información.</Text>
          </View> 
         

          <View style={styles.ImageContainer}>
            <Image style={styles.Image} source={require('../../component/imagenes/granja.png')} />
          </View>

    
          <Text style={{marginTop:'78%', marginLeft:-20, color:'#fff' }}>Power by Eric Marte</Text>
      


      </View>
    )
}


function FormDestete(props){
    const{formData}=props;
    const { 
      NoDelCerdo,
      Fecha,
      Edad,
      NoDeLaCerda,
      Hoy,
      id
      }=formData.item;

    
    return(

        
      <ScrollView style={styles.body}>


        
      <LinearGradient style={styles.contener} colors={['#F1C1C1', '#EBE0E0']}
       key={id} style={styles.container}> 
      
          
          <View style={styles.header}>
              <Text style={styles.title}>Verraco </Text>
              <Text style={styles.litleTime}>{Hoy}</Text>
            </View>
          
            <View style={styles.bodyContainer}>

            <View style={styles.ViewContainer}>
              <Text style={styles.TextContainer}>No Del Cerdo: </Text>
              <Text style={styles.AnswerContainer}>{NoDelCerdo}</Text>
            </View>

            <View style={styles.ViewContainer}>
              <Text style={styles.TextContainer}>Fecha: </Text>
              <Text style={styles.AnswerContainer}>{Fecha}</Text>
            </View>

            <View style={styles.ViewContainer}>
              <Text style={styles.TextContainer}>Edad: </Text>
              <Text style={styles.AnswerContainer}>{Edad}</Text>
            </View>

            <View style={styles.ViewContainer}>
              <Text style={styles.TextContainer}>Número de la Cerda que gestó: </Text>
              <Text style={styles.AnswerContainer}>{NoDeLaCerda}</Text>
            </View>

            </View>
            
                
                
      </LinearGradient>  
                

            
              
      </ScrollView>
    )

}

const styles=StyleSheet.create({
  SearchBody:{
    backgroundColor:'#812B1C',
    width:'100%',
    height:70, 
    flexDirection:'row'

  },

  Search:{
    backgroundColor:'#000',
    width:'55%',
    height:55, 
    marginLeft:'15%',
    marginTop:'2.5%',
    borderRadius:30,
    paddingLeft:'8%',
    fontSize:20,
    fontWeight:'bold', 
    color:'#fff'
  },

  BuscarBotton:{
    display:'flex', 
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#000',
    width:'25%',
    height:55, 
    marginTop:'2.5%',
    marginLeft:'2%',
    borderRadius:20,
   

  },
  BuscarText:{
    color:'#fff',
    fontSize:20,
    fontWeight:'bold'
  },  
 
  body: {
    backgroundColor: '#F1AD98',
    marginBottom:-1
    
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
  //  width:'45%',
    marginLeft:-5,
    marginTop:25,
    width:'40%'
  
    
    
  },
  litleTime:{
    textAlign: 'right',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop:8,
    width:'55%'
    
    

  },

  header:{
    flexDirection:'row',
    backgroundColor:'#812B1C',
    borderRadius:10,
    height:70,
    marginBottom: 10,
    width:'100%',
    marginBottom:20
  
     
  },

  container: {
    backgroundColor: '#F0D996',
    marginTop: 20,
    marginHorizontal: 10,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 20,
    marginBottom: 15,
    paddingBottom: 18,
    elevation:5


  },
  ViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:7
  },

  TextContainer: {
    fontSize: 20,
    fontWeight: 'bold'

  },

  AnswerContainer: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#120980'


  },

  button:{
    alignSelf:'center',
    alignItems:'center',
    width:'55%',
    height:55,
    backgroundColor:'#812B1C',
    marginBottom:5,
    marginTop:30,
    paddingTop:5,
    borderRadius:20,
    
 },

 TextButton:{
  fontSize:30,
  fontWeight:'bold',
  color: '#fff'


},
bodyContainer:{
  marginHorizontal:7,
  marginBottom:50

},
FooterButton:{
  alignSelf:'center',
  alignItems:'center',
  marginBottom:'2%',
  backgroundColor:'#F2E9D0',
  width:'55%',
  height:50,
  borderRadius:20,
  marginVertical:30,
  paddingTop:7,
  marginTop:'70%'

},

FooterTextButton:{
  fontSize:20,
  fontWeight:'bold'

},
Image:{
  height:200,
  width:200,
  margin:'10%',
  marginRight:20

},

ImageContainer:{
 
  backgroundColor:'#870000',
  alignItems:'center',
  width:250,
  height:250,
  borderRadius:50,
  alignSelf:'center'
  
}
    
})

