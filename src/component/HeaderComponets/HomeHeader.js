import React from 'react';
import{StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import{MaterialIcons} from '@expo/vector-icons';
import Navigation from '../../navigation/navigation';
import 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function HomeHeader(){


    
 return(
    <LinearGradient colors={['#024862', '#239ECA']} style={styles.Header}>
       
        <View >
            <Text style={styles.HeaderText}>Granja M&D</Text>
        </View>
        
    </LinearGradient>

 )


}

const styles= StyleSheet.create({

    Header:{
      height:wp('30%'),
      width:wp('100%'),
      marginHorizontal:wp('-4.5%'),
      borderBottomLeftRadius:wp('5%'),
      borderBottomRightRadius:wp('5%'),
      justifyContent:'center',
      alignItems:'center',
      borderColor:'#000',
      borderBottomWidth:wp('0.5%'),
      borderLeftWidth: wp('0.5%'),
      borderRightWidth: wp('0.5%'),
     

    },

    HeaderText:{
        fontWeight:'bold',
        fontSize:30,
        color:'#fff',
        letterSpacing:1, 
        alignSelf:'center',
     //   marginRight:0,
      
    },
    SeachButton:{
      position:'absolute',
      right:16


    },
  
})