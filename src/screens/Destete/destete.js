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
  const [dataDestete, setDataDestete] = useState({

    NoDeLaMadre:'',
    NoDeLechones:'',
    Hembras:'',
    Machos:'',
    FechaNacimiento:  moment(date).format("LL"),
    Hierro1: moment(date).add(7, 'days').format("LL"),
    Hierro2: moment(date).add(14, 'days').format("LL"),
    SuplementoIniciar: moment(date).add(7, 'days').format("LL"),
    ListosParaVenta: moment(date).add(45, 'days').format("LL"),
    Hoy: moment(date).format('MMMM Do YYYY, h:mm:ss a'),
    startAt: new Date()
  });


  //Capturar los datos de los input

  const handleChangeTest=(name, value)=>{

    setDataDestete({...dataDestete, [name]: value});

 //   console.log(dataDestete.NoDeLechones);

  }


//Función para guardar los datos en firebase. 

 const SaveInformation = async () =>{

    let errors = [];

  if (!dataDestete.NoDeLaMadre || !dataDestete.NoDeLechones || !dataDestete.Hembras
      ) {

      if(!dataDestete.NoDeLaMadre) errors.NoDeLaMadre=true;     
      if(!dataDestete.NoDeLechones) errors.NoDeLechones =true;
      if(!dataDestete.Hembras) errors.Hembras=true;
     
      alert('¡Por favor complete el formulario! 😅');

    } else {

      await db.collection('Destete').add({

        NoDeLaMadre: dataDestete.NoDeLaMadre,
        NoDeLechones: dataDestete.NoDeLechones,
        Hembras: dataDestete.Hembras,
        Machos: dataDestete.NoDeLechones - dataDestete.Hembras,
        FechaNacimiento: moment(date).format("L"),
        Hierro1: moment(date).add(7, 'days').format("LL"),
        Hierro2: moment(date).add(14, 'days').format("LL"),
        SuplementoIniciar: moment(date).add(7, 'days').format("L"),
        ListosParaVenta: moment(date).add(45, 'days').format("L"),
        Hoy: moment(date).format('MMMM Do YYYY, h:mm:ss a'),
        startAt: new Date()

      }).then(() =>{

        console.log('Save');

      })
     

    }

    setFormError(errors);
    
    setDataDestete({
    NoDeLaMadre:'',
    NoDeLechones:'',
    Hembras:'',
    Machos:'',
    FechaNacimiento:  moment(date).format("L"),
    Hierro1: moment(date).add(7, 'days').format("L"),
    Hierro2: moment(date).add(14, 'days').format("L"),
    SuplementoIniciar: moment(date).add(7, 'days').format("L"),
    ListosParaVenta: moment(date).add(45, 'days').format("L"),
    Hoy: moment(date).format('MMMM Do YYYY, h:mm:ss a'),
    startAt: new Date()
    });


     
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

      <ScrollView >
        <LinearGradient colors={['#06beb6', '#48b1bf']} style={styles.contener}>
        <StatusBar barStyle='light-content' hidden={false} backgroundColor='#239ECA'/>

           <View style={styles.InputContener}>
              <Text style={styles.TextInput}>No. de la madre:</Text>
              <TextInput style={styles.Input} placeholder='No. de la madre'
               onChangeText={(value)=> handleChangeTest('NoDeLaMadre', value)} value={dataDestete.NoDeLaMadre} />
           </View>

           <View  style={styles.InputContener}>
              <Text style={styles.TextInput}>No. de lechones:</Text>
              <TextInput placeholder='No. de lechones' style={styles.Input} onChangeText={(value)=> handleChangeTest('NoDeLechones', value)}
               value={dataDestete.NoDeLechones} />
           </View>

           <View  style={styles.InputContener}>
              <Text style={styles.TextInput}>Hembras:</Text>
              <TextInput placeholder='Hembras' style={styles.Input} onChangeText={(value)=> handleChangeTest('Hembras', value)}
               value={dataDestete.Hembras} />
           </View>

           <View style={styles.InputContener}>
              <Text style={styles.TextInput}>Machos:</Text>
              <Text style={[styles.Input, styles.TextDate]} placeholder='Machos'  
              onChangeText={(value) => handleChangeTest('Machos', value)} value={dataDestete.Machos}> {dataDestete 
                ? dataDestete.NoDeLechones - dataDestete.Hembras
                : 'Machos'}  </Text>
            </View>

           <View style={styles.InputContener}>
                  <Text style={styles.TextInput}>Fecha de nacimiento:</Text>   
                  <TouchableOpacity>
                      <Text  style={[styles.Input, styles.TextDate]} 
                      onPress={showDatepicker} onChangeText={(value) => handleChangeTest('FechaNacimiento', value)} value={dataDestete.FechaNacimiento} > 
                      {date  ?  moment(date).format("LL") : 'Fecha de nacimiento'}
                      </Text>
                  </TouchableOpacity>   
            </View>

           
            <View style={styles.InputContener}>
                  <Text style={styles.TextInput}>Hierro 1ra:</Text>   
                  <TouchableOpacity>
                      <Text  style={[styles.Input, styles.TextDate]} 
                      onPress={showDatepicker} onChangeText={(value) => handleChangeTest('Hierro1', value)} value={dataDestete.Hierro1} > 
                      {date  ?  moment(date).add(7, 'days').format("LL") : 'Hierro 1ra'}
                      </Text>
                  </TouchableOpacity>   
            </View>

            <View style={styles.InputContener}>
                  <Text style={styles.TextInput}>Hierro 2da:</Text>   
                  <TouchableOpacity>
                      <Text  style={[styles.Input, styles.TextDate]} 
                      onPress={showDatepicker} onChangeText={(value) => handleChangeTest('Hierro2', value)} value={dataDestete.Hierro2} > 
                      {date  ?  moment(date).add(14, 'days').format("LL") : 'Hierro 2da'}
                      </Text>
                  </TouchableOpacity>   
            </View>

            <View style={styles.InputContener}>
                  <Text style={styles.TextInput}>Suplemento Iniciar:</Text>   
                  <TouchableOpacity>
                      <Text  style={[styles.Input, styles.TextDate]} 
                      onPress={showDatepicker} onChangeText={(value) => handleChangeTest('SuplementoIniciar', value)} value={dataDestete.SuplementoIniciar} > 
                      {date  ?  moment(date).add(7, 'days').format("LL") : 'Suplemento Iniciar'}
                      </Text>
                  </TouchableOpacity>   
            </View>

            <View style={styles.InputContener}>
                  <Text style={styles.TextInput}>Listos para venta</Text>   
                  <TouchableOpacity>
                      <Text  style={[styles.Input, styles.TextDate]} 
                      onPress={showDatepicker} onChangeText={(value) => handleChangeTest('ListosParaVenta', value)} value={dataDestete.ListosParaVenta} > 
                      {date  ?  moment(date).add(45, 'days').format("LL") : 'Listos para venta'}
                      </Text>
                  </TouchableOpacity>   
            </View>


           <View>
              <TouchableOpacity style={styles.button} onPress={() => Save() } >
                <Text style={styles.TextButton} >Guardar</Text>
              </TouchableOpacity>
            </View>
            

            <View>
              <TouchableOpacity style={styles.button1} onPress={()=> navigation.navigate('infoDestete')} >
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

      </ScrollView>

  )


}


const styles= StyleSheet.create({

  contener:{
      
    height:'100%',
    backgroundColor: '#2F6F90',
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
  backgroundColor:'#041542',
  marginBottom:5,
  marginTop:20,
  marginHorizontal:58,
  paddingTop:7,
  borderRadius:20,
  
},

button1:{
 alignItems:'center',
 width:'70%',
 height:65,
 backgroundColor:'#041542',
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