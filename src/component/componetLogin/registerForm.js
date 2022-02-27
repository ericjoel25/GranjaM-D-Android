import React, { useState, Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, SafeAreaView, Image, StatusBar, Alert } from 'react-native';
import { validateEmail } from '../firebase/validación';
import firebase from '../firebase/firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function RegisterForm(props) {

    const { ChangeForm } = props;

    //Guarda los estados del input   
    const [formData, setFormData] = useState(defaultValue());
    const [formError, setFormError] = useState({});




    const Register = () => {
        //Mostrar el error
        let errors = {};
        if (!formData.email || !formData.password || !formData.repeatPassword) {
            if (!formData.email) errors.email = true;
            if (!formData.password) errors.password = true;
            if (!formData.repeatPassword) errors.repeatPassword = true;

            AlertCompleteInfo();

        } else if (!validateEmail(formData.email)) {
            errors.email = true;
            AlertCompleteInfo();

        } else if (formData.password != formData.repeatPassword) {
            errors.password = true;
            errors.repeatPassword = true;
            AlertCompleteInfo();

        } else if (formData.password.length < 6) {
            errors.password = true;
            errors.repeatPassword = true;
            AlertCompleteInfo();

        } else {
            firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password).then(
                () => {
                    console.log('Cuenta Creado')
                    AlertSave();
                }
            ).catch(() => {
                setFormError({
                    email: true,
                    password: true,
                    repeatPassword: true,
                })
            })
            console.log('Todo bien');
        }


        setFormError(errors);


    }


    function AlertCompleteInfo() {

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

    function AlertSave() {

        Alert.alert(
            '¡Excelente! 🤗',
            'La cuenta fue creada satisfactoriamente.',
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


    return (

        <LinearGradient colors={['#003B5A', '#A9CCE3']} style={styles.body}>
            <StatusBar barStyle='light-content' hidden={false} backgroundColor='#A9CCE3' />
            <LinearGradient colors={['#A9CCE3','#003B5A']} style={styles.container}>

                <Image style={styles.logo} source={require('../imagenes/granja.png')} />

                <TextInput style={[styles.Input, formError.email && styles.error]}
                    placeholder='Correo electronico'
                    placeholderTextColor='#969696'
                    onChange={e => setFormData({ ...formData, email: e.nativeEvent.text })} />

                <TextInput style={[styles.Input, formError.password && styles.error]}
                    placeholder='Contraseña'
                    placeholderTextColor='#969696'
                    secureTextEntry={true}
                    onChange={e => setFormData({ ...formData, password: e.nativeEvent.text })} />

                <TextInput style={[styles.Input, formError.repeatPassword && styles.error]}
                    placeholder='Confirmar contraseña'
                    placeholderTextColor='#969696'
                    secureTextEntry={true}
                    onChange={e => setFormData({ ...formData, repeatPassword: e.nativeEvent.text })} />

                <TouchableOpacity style={styles.login} onPress={Register}>
                    <Text style={styles.btnText}  >Registrarse</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.login} onPress={ChangeForm}>
                    <Text style={styles.btnText} > Iniciar Sesión</Text>
                </TouchableOpacity>


            </LinearGradient>
        </LinearGradient>


    )

}

function defaultValue() {
    return {
        email: '',
        password: '',
        repeatPassword: '',

    }

}

const styles = StyleSheet.create({

    body: {
        flex: 1,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        position: 'absolute',
        top: '20%',
        backgroundColor: 'red',
        width: wp('85%'),
        height: wp('120%'),
        alignItems: 'center',
        borderRadius: wp('7%')

    },
    logo: {
        position:'relative',
        top:wp('-15%'),
        minHeight:wp('30%'),
        minWidth:wp('30%'),
        maxHeight:wp('30%'),
        maxWidth:wp('30%')

    },

    Input: {
        position:'relative',
        top:'-10%',
        width:'90%',
        height:'13%',
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
    btnText: {
        color: '#fff',
        fontSize:wp('5.5%'),
        fontWeight:'bold',
        marginBottom:wp('4%')

    },


    login: {
        marginTop:wp('2%'),
    },
    error: {
        borderColor:'#940c0c',
        borderWidth:wp('1%')

    },


})