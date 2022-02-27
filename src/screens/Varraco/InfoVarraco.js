import React, { useEffect, useState } from "react";
import 'react-native-gesture-handler';
import {SafeAreaView, Text, TouchableOpacity, FlatList, View, StyleSheet, ScrollView, Alert, ActivityIndicator, Image} from "react-native";
import firebase from '../../component/firebase/firebase';
import 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';





const db = firebase.firestore(firebase);



export default function(props){
  const{navigation}=props


 const [formData, setFormData]= useState({});
 const [totalFormData, setTotalFormData]= useState(0);
 const [startFormData, setStartFormData]=useState(null);
 const [isLoading, setIsLoading]= useState(false);
 
const limitData= 5;

 useEffect(()=>{

   //Obtener el tamaño de todo los dactos
   db.collection('Varraco').get().then((snap)=>{
    setTotalFormData(snap.size);

    getData();

  });



 }, []);




 const getData=()=>{

  //obtener la information de cada arreglo
  const listData = [];
  db.collection('Varraco').orderBy('startAt', 'desc').limit(limitData).get().then((response)=>{
    
    setStartFormData(response.docs[response.docs.length - 1]);

     response.forEach((doc)=>{
      const formDataInformation = doc.data();
      formDataInformation.id = doc.id;
    
    //  console.log(formDataInformation);
     
    listData.push(formDataInformation);

    });

    setFormData(listData); 

  });
 

 }



 

  return(
    
    <SafeAreaView>

        {
          formData.length > 0 ? (
            <FlatList 
              
              data={formData}
              renderItem={(item)=>(
                
               <FormData 
              formData={item}
              setFormData={setFormData}
              navigation={navigation}
          
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

  //Funcion que carga más informatión

 const Mas =() =>{

  const string = "No hay más contenido que mostrar. 😅";

  const limitData= 6;

  const listData2 = [];

    formData < totalFormData && setIsLoading(true);

    db.collection('Varraco').orderBy('startAt', 'desc')
    .startAfter(startFormData.data().startAt)
    .limit(limitData).get().then((response)=>{

    if(response.docs.length > 0 ){

     setStartFormData(response.docs[response.docs.length - 1]);

    }else{

      setIsLoading(false);
        
      alertNoForm();
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
      <View style={{backgroundColor:'#F1AD98', zIndex:-1}}>
          <TouchableOpacity style={styles.FooterButton} onPress={()=> Mas()} >
              <Text style={styles.FooterTextButton} >Cargar más...</Text>
            </TouchableOpacity>
      </View>
    )

  }


  function FormData(props){

  const {formData, setFormData, navigation}=props
  

  const { 
    NoDelCerdo,
    Fecha,
    Edad,
    NoDeLaCerda,
    Hoy,
    id
    }=formData.item;


  //console.log(formData);


                

        const Delete = ()=>{
          
        Alert.alert(
          "¿Está seguro que desea elimiar esta información.",
          "Si eliminas esta información también se eliminara de la base de datos.",
        [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Borrar", onPress:() => remover() }
        ],
        { cancelable: false }
        );
          
         
        }



        const remover = ()=>{
     
          db.collection('Varraco').doc(id).delete().then(function() {
           // console.log("Document successfully deleted!");
             navigation.navigate( 'varraco');

          }).catch(function(error) {
              console.error("Error removing document: ", error);
          })
   
         
          
     }
             

return(

 <ScrollView style={styles.body}>


   
    <LinearGradient style={styles.contener} colors={['#F1C1C1', '#EBE0E0']} key={id} style={styles.container}> 
    
        
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
          
          <TouchableOpacity style={styles.button}   onPress={()=>{ Delete()}}>

          <Text style={styles.TextButton} >Borrar</Text>
        </TouchableOpacity>
        
     
              
             
    </LinearGradient>  
              
  
          
            
</ScrollView>


  )


}



const styles = StyleSheet.create({
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
  marginBottom:20

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
  margin:'10%'

},

ImageContainer:{
 
  backgroundColor:'#870000',
  alignItems:'center',
  width:250,
  height:250,
  borderRadius:50
  
  

}

});