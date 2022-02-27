import React, {useEffect, useState, useRef} from 'react';
import 'react-native-gesture-handler';
import {View, StyleSheet, Text, TextInput, ScrollView, 
TouchableOpacity, Alert, StatusBar, Keyboard, Platform} from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import moment from 'moment';
import 'moment/locale/es-do';
import DateTimePicker from '@react-native-community/datetimepicker';
import firebase from '../../component/firebase/firebase';
import 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';



const db = firebase.firestore(firebase);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});



export default function SetGestación(props){
 
  const {navigation}=props;
  
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [formError, setFormError]= useState({})
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const[formData, setFormData] = useState({
    NoDelCerdo:'',
    Edad:'',
    NoCerda:'',
    NoParto:'',
    InicioDeGestación:  moment(date).format("LL"),
    FinDeGestación:  moment(date).add(114, 'days').format("LL"),
    NoDeLechones:'',
    Vivos:'',
    Muertos:'',
    Hoy: moment(date).format('MMMM Do YYYY, h:mm:ss a'),
    startAt: new Date()
  });



  const handleChangeTest=(name, value) =>{
    
     setFormData({...formData, [name]: value});
     
    //console.log(formData.NoDelCerdo);
  }



//Funciones para gestionar el calendario
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
    { text: 'Guardar', onPress:async () =>  await schedulePushNotification () }
  ],
  { cancelable: false }
);
  
}

//Alerta
const alertEmptyForm = () =>{

  Alert.alert(
    'Granja M&D',
    '¡Por favor complete el formulario! 😅',
    [
      
      {
        text: 'Completar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }
      
    ],
    { cancelable: false }
  );
    
  }

//alerta
  const alertNotificacion = () =>{

    const Mensaje = `Se programó el envio de una notificación sobre el fin de gestación de la cerda "${formData.NoCerda}" en la fecha ${moment(date).add(114, 'days').format("L")}`;

    Alert.alert(
      'Granja M&D',
       Mensaje,
      [
        
        {
          text: 'Aceptar',
            onPress: () => console.log('Done'),
          style: 'cancel'
        }
        
      ],
      { cancelable: false }
    );
      
    }

  /* Notificaciones  inicio del codigo */

  async function schedulePushNotification() {
    
  
    
    let errors = {};

    if(!formData.NoDelCerdo || !formData.Edad || !formData.NoCerda || !formData.NoParto ||
        !formData.InicioDeGestación || !formData.FinDeGestación || !formData.NoDeLechones ||
        !formData.Vivos         
       ){
        if(!formData.NoDelCerdo) errors.NoDelCerdo=true;
        if(!formData.Edad) errors.Edad =true;
        if(!formData.NoCerda) errors.NoCerda=true;
        if(!formData.NoParto) errors.NoParto=true;
        if(!formData.InicioDeGestación) errors.InicioDeGestación=true;
        if(!formData.FinDeGestación) errors.FinDeGestación=true;
        if(!formData.NoDeLechones) errors.NoDeLechones=true;
        if(!formData.Vivos) errors.Vivos=true;  

        alertEmptyForm();

      }else{

        const Time = 9763200;
        const bodyMS= `Gestación de la cerda ${formData.NoCerda} fecha ${moment(date).add(114, 'days').format("L")}.`;
        console.log(bodyMS);
        
        const identifier = await Notifications.scheduleNotificationAsync({
          content: {
            title: "Granja M&D 📬",
            body: bodyMS,
            data: { data: 'goes here' },
          },
          trigger: { seconds: Time},
        }) 
        

     //   console.log(formData);
     await db.collection('Gestacion').add({
      
      NoDelCerdo: formData.NoDelCerdo,
      Edad: formData.Edad,
      NoCerda: formData.NoCerda,
      NoParto: formData.NoParto,
      InicioDeGestación:  moment(date).format("L"),
      FinDeGestación:  moment(date).add(114, 'days').format("L"),
      NoDeLechones: formData.NoDeLechones,
      Vivos:formData.Vivos,
      Muertos: formData.NoDeLechones - formData.Vivos,
      NotificationId:identifier,
      Hoy: moment(date).format('MMMM Do YYYY, h:mm:ss a'),
      startAt:new Date()
 
     }).then(()=>{
      
      alertNotificacion()
      console.log('Save');
      
     })

      

     } 

    setFormData({
      NoDelCerdo:'',
      Edad:'',
      NoCerda:'',
      NoParto:'',
      InicioDeGestación:  moment(date).format("LL"),
      FinDeGestación:  moment(date).add(114, 'days').format("LL"),
      NoDeLechones:'',
      Vivos:'',
      Muertos:'',
      Hoy: moment(date).format('MMMM Do YYYY, h:mm:ss a'),
      startAt:new Date()
  
    })

    setFormError(errors);


}


  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);



  /*async function scheduleAndCancel(){
    await Notifications.cancelScheduledNotificationAsync(notificationId);
    
    alert(notificationId);

 }*/

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }

 
    return(
         
      
        <ScrollView >
        <StatusBar  barStyle='light-content' hidden={false} backgroundColor='#0995B8'/>
                <LinearGradient colors={['#45C0B5', '#1C9B90']} style={styles.contener} >
               
            <View style={styles.InputContener}>
              <Text style={styles.TextInput}>N. Del Cerdo:</Text>
              <TextInput style={[styles.Input, formError.NoDelCerdo && {borderColor:'#940c0c'}]} placeholder='N. Del Cerdo' 
              onChangeText={(value) => handleChangeTest('NoDelCerdo', value)} value={formData.NoDelCerdo}/>
            </View>

            
            <View style={styles.InputContener}>
              <Text style={styles.TextInput}>Edad:</Text>
              <TextInput style={[styles.Input, formError.Edad && {borderColor:'#940c0c'}]} placeholder='Edad'  
              onChangeText={(value) => handleChangeTest('Edad', value)} value={formData.Edad}/>
            </View>

            
            <View style={styles.InputContener}>
              <Text style={styles.TextInput}>No. Cerda:</Text>
              <TextInput style={[styles.Input, formError.NoCerda && {borderColor:'#940c0c'}]} placeholder='No. Cerda' 
              onChangeText={(value) => handleChangeTest('NoCerda', value)}  value={formData.NoCerda}/>
            </View>

            
            <View style={styles.InputContener}>
              <Text style={styles.TextInput}>No. parto:</Text>
              <TextInput style={[styles.Input, formError.NoParto && {borderColor:'#940c0c'}]} placeholder='No. parto' 
              onChangeText={(value) => handleChangeTest('NoParto', value)} value={formData.NoParto} />
            </View>

            
            <View style={styles.InputContener}>
              <Text style={styles.TextInput}> Inicio de gestación:</Text>
              
              <TouchableOpacity>
                  <Text  style={[styles.Input, styles.TextDate, formError.InicioDeGestación && {borderColor:'#940c0c'}]} 
                  onPress={showDatepicker} onChangeText={(value) => handleChangeTest('InicioDeGestación', value)} value={formData.InicioDeGestación} > {date 
                  ?  moment(date).format("LL") 
                  : 'Inicion de gestación'}
                  </Text>
              </TouchableOpacity>
           
            </View>

            <View style={styles.InputContener}>
             <Text style={styles.TextInput}> Fin de gestación:</Text>
             
             <TouchableOpacity>
                <Text  style={[styles.Input, styles.TextDate, formError.FinDeGestación && {borderColor:'#940c0c'}]}  onPress={showDatepicker} 
                  onChangeText={(value) => handleChangeTest('FinDeGestación', value)} value={formData.FinDeGestación} > {date 
                  ? moment(date).add(114, 'days').format("LL")
                  : 'Inicion de gestación'}
                  </Text>
             </TouchableOpacity>
              
            </View>

            
            <View>
              <Text style={styles.Texttitle}>Cria</Text>
            </View>

            <View style={styles.InputContener}>
              <Text style={styles.TextInput}>Numero de lechones:</Text>
              <TextInput style={[styles.Input, formError.NoDeLechones && {borderColor:'#940c0c'}]} placeholder='Numero de lechones' 
              onChangeText={(value) => handleChangeTest('NoDeLechones', value)}  value={formData.NoDeLechones}/>
            </View>

            
            <View style={styles.InputContener}>
              <Text style={styles.TextInput}>Vivos:</Text>
              <TextInput style={[styles.Input, formError.Vivos && {borderColor:'#940c0c'}]} placeholder='Vivos' 
              onChangeText={(value) => handleChangeTest('Vivos', value)} value={formData.Vivos}/>
            </View>

            
            <View style={styles.InputContener}>
              <Text style={styles.TextInput}>Muertos:</Text>
              <Text style={[styles.Input, styles.TextDate]} placeholder='Muertos'  
              onChangeText={(value) => handleChangeTest('Muertos', value)} value={formData.Muertos}> {formData 
                ? formData.NoDeLechones - formData.Vivos
                : 'Inicion de gestación'}  </Text>
            </View>

            <View>
              <TouchableOpacity style={styles.button} onPress={()=> Save()}>
                <Text style={styles.TextButton} >Guardar</Text>
              </TouchableOpacity>
            </View>
            

            <View>
              <TouchableOpacity style={styles.button1}  onPress={() => navigation.navigate('infoGestación')}>
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
       
    );


}





const styles = StyleSheet.create({


    contener:{
      flex:10,
      zIndex:2,
      height:'100%',
    //backgroundColor: '#D2F39C',


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
       fontSize:20,
       fontWeight:'bold',
       marginRight:10,
       marginLeft:15
         
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

     
   }

  
  })