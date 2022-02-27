import React, { useState } from 'react';
import{StyleSheet, Text, TouchableOpacity, TextInput, View, SafeAreaView, Image, StatusBar, Alert } from 'react-native';
import{validateEmail} from '../firebase/validación';
import firebase from '../firebase/firebase';
import { LinearGradient } from 'expo-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function LogingForm(props){

    const {ChangeForm}=props;
    const [formData, setFormData] = useState(defaultValue());
    const [formError, setFormError ] = useState({});



    const login = () =>{
       // console.log('Iniciando');
       // console.log(formData);

 //Validar email      
        let errors ={};
        if(!formData.email || !formData.password ){
            if(!formData.email) errors.email=true;
            if(!formData.password) errors.password=true;
            
            AlertCompleteInfo()

        }else if(!validateEmail(formData.email)){
            errors.email=true;
            AlertCompleteInfo()
        }else{
          // console.log('Ok');

          firebase.auth().signInWithEmailAndPassword(formData.email, formData.password).catch(()=>{
              setFormError({
                  email: true,
                  password: true,
              });

              AlertCompleteInfo();
          });

         
        }

        setFormError(errors);
        
    };


    const onChange = (e, type) =>{
       // console.log("datas:", e.nativeEvent.text);
      //  console.log('type:', type);

        setFormData({...formData, [type]: e.nativeEvent.text});
    }


 function AlertCompleteInfo(){

    Alert.alert(
        'Validar Información 😎',
        'Correo electrónico o contraseña incorrecta.',
        [
          
          {
            text: 'Cancelar',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          { text: 'Verificar', onPress: () => console.log('Ok') }
        ],
        { cancelable: false }
      );

 }
    


    return(
      
        <LinearGradient colors={['#003B5A', '#A9CCE3']} style={styles.body}>       
             <StatusBar barStyle='light-content' hidden={false} backgroundColor='#A9CCE3' />

              <LinearGradient colors={['#A9CCE3','#003B5A']}  style={styles.container}>
              
                    <Image style={styles.logo} source={require('../imagenes/granja.png')} />
                    
                        <TextInput style={[styles.Input,  formError.email && styles.error]} 
                        placeholder='Correo electronico' 
                        placeholderTextColor='#969696'  onChange={(e) => onChange(e, "email")}/>

                        <TextInput style={[styles.Input,  formError.password && styles.error]} 
                        placeholder='Contraseña' 
                        secureTextEntry={true} 
                        placeholderTextColor='#969696' onChange={(e) => onChange(e, "password")}/>

                        <TouchableOpacity onPress={login}>
                            <Text style={styles.btnText} >Iniciar sesión</Text>
                        </TouchableOpacity>
                    
                    <View style={styles.login}>
                            <TouchableOpacity  onPress={ChangeForm}>
                                    <Text style={styles.btnText}>Registrarse</Text>
                            </TouchableOpacity>
                    </View>
                        
                </LinearGradient> 
            </LinearGradient>     
       

    )

}

function defaultValue(){
    return{

        email: "",
        password:"",
    }
    
}
const styles = StyleSheet.create({

    body:{
        flex:1,
        backgroundColor:'blue',
        justifyContent:'center',
        alignItems:'center'
    },
    container:{
      position:'absolute',
      top:'20%',
      backgroundColor:'red',
      width:wp('85%'),
      height:wp('100%'),
      alignItems:'center',
      borderRadius:wp('7%')

    },
    logo:{
        position:'relative',
        top:wp('-15%'),
        minHeight:wp('30%'),
        minWidth:wp('30%'),
        maxHeight:wp('30%'),
        maxWidth:wp('30%')


    },
    btnText:{
  
        color: '#fff',
        fontSize:wp('6%'),
        fontWeight:'bold',
        marginBottom:wp('4%')
  //      marginRight:5,
    //    marginBottom:10
    },
    Input:{
        position:'relative',
        top:'-10%',
        width:'90%',
        height:'15%',
        color:'#fff',
        backgroundColor:'#0E4B68',
        marginBottom:wp('2.5%'),
        marginHorizontal:wp('3%'),
        borderRadius:wp('10%'),
        paddingLeft:wp('5%'),
        borderWidth:wp('0.5'),
        borderColor:'#0C3142',
        fontWeight:'bold',
        fontSize:wp('4.5%'),
        borderColor:'#000'       
    
    }, 
    login:{
        marginTop:wp('2%'),
    },
    
    error:{
        borderColor:'#940c0c',
        borderWidth:wp('1%')
     }

 
    
})