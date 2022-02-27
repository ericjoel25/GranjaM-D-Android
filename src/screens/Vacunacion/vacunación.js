import React, {useState} from 'react';
import 'react-native-gesture-handler';
import {View, StyleSheet, Text, TextInput, ScrollView, TouchableOpacity, Alert, StatusBar} from 'react-native';
import moment from 'moment';
import 'moment/locale/es-do';
import DateTimePicker from '@react-native-community/datetimepicker';
import firebase from '../../component/firebase/firebase';
import 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';


firebase.firestore().settings({experimentalForceLongPolling: true});

const db = firebase.firestore(firebase);


export default function SetVarraco(props){
 
  const {navigation}=props;
  

  moment.locale('es-do');

  const [formError, setFormError]= useState({})
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [date2, setDate2] = useState(new Date());
  const [mode2, setMode2] = useState('date');
  const [show2, setShow2] = useState(false);
  const[formDataVacunación, setFormDataVacunación] = useState({
    Fecha:  moment(date).format("LL"),
    TipoDeVacuna:'',
    Fecha2:  moment(date2).format("LL"),
    NoDeCerda:'',
    TipoDeVitamina:'',
    Hoy: moment(date).format('MMMM Do YYYY, h:mm:ss a'),
    startAt: new Date()
  });



 

  const handleChangeTest=(name, value) =>{
    
    setFormDataVacunación({...formDataVacunación, [name]: value});
     
     console.log(formDataVacunación);
  }

  const AddFormData = async () => {
    
    let errors = {};

    if(!formDataVacunación.TipoDeVacuna || !formDataVacunación.NoDeCerda 
      || !formDataVacunación.TipoDeVitamina 
       ){
         
        alert('¡Por favor complete el formulario! 😅');
          
      }else{

       
     //   console.log(formData);
     await db.collection('Vacunación').add({ 

      Fecha:  moment(date).format("LL"),
      TipoDeVacuna:formDataVacunación.TipoDeVacuna,
      Fecha2:  moment(date2).format("LL"),
      NoDeCerda: formDataVacunación.NoDeCerda,
      TipoDeVitamina: formDataVacunación.TipoDeVitamina,
      Hoy: moment(date).format('MMMM Do YYYY, h:mm:ss a'),
      startAt: new Date()

     }).then(()=>{
           
      
      console.log('Save');
      
     })

      

     }
     

     setFormDataVacunación({
       
      Fecha: moment(date).format("LL"),
      TipoDeVacuna:'',
      Fecha2: moment(date2).format("LL"),
      NoDeCerda:'',
      TipoDeVitamina:'',
      Hoy: moment(date).format('MMMM Do YYYY, h:mm:ss a'),
      startAt: new Date()

    })

    setFormError(errors);

  }


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
     
  };

  
  const onChange2 = (event, selectedDate) => {
    const currentDate = selectedDate || date2;
    setShow2(Platform.OS === 'ios');
    setDate2(currentDate);
     
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  
  };

  const showMode2 = (currentMode) => {
    setShow2(true);
    setMode2(currentMode);
  
  };

  const showDatepicker = () => {
    showMode('date');
    
  };

  const showDatepicker2 = () => {
    showMode2('date');
    
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
    { text: 'Guardar', onPress: () => AddFormData() }
  ],
  { cancelable: false }
);
  
}
 


    return(
         
     
        <ScrollView >

        <LinearGradient colors={['#DAD299', '#B0DAB9']} style={styles.contener}>
        <StatusBar barStyle='light-content' />
                
            <Text style={styles.bodyText}>Vacuna General De Gestación</Text>
             
            <View style={styles.InputContener}>
              <Text style={styles.TextInput}>Fecha:</Text>   
                  <TouchableOpacity>
                      <Text  style={[styles.Input, styles.TextDate, formError.Fecha && {borderColor:'#940c0c'}]} 
                      onPress={showDatepicker} onChangeText={(value) => handleChangeTest('Fecha', value)} value={formDataVacunación.Fecha} > 
                      {date  ?  moment(date).format("LL") : 'Fecha'}
                      </Text>
                  </TouchableOpacity>   
            </View>

               
            <View style={styles.InputContener}>
              <Text style={styles.TextInput}>Tipo de vacuna:</Text>
              <TextInput style={[styles.Input, formError.NoDelCerdo && {borderColor:'#940c0c'}]} placeholder='Tipo de vacuna' 
              onChangeText={(value) => handleChangeTest('TipoDeVacuna', value)} value={formDataVacunación.TipoDeVacuna}/>
            </View>

            <Text style={styles.bodyText}>Vacuna Individual</Text>

            <View style={styles.InputContener}>
              <Text style={styles.TextInput}>Fecha:</Text>   
                  <TouchableOpacity>
                      <Text  style={[styles.Input, styles.TextDate, formError.Fecha && {borderColor:'#940c0c'}]} 
                      onPress={showDatepicker2} onChangeText={(value) => handleChangeTest('Fecha2', value)} value={formDataVacunación.Fecha2} > 
                      {date2  ?  moment(date2).format("LL") : 'Fecha'}
                      </Text>
                  </TouchableOpacity>   
            </View>


         
            
            <View style={styles.InputContener}>
              <Text style={styles.TextInput}>No. de cerda :</Text>
              <TextInput style={[styles.Input, formError.Edad && {borderColor:'#940c0c'}]} placeholder='Número de cerda'  
              onChangeText={(value) => handleChangeTest('NoDeCerda', value)} value={formDataVacunación.NoDeCerda}/>
            </View>

            
            <View style={styles.InputContener}>
              <Text style={styles.TextInput}>Tipo de vitamina:</Text>
              <TextInput style={[styles.Input, formError.NoDeLaCerda && {borderColor:'#940c0c'}]} placeholder='Tipo de vitamina' 
              onChangeText={(value) => handleChangeTest('TipoDeVitamina', value)}  value={formDataVacunación.TipoDeVitamina}/>
            </View>

                        
            
            <View>
              <TouchableOpacity style={styles.button} onPress={()=> Save()}>
                <Text style={styles.TextButton} >Guardar</Text>
              </TouchableOpacity>
            </View>
            

            <View>
              <TouchableOpacity style={styles.button1}  onPress={() => navigation.navigate('InfoVacunación')}>
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

            {show2 && (
            <DateTimePicker
            testID="dateTimePicker2"
            value={date2}
            mode={mode2}
            is24Hour={true}
            display="default"
            onChange={onChange2}
              />
            )}
            
            

           </LinearGradient> 

         </ScrollView>

    );


}


const styles = StyleSheet.create({


    contener:{
      
      height:'100%',
      backgroundColor: '#A2D9CE',
      position:'relative'


    },

   InputContener:{
    //flexDirection:'row',
      marginTop:10,
      
    // alignItems:'center'
  
    },
    
    Input:{
       backgroundColor:'#F6FAF6',
       width: '95%',
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
       backgroundColor:'#0E70A4',
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
      backgroundColor:'#0E70A4',
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
   TextDate:{
      paddingTop:2,
      paddingTop:8
   },

   Texttitle:{
     fontSize:25,
     textAlign:'center',
     fontWeight:'bold',
     marginTop:2

     
   },
   bodyText:{
    fontSize:23,
    fontWeight:'bold',
    textAlign:'center',
    marginTop:10

   }

  
  })