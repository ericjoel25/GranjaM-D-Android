import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView, Image, TouchableOpacity, TextInput, Alert} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {FireSQL} from 'firesql';
import 'firesql/rx';
import firebase from '../../component/firebase/firebase';
import 'firebase/firestore';




const db = firebase.firestore(firebase);

const fireSQL = new FireSQL(firebase.firestore(),{includeId: 'id'});

export default function App(){

  const[search, setSearch]=useState('');
  const[formData, setFormdata]=useState([]);

    console.log(formData);

   
  const Buscar= ()=>{

    if (search) {
      fireSQL
        .query(`SELECT * FROM Destete WHERE NoDeLaMadre LIKE '${search}%'`)
        .then((response) => {

          setFormdata(response);
          setSearch({ NoDeLaMadre:'' })
          
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
        <View style={{backgroundColor:'#4FA0C1', height:'100%'}}>

        <View  style={styles.SearchBody}>

          <TextInput style={styles.Search}  placeholder='No. de la madre'
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
        NoDeLaMadre,
        NoDeLechones,
        Hembras,
        Machos,
        FechaNacimiento,
        Hierro1,
        Hierro2,
        SuplementoIniciar,
        ListosParaVenta,
        Hoy,
        id
        }=formData.item;

    
    return(

        <ScrollView style={styles.body}>
            <View key={id} style={styles.container}> 
            
                
                <View style={styles.header}>
                    <Text style={styles.title}>Destete</Text>
                    <Text style={styles.litleTime}>{Hoy}</Text>
                  </View>
                
           <View style={styles.bodyContainer}>

                  <View style={styles.ViewContainer}>
                    <Text style={styles.TextContainer}>No. de la madre : </Text>
                    <Text style={styles.AnswerContainer}>{NoDeLaMadre}</Text>
                  </View>

                  <View style={styles.ViewContainer}>
                    <Text style={styles.TextContainer}>No. de lechones: </Text>
                    <Text style={styles.AnswerContainer}>{NoDeLechones}</Text>
                  </View>

                  <View style={styles.ViewContainer}>
                    <Text style={styles.TextContainer}>Hembras: </Text>
                    <Text style={styles.AnswerContainer}>{Hembras}</Text>
                  </View>

                  <View style={styles.ViewContainer}>
                    <Text style={styles.TextContainer}>Machos: </Text>
                    <Text style={styles.AnswerContainer}>{Machos}</Text>
                  </View>

                  <View style={styles.ViewContainer}>
                    <Text style={styles.TextContainer}>Fecha de nacimiento: </Text>
                    <Text style={styles.AnswerContainer}>{FechaNacimiento}</Text>
                  </View>

                  <View style={styles.ViewContainer}>
                    <Text style={styles.TextContainer}>Hierro 1ra: </Text>
                    <Text style={styles.AnswerContainer}>{Hierro1}</Text>
                  </View>

                  <View style={styles.ViewContainer}>
                    <Text style={styles.TextContainer}>Hierro 2da: </Text>
                    <Text style={styles.AnswerContainer}>{Hierro2}</Text>
                  </View>

                  <View style={styles.ViewContainer}>
                    <Text style={styles.TextContainer}>Suplemento Iniciar: </Text>
                    <Text style={styles.AnswerContainer}>{SuplementoIniciar}</Text>
                  </View>

                  <View style={styles.ViewContainer}>
                    <Text style={styles.TextContainer}>Listos para venta: </Text>
                    <Text style={styles.AnswerContainer}>{ListosParaVenta}</Text>
                  </View>

             </View>     
                  
            
            
            </View>

      </ScrollView>
    )

}

const styles=StyleSheet.create({
  SearchBody:{
    backgroundColor:'#036082',
    width:'100%',
    height:70, 
    flexDirection:'row'

  },

  Search:{
    backgroundColor:'#0B8FB3',
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
    backgroundColor:'#0B8FB3',
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
  
  Input:{
        width:'80%',
        height:'30%',
        backgroundColor:'#000',
        color:'#fff',
        fontSize:18,
        marginHorizontal:5,
        alignSelf:'center',
        borderRadius:20, 
        paddingLeft:20
    },
    body: {
        backgroundColor: '#4FA0C1',
        marginBottom:10
    
    
      },
      title: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
      //  width:'45%',
        marginLeft:0,
        marginTop:25,
        width:'40%'
      
        
        
      },
      litleTime:{
        textAlign: 'right',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
        marginTop:8,
        width:'55%'
        
        
    
      },
    
      header:{
        flexDirection:'row',
        backgroundColor:'#CA4C08',
        borderRadius:10,
        height:70,
        marginBottom: 10,
        width:'100%',
        marginBottom:20
      
         
      },
    
      container: {
        backgroundColor: '#D9DEE1',
        marginTop:20,
        marginHorizontal: 10,
        paddingHorizontal: 0,
        paddingVertical: 0,
        borderRadius: 20,
        marginBottom: 5,
        paddingBottom: 18,
        elevation:5,
        
    
    
      },
      ViewContainer: {
        flexDirection: 'row',
        alignItems: 'center'
      },
    
      TextContainer: {
        fontSize: 20,
        fontWeight: 'bold'
    
      },
      AnswerContainer: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#120980'
    
    
      },
    
    
     bodyContainer:{
      marginHorizontal:7,
      marginBottom:20
    
    },
    
     TextButton:{
      fontSize:30,
      fontWeight:'bold',
      color: '#fff'
    
    
    },
    Image:{
        height:200,
        width:200,
        margin:'10%',
        marginRight:20
      
      },
      
      ImageContainer:{
       
        backgroundColor:'#036082',
        alignItems:'center',
        width:250,
        height:250,
        borderRadius:50,
        alignSelf:'center'
        
      }
    
})