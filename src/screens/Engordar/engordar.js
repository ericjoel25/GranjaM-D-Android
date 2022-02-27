import React, {useState} from 'react';
import {View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar} from 'react-native';
import moment from 'moment';
import 'moment/locale/es-do';
import DateTimePicker from '@react-native-community/datetimepicker';
import firebase from '../../component/firebase/firebase';
import 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';

moment.locale('es-do');

const db = firebase.firestore(firebase);

export default function(props){
  
  const{navigation} =props
 
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [FormError, setFormError] = useState({});
  const [dataEngordar, setDataEngordar] = useState({
      NoLechones:'',
      Fecha:moment(date).format("LL"),
      Inicio:moment(date).format("LL"),
      Crecimiento:moment(date).add(21, 'days').format("LL"),
      Desarrollo:moment(date).add(42, 'days').format("LL"),
      Engorda:moment(date).add(63, 'days').format("LL"),
      Hoy: moment(date).format('MMMM Do YYYY, h:mm:ss a'),
      startAt: new Date()
  });

//Capturar los datos de los input

  const handleChangeTest=(name, value)=>{

    setDataEngordar({...dataEngordar, [name]: value});

   // console.log(dataVerraco);

  }


//Función para guardar los datos en firebase. 

 const SaveInformation = async () =>{

    let errors = [];

  if (!dataEngordar.NoLechones){
       
    alert('¡Por favor complete el formulario! 😅');

    }else{

      await db.collection('Engordar').add({

        NoLechones:dataEngordar.NoLechones,
        Fecha:moment(date).format("LL"),
        Inicio:moment(date).format("LL"),
        Crecimiento:moment(date).add(21, 'days').format("LL"),
        Desarrollo:moment(date).add(42, 'days').format("LL"),
        Engorda:moment(date).add(63, 'days').format("LL"),
        Hoy: moment(date).format('MMMM Do YYYY, h:mm:ss a'),
        startAt: new Date()

      }).then(() =>{

        console.log('Save');

      })
     

    }
    
    setDataEngordar({
      NoLechones:'',
      Fecha:moment(date).format("L"),
      Inicio:moment(date).format("L"),
      Crecimiento:moment(date).add(21, 'days').format("L"),
      Desarrollo:moment(date).add(42, 'days').format("L"),
      Engorda:moment(date).add(63, 'days').format("L"),
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

      <ScrollView >
        <LinearGradient style={styles.contener} colors={['#1D976C', '#93F9B9']} >
        <StatusBar barStyle='light-content' hidden={false} backgroundColor='#0995B8' />

           <View style={styles.InputContener}>
              <Text style={styles.TextInput}>No. Lechones: </Text>
              <TextInput style={styles.Input} placeholder='Número de lechones'
               onChangeText={(value)=> handleChangeTest('NoLechones', value)} value={dataEngordar.NoLechones} />
           </View>

           <View style={styles.InputContener}>
                  <Text style={styles.TextInput}>Fecha del destete:</Text>   
                  <TouchableOpacity>
                      <Text  style={[styles.Input, styles.TextDate]} 
                      onPress={showDatepicker} onChangeText={(value) => handleChangeTest('Fecha', value)} value={dataEngordar.Fecha} > 
                      {date  ?  moment(date).format("LL") : 'Fecha del destete'}
                      </Text>
                  </TouchableOpacity>   
            </View>


            <View style={styles.InputContener}>
                  <Text style={styles.TextInput}>Inicio:</Text>   
                  <TouchableOpacity>
                      <Text  style={[styles.Input, styles.TextDate]} 
                      onPress={showDatepicker} onChangeText={(value) => handleChangeTest('Inicio', value)} value={dataEngordar.Inicio} > 
                      {date  ?  moment(date).format("LL") : 'Inicio'}
                      </Text>
                  </TouchableOpacity>   
            </View>

            <View style={styles.InputContener}>
                  <Text style={styles.TextInput}>Crecimiento:</Text>   
                  <TouchableOpacity>
                      <Text  style={[styles.Input, styles.TextDate]} 
                      onPress={showDatepicker} onChangeText={(value) => handleChangeTest('Crecimiento', value)} value={dataEngordar.Crecimiento} > 
                      {date  ?  moment(date).add(21, 'days').format("LL") : 'Crecimiento'}
                      </Text>
                  </TouchableOpacity>   
            </View>

            <View style={styles.InputContener}>
                  <Text style={styles.TextInput}>Desarrollo:</Text>   
                  <TouchableOpacity>
                      <Text  style={[styles.Input, styles.TextDate]} 
                      onPress={showDatepicker} onChangeText={(value) => handleChangeTest('Desarrollo', value)} value={dataEngordar.Desarrollo} > 
                      {date  ?  moment(date).add(42, 'days').format("LL") : 'Desarrollo'}
                      </Text>
                  </TouchableOpacity>   
            </View>

            <View style={styles.InputContener}>
                  <Text style={styles.TextInput}>Engorda:</Text>   
                  <TouchableOpacity>
                      <Text  style={[styles.Input, styles.TextDate]} 
                      onPress={showDatepicker} onChangeText={(value) => handleChangeTest('Engorda', value)} value={dataEngordar.Engorda} > 
                      {date  ?  moment(date).add(63, 'days').format("LL") : 'Engorda'}
                      </Text>
                  </TouchableOpacity>   
            </View>

          
           <View>
              <TouchableOpacity style={styles.button} onPress={() => Save()} >
                <Text style={styles.TextButton} >Guardar</Text>
              </TouchableOpacity>
            </View>
            

            <View>
              <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('infoEngordar')}>
                <Text style={styles.TextButton}>Mostrar</Text>
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
    backgroundColor: '#F1BB62',
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
  backgroundColor:'#0B738C',
  marginBottom:5,
  marginTop:10,
  marginHorizontal:58,
  paddingTop:7,
  borderRadius:20,
  
},

button1:{
 alignItems:'center',
 width:'70%',
 height:65,
 backgroundColor:'#0B738C',
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