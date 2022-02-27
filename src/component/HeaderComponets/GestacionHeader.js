import React from 'react';
import{StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Navigation from '../../navigation/navigation';
import 'react-native-gesture-handler';


export default function GestacionHeader(props){
 
    const{navigation}=props;

 const GoTo = ()=>{

    navigation.navigate('Notification')
    
 } 



 return(
    <View style={styles.Header}>
       
        <View>
            <Text style={styles.HeaderText}>Gestación</Text>
           
        </View>
        
        <View >
           <Ionicons name="md-notifications-sharp" size={40} color="#fff"  onPress={()=> GoTo()} style={styles.SeachButton} />
        </View>

    </View>

 )


}

const styles= StyleSheet.create({

    Header:{
        width:'100%',
        height:'100%',
        flexDirection:'row',
        alignItems:'center',
        marginHorizontal:25,
        justifyContent:'center',
       

    },
    HeaderText:{
        fontWeight:'bold',
        fontSize:30,
        color:'#fff',
        letterSpacing:1, 
        alignSelf:'center',
        marginRight:80,
        
    },
    SeachButton:{
      position:'relative',
      right:60,
      marginLeft:20

    }
    

})