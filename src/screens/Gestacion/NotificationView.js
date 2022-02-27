import React, { useEffect, useState } from "react";
import 'react-native-gesture-handler';
import {SafeAreaView, Text, TouchableOpacity, FlatList, View, StyleSheet, ScrollView, Alert, Image, ActivityIndicator, StatusBar } from "react-native";
import firebase from '../../component/firebase/firebase';
import 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import moment from 'moment';
import 'moment/locale/es-do';



const db = firebase.firestore(firebase);

export default function ListaDeClientes(props){


    const{navigation}=props;


  const [formData, setFormData]= useState({});
  const [totalFormData, setTotalFormData]= useState(0);
  const [startFormData, setStartFormData]=useState(null);
  const [isLoading, setIsLoading]= useState(false);
  const [sumaFecha, setSumaFecha]= useState('')
  
  const limitData=6;

  useEffect(()=>{
   
    //Obtener el tamaño de todo los dactos
    db.collection('Gestacion').get().then((snap)=>{
     setTotalFormData(snap.size);
  
   });
  
   //obtener la information de cada arreglo
   const listData = [];
   db.collection('Gestacion').orderBy('startAt', 'asc').limit(limitData).get().then((response)=>{
     
     setStartFormData(response.docs[response.docs.length - 1]);
  
      response.forEach((doc)=>{
       const formDataInformation = doc.data();
       formDataInformation.id = doc.id;
     
     //  console.log(formDataInformation);
      
     listData.push(formDataInformation);
  
     });
  
     setFormData(listData); 
  
   });
  
}, []);


    return(
        <SafeAreaView>
            <StatusBar barStyle='light-content' hidden={false} backgroundColor='#1372B8' />
           
        {
          formData.length > 0 ? (
            <FlatList 
            
            data={formData}
            renderItem={(item)=>(
              <FormData 
              formData={item}
              setFormData={setFormData}
              navigation={navigation}
              sumaFecha={item}
              setSumaFecha={setSumaFecha}
             
               /> )

            }

              
              ListFooterComponent={<Footer setFormData={setFormData} 
              formData={formData}  setStartFormData={setStartFormData}
              startFormData={startFormData} setIsLoading={setIsLoading}
              />}
                
            />

          ):(

            <View style={{alignSelf: 'center'}}>
            <View style={{ width:120, height:120, borderColor:'red', alignItems:'center'}}>
             <ActivityIndicator style={{alignSelf:'center'}} size='large'/>

            </View>

              <Text style={{fontSize:20, fontWeight:'bold' , textAlign:'center', marginBottom:70, marginTop:-35 }}>Cargando...</Text>

              <View style={styles.ImageContainer}>
                <Image style={styles.Image} source={require('../../component/imagenes/granja.png')} />
              </View>

              <Text style={{marginTop:'68%', marginLeft:-70}}>Power by Eric Marte</Text>


          </View>

          )
        }
    
     
      </SafeAreaView>

    )
}


function Footer (props){

    const{formData, setFormData, setStartFormData, startFormData,
    totalFormData, setIsLoading}=props
  
    const Mas =() =>{    
   
    const string = "No hay más contenido que mostrar. 😅";    
    
    const limitData=6;
  
    const listData2 = [];
  
    formData < totalFormData && setIsLoading(true);
  
    db.collection('Gestacion').orderBy('startAt', 'asc')
    .startAfter(startFormData.data().startAt)
    .limit(limitData).get().then((response)=>{
  
      if(response.docs.length > 0 ){
  
      setStartFormData(response.docs[response.docs.length - 1]);
  
      }else{
  
        setIsLoading(false);
        alertNoForm()
      }
  
        response.forEach((doc) => {
  
        const formDataInformation = doc.data();
        formDataInformation.id = doc.id;
  
        listData2.push(formDataInformation);
  
        
  
      });
  
      setFormData([...formData, ...listData2]);
  
    });  
      
  
    const alertNoForm = () =>{
  
      Alert.alert(
        'Granja M&D',
         string,
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
     
  
  
      }
  
      
      return(
        <View style={styles.FooterContainer}>
            <TouchableOpacity style={styles.FooterButton} onPress={()=> Mas()} >
                <Text style={styles.FooterTextButton} >Cargar más...</Text>
              </TouchableOpacity>
        </View>
      )
  
    }
  
  function FormData(props){
  
    const {formData, setFormData, navigation, sumaFecha, setSumaFecha}=props
    const {
         NoDelCerdo,
         FinDeGestación,
         NotificationId,
         NoCerda
         }=formData.item;    
  

  const suma = []

  const fecha = FinDeGestación;
  const hoy = new Date();
  const newHoy= moment(hoy,  "DD/MM/YYYY");
  const newFin = moment(fecha, "DD/MM/YYYY");

 let diferencia = moment(newFin).diff(moment(newHoy), 'days');
 
 suma.push(diferencia);

 console.log(FinDeGestación); 
          

  async function scheduleAndCancel(){
        await Notifications.cancelScheduledNotificationAsync(NotificationId);
        
        alert('Notificación Cancelada')
    }
    
  
     return(

    
        <ScrollView style={styles.body}>
              
         
         <LinearGradient  colors={['#1e3c72', '#2a5298']} key={NotificationId} style={styles.container}> 
               
            
                
                   
               <View style={styles.FlexContainer}>
                    <Image style={styles.Avatar} source={require('../../component/imagenes/granja.png')} />

                    <View style={styles.bodyContainer}>

                        <View style={styles.ViewContainer}>
                        <Text style={styles.NombreAvatar}>{suma} Dias</Text>
                        </View>

                        <View style={styles.ViewContainer}>
                            <Text style={styles.AnswerContainer}>Gestación de Cerda {NoCerda}</Text>
                        </View>

                        <View style={styles.ViewContainer}>
                            <Text style={styles.AnswerContainer}>{FinDeGestación}</Text>
                        </View>

                        <TouchableOpacity onPress={()=>scheduleAndCancel()} style={styles.cancelContainer}>
                            <Text style={[styles.AnswerContainer, styles.CancelButton]}>Cancelar</Text>
                        </TouchableOpacity>
                
                           
                       

                    </View>


              </View>
           
               
                
         </LinearGradient>
          
         
         </ScrollView>
     )
    
 }  

 
const styles = StyleSheet.create({
    body: {
    
      backgroundColor:'#4CA1AF',
      
    
    },
  
    container: {
      marginTop: 20,
      marginHorizontal: 10,
      paddingHorizontal: 0,
      paddingVertical: 0,
      borderRadius: 20,
      marginBottom: 10,
      paddingBottom: 18,
      elevation:7
  
  
    },
    ViewContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },

    AnswerContainer: {
      fontSize: 18,
      color: '#CDD1D3',
      marginHorizontal:5
    },

    NombreAvatar:{
        fontSize:25,
        fontWeight:'bold',
        color:'#fff',
        marginHorizontal:5
    },

   bodyContainer:{
    width:'70%',

  },

  FlexContainer:{
      display:'flex',
      flexDirection:'row', 
      justifyContent:'space-between',
      
  },

  FooterContainer:{
   paddingTop:'50%',
   backgroundColor:'#4CA1AF', 
 
  },
  
  FooterButton:{
    alignSelf:'center',
    alignItems:'center',
    marginBottom:'3%',
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
    margin:'10%'
  
  },
  
  ImageContainer:{
    alignItems:'center',
    width:250,
    height:250,
    borderRadius:50
    
  },
  Avatar:{
      marginTop:10,
      width:100,
      height:100
  },

  CancelButton:{
    color:'#fff', 
    fontSize:20

  },
  cancelContainer:{
    position:'relative',
    top:10,
    left:'35%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#850A0A',
    marginLeft:10,
    marginRight:5,
    height:40,
    width:'50%',
    borderRadius:30,
    

  }
  
  
  });