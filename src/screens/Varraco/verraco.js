import React, {useState} from 'react';
import {View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar} from 'react-native';
import moment from 'moment';
import 'moment/locale/es-do';
import DateTimePicker from '@react-native-community/datetimepicker';
import firebase from '../../component/firebase/firebase';
import 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';



const db = firebase.firestore(firebase);

export default function(props){
  
  const{navigation} =props

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [FormError, setFormError] = useState({});
  const [dataVerraco, setDataVerraco] = useState({
    NoDelCerdo:'',
    Fecha:'',
    Edad:'',
    NoDelCerdoGestó:'',
    Hoy: moment(date).format('MMMM Do YYYY, h:mm:ss a'),
    startAt: new Date()
  });

//Capturar los datos de los input

  const handleChangeTest=(name, value)=>{

    setDataVerraco({...dataVerraco, [name]: value});

   // console.log(dataVerraco);

  }


//Función para guardar los datos en firebase. 

 const SaveInformation = async () =>{

    let errors = [];

  if (!dataVerraco.NoDelCerdo || !dataVerraco.Edad || !dataVerraco.NoDelCerdoGestó){
       
      if(!dataVerraco.NoDelCerdo) errors.NoDelCerdo = true;
      if(!dataVerraco.Edad) errors.Edad = true;
      if(!dataVerraco.NoDelCerdoGestó) errors.NoDelCerdoGestó = true; 
       
      alert('¡Por favor complete el formulario! 😅');

    }else{

      await db.collection('Varraco').add({

        NoDelCerdo: dataVerraco.NoDelCerdo,
        Fecha:  moment(date).format("L"),
        Edad: dataVerraco.Edad,
        NoDeLaCerda: dataVerraco.NoDelCerdoGestó,
        Hoy: moment(date).format('MMMM Do YYYY, h:mm:ss a'),
        startAt: new Date()

      }).then(() =>{

        console.log('Save');

      })
     

    }
    
    setDataVerraco({
      NoDelCerdo:'',
      Fecha:'',
      Edad:'',
      NoDelCerdoGestó:'',
      Hoy: moment(date).format('MMMM Do YYYY, h:mm:ss a'),
      startAt: new Date()
    });


     setFormError(errors);
 }
     
     
      
 
  
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
     
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  
  };

  const showDatepicker = () => {
    showMode('date');
    
  };


  // Works on both Android and iOS
const Save = () =>{

  Alert.alert(
    'Guardar Información',
    '¿Desea guardar esta información en la base de datos?',
    [
      
      {
        text: 'Verificar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      { text: 'Guardar', onPress: () => SaveInformation() }
    ],
    { cancelable: false }
  );
    
  }

  return(

   

      <LinearGradient style={styles.contener} colors={['#EAC292', '#E3AB67']} >
      <StatusBar barStyle='light-content' hidden={false} backgroundColor='#712D2D' />

           <View style={styles.InputContener}>
              <Text style={styles.TextInput}>No Del Cerdo</Text>
              <TextInput style={styles.Input} placeholder='N. Del Cerdo'
               onChangeText={(value)=> handleChangeTest('NoDelCerdo', value)} value={dataVerraco.NoDelCerdo} />
           </View>

           <View style={styles.InputContener}>
                  <Text style={styles.TextInput}> Fecha:</Text>   
                  <TouchableOpacity>
                      <Text  style={[styles.Input, styles.TextDate]} 
                      onPress={showDatepicker} onChangeText={(value) => handleChangeTest('Fecha', value)} value={dataVerraco.Fecha} > 
                      {date  ?  moment(date).format("LL") : 'Fecha'}
                      </Text>
                  </TouchableOpacity>   
            </View>

           <View  style={styles.InputContener}>
              <Text style={styles.TextInput}>Edad</Text>
              <TextInput placeholder='Edad' style={styles.Input} onChangeText={(value)=> handleChangeTest('Edad', value)}
               value={dataVerraco.Edad} />
           </View>

           <View style={styles.InputContener}>
              <Text style={styles.TextInput}>Número De La Cerda Que Gestó  </Text>
              <TextInput placeholder='Número De La Cerda Que Gestó ' style={styles.Input} onChangeText={(value)=> handleChangeTest('NoDelCerdoGestó', value)}
               value={dataVerraco.NoDelCerdoGestó} />
           </View>
          
           <View>
              <TouchableOpacity style={styles.button} onPress={() => Save()} >
                <Text style={styles.TextButton} >Guardar</Text>
              </TouchableOpacity>
            </View>
            

            <View>
              <TouchableOpacity style={styles.button1} onPress={()=> navigation.navigate('infoVarraco')} >
                <Text style={styles.TextButton} >Mostrar</Text>
              </TouchableOpacity>
            </View>

        
            

            {show && (
            <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
              />
            )}


      </LinearGradient>


  )


}


const styles= StyleSheet.create({

  contener:{
      
    height:'100%',
    backgroundColor: '#D89665',
    position:'relative'


  },

  InputContener:{
    marginTop:10

  },

  Input:{
    backgroundColor: '#F6FAF6',
    width:'95%',
    height:50,
    color:'#000',
    borderRadius:15,
    fontSize:20,
    paddingLeft:15,
    marginLeft:10,
    marginBottom:0,
    borderColor:'#000',
    borderWidth:2

  },
 TextInput:{
   fontSize:23,
   fontWeight:'bold',
   marginRight:10,
   marginLeft:15,
   marginBottom:3
 },

 button:{
  alignItems:'center',
  width:'70%',
  height:65,
  backgroundColor:'#670002',
  marginBottom:5,
  marginTop:25,
  marginHorizontal:58,
  paddingTop:7,
  borderRadius:20,
  
},

button1:{
 alignItems:'center',
 width:'70%',
 height:65,
 backgroundColor:'#670002',
 marginBottom:40,
 marginTop:15,
 marginHorizontal:58,
 paddingTop:7,
 borderRadius:20,
 
},

TextButton:{
   fontSize:30,
   fontWeight:'bold',
   color:'#fff'
   

},
TextButton:{
  fontSize:30,
  fontWeight:'bold',
  color:'#fff'
  

},
TextDate:{
paddingTop:2,
paddingTop:8
},

Texttitle:{
fontSize:25,
textAlign:'center',
fontWeight:'bold',
marginTop:2


}



})