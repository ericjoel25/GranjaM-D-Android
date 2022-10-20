import React from 'react';
import{StyleSheet, Text, View, SafeAreaView, Image} from 'react-native';
import 'react-native-gesture-handler';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import granja from '../imagenes/granja.png';

export default function HomeHeader(){


    
 return(
    <SafeAreaView style={styles.Header}>
        <Image source={granja} style={styles.logo}/>
        <Text style={styles.HeaderText}>Granja M&D</Text>        
    </SafeAreaView>

 )


}

const styles= StyleSheet.create({

    Header:{
      position:'absolute',
      height:wp('25%'),
      width:wp('100%'),
      justifyContent:'center',
      alignItems:'center',
      borderColor:'#000',
      flexDirection:'row'   

    },
    logo:{
      width:wp('12%'),
      height:wp('12%')
    }, 
    HeaderText:{
        fontWeight:'bold',
        fontSize:wp('6%'),
        color:'#fff',
        letterSpacing:1, 
        alignSelf:'center',
     // marginRight:0,

    },
    SeachButton:{
      position:'absolute',
      right:16


    },
  
})