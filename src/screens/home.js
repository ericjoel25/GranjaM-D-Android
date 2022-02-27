import React, { useRef, useState } from "react";
import 'react-native-gesture-handler';
import { View, StyleSheet, SafeAreaView, Text, Modal, StatusBar, TouchableOpacity, Image } from "react-native";
import firebase from '../component/firebase/firebase';
import { LinearGradient } from 'expo-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as Animatable from 'react-native-animatable';


export default function Home(props) {

  const { navigation } = props;
  const [openCloseModal, setOpenCloseModal]= useState(false)
  const viewCloseAnimetion = useRef()


 const closeSesion = async ()=>{
   await firebase.auth().signOut()
 }

 const closeOpenModal = async ()=>{
   await viewCloseAnimetion.current.zoomOutDown() 
   await setOpenCloseModal(false)
 }

  const CloseModal =()=>{
     return(

      <Modal transparent={true} visible={openCloseModal}>
        <View style={styles.CloseModalContainer}>
          <Animatable.View ref={viewCloseAnimetion} animation='zoomInDown' >
          <LinearGradient colors={['#005285', '#001623']} style={styles.CloseModalBody}>
            <View style={styles.CloseModalBodyTextContainer}>
              <Text style={styles.CloseModalBodyText}>
                Esta seguro que desea cerrar esta sesión
              </Text>
            </View>

            <View style={styles.CloseModalBottonContainer}>
              <TouchableOpacity style={styles.CloseModalBotton} onPress={()=> closeOpenModal()}>
                <Text  style={styles.CloseModalBottonText}>Descartar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.CloseModalBotton} onPress={async ()=> await closeSesion()}>
                <Text style={styles.CloseModalBottonText}>Cerrar</Text>
              </TouchableOpacity>
               
            </View>

          </LinearGradient>
          </Animatable.View>
        </View>

      </Modal>
     
     )
  }

  return (

    <LinearGradient colors={['#00837F', '#A9CCE3']} style={styles.container} >

      <StatusBar barStyle='light-content' hidden={false} backgroundColor='#239ECA' />

      <View >

        <View style={[styles.object, { marginTop: 28 }]}>
          <TouchableOpacity onPress={() => navigation.navigate('gestación')}>
            <LinearGradient colors={['#00416A', '#E4E5E6']} style={styles.button}  >
              <Image style={{ height: 95, width: 95 }} source={require('../component/imagenes/cuatro.png')} />
              <Text style={styles.Text}>Gestación</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('varraco')}>
            <LinearGradient colors={['#00416A', '#E4E5E6']} style={styles.button}  >
              <Image style={{ height: 96, width: 125 }} source={require('../component/imagenes/uno.png')} />
              <Text style={styles.Text}>Verraco</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>


        <View style={styles.object}>
          <TouchableOpacity onPress={() => navigation.navigate('engordar')}>
            <LinearGradient colors={['#00416A', '#E4E5E6']} style={styles.button}  >
              <Image style={{ height: 100, width: 100 }} source={require('../component/imagenes/dos.png')} />
              <Text style={styles.Text}>Engordar</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('destete')}>
            <LinearGradient colors={['#00416A', '#E4E5E6']} style={styles.button}  >
              <Image style={{ height: 96, width: 125 }} source={require('../component/imagenes/tres.png')} />
              <Text style={styles.Text}>Destete</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.object}>
          <TouchableOpacity onPress={() => navigation.navigate('vacunación')}>
            <LinearGradient colors={['#00416A', '#E4E5E6']} style={styles.button}  >
              <Image style={{ height: 100, width: 100 }} source={require('../component/imagenes/5.png')} />
              <Text style={styles.Text}>Vacunación</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>



      </View>

      <LinearGradient colors={['#024862', '#239ECA']} style={styles.footer}>
        <TouchableOpacity onPress={() => setOpenCloseModal(true)}>
          <Text style={styles.footerText} >
            Cerrar Sesión
          </Text>
        </TouchableOpacity>
      </LinearGradient>

        
        <CloseModal />

    </LinearGradient>

  )


}




const styles = StyleSheet.create({

  container: {
    position: 'absolute',
    backgroundColor: "#0B5A8A",
    width: '100%',
    height: '100%',
    alignItems: 'center',
    marginTop: wp('20%')

  },

  object: {
    position: 'relative',
    width:wp('100%'),
    flexDirection: 'row',
  //  backgroundColor:'red',
    paddingHorizontal:wp('1.5%'),
  
    

    
   },

  button: {
    backgroundColor: "#fff",
    width: wp('45%'),
    height: wp('40%'),
    borderRadius: wp('5%'),
    margin:wp('2%'),
   // marginRight: 40,
    //marginTop: 25,
   // marginBottom: 20,
    alignItems: "center",

  },
  Text: {
    fontSize:wp('5%'),
    paddingBottom: wp('4%'),
    fontWeight: 'bold'

  },

  footer: {
    position: 'absolute',
    bottom: wp('0%'),
    backgroundColor: '#036082',
    marginBottom: wp('20%'),
    height: wp('20%'),
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius:wp('10%'),
    borderTopRightRadius: wp('10%'),
    justifyContent:'center',
    alignItems:'center'

  },

  footerText: {
    height: wp('13%'),
    width: wp('45%'),
    fontSize: wp('5%'),
    color: '#fff',
    backgroundColor: '#A93226',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: wp('5%'),
    fontWeight: 'bold',
   paddingTop:wp('2%')
   

  },
  CloseModalContainer:{
    flex:1,
   // backgroundColor:'red',
    justifyContent:'center',
    alignItems:'center'
  },
  CloseModalBody:{
    width:wp('90%'),
    height:wp('50%'),
    backgroundColor:'#fff',
    borderRadius:wp('5%')
  },
  CloseModalBodyTextContainer:{
  //  backgroundColor:'red',
    height:wp('28%'),
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:wp('5%')
  },
  CloseModalBodyText:{
    fontSize:wp('5%'),
    textAlign:'center',
    fontWeight:'bold',
    color:'#fff'
  },
  CloseModalBottonContainer:{
     height:wp('21%'),
 //    backgroundColor:'blue',
     flexDirection:'row',
     justifyContent:'center',
     alignItems:'flex-end',
     paddingBottom:wp('1%')
  },
  CloseModalBotton:{
    width:wp('30%'),
    height:wp('12%'),
    backgroundColor:'#003C61',
    marginHorizontal:wp('5%'),
    justifyContent:'center',
    alignItems:'center',
    borderRadius:wp('3%'),
    
  },
  CloseModalBottonText:{
    fontSize:wp('4.5%'),
    fontWeight:'bold',
    color:'#fff'

  }


})