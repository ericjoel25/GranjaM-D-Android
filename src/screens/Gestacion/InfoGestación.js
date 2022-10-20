import React, { useEffect, useState } from "react";
import 'react-native-gesture-handler';
import { SafeAreaView, Text, TouchableOpacity, FlatList, View, StyleSheet, ScrollView, Alert, Image, ActivityIndicator } from "react-native";
import firebase from '../../component/firebase/firebase';
import 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialCommunityIcons, MaterialIcons, AntDesign } from '@expo/vector-icons';


const db = firebase.firestore(firebase);


export default function App(props) {

  const { navigation } = props;


  const [formData, setFormData] = useState({});
  const [totalFormData, setTotalFormData] = useState(0);
  const [startFormData, setStartFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const limitData = 6;
  
  console.log(formData.length)

  useEffect(() => {

    GetInformaFromDataBase()
    
  },[]);



 function GetInformaFromDataBase (){
     //Obtener el tamaño de todo los dactos
     db.collection('Gestacion').get().then((snap) => {
      setTotalFormData(snap.size);

    });

    //obtener la information de cada arreglo
    const listData = [];
    db.collection('Gestacion').orderBy('startAt', 'desc').limit(limitData).get().then((response) => {

      setStartFormData(response.docs[response.docs.length - 1]);

      response.forEach((doc) => {
        const formDataInformation = doc.data();
        formDataInformation.id = doc.id;

        //  console.log(formDataInformation);

        listData.push(formDataInformation);

      });

      setFormData(listData);

    });


 }

  return (

    <SafeAreaView>

      {
        formData.length > 0 ? (
          <FlatList

            data={formData}
            renderItem={(item) => (
              <FormData
                formData={item}
                setFormData={setFormData}
                navigation={navigation}
                GetInformaFromDataBase={GetInformaFromDataBase}

              />)

            }


            ListFooterComponent={<Footer setFormData={setFormData}
              formData={formData} setStartFormData={setStartFormData}
              startFormData={startFormData} setIsLoading={setIsLoading}
            />}

          />

        ) : (

          <View style={{ alignSelf: 'center' }}>
            <View style={{ width: 120, height: 120, borderColor: 'red', alignItems: 'center' }}>
              <ActivityIndicator style={{ alignSelf: 'center' }} size='large' />

            </View>

            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 70, marginTop: -35 }}>Cargando...</Text>

            <View style={styles.ImageContainer}>
              <Image style={styles.Image} source={require('../../component/imagenes/granja.png')} />
            </View>

            <Text style={{ marginTop: '68%', marginLeft: -70 }}>Power by Eric Marte</Text>


          </View>

        )
      }




    </SafeAreaView>


  )

}



function Footer(props) {

  const { formData, setFormData, setStartFormData, startFormData,
    totalFormData, setIsLoading } = props

  const Mas = () => {

    const string = "No hay más contenido que mostrar. 😅";

    const limitData = 6;

    const listData2 = [];

    formData < totalFormData && setIsLoading(true);

    db.collection('Gestacion').orderBy('startAt', 'desc')
      .startAfter(startFormData.data().startAt)
      .limit(limitData).get().then((response) => {

        if (response.docs.length > 0) {

          setStartFormData(response.docs[response.docs.length - 1]);

        } else {

          setIsLoading(false);
          alertNoForm()
        }

        response.forEach((doc) => {

          const formDataInformation = doc.data();
          formDataInformation.id = doc.id;

          listData2.push(formDataInformation);



        });

        setFormData([...formData, ...listData2]);

      });


    const alertNoForm = () => {

      Alert.alert(
        'Granja M&D',
        string,
        [

          {
            text: 'aceptar',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          }

        ],
        { cancelable: false }
      );

    }



  }


  return (
    <View style={styles.cargarMasContainer}>
      <TouchableOpacity style={styles.FooterButton} onPress={() => Mas()} >
        <AntDesign name="pluscircle" size={wp('12%')} color="black" />
      </TouchableOpacity>
    </View>
  )

}

function FormData(props) {

  const { formData, setFormData, navigation, GetInformaFromDataBase } = props
  const { NoDelCerdo,
    Edad,
    NoCerda,
    NoParto,
    InicioDeGestación,
    FinDeGestación,
    NoDeLechones,
    Vivos,
    Muertos,
    Hoy,
    id
  } = formData.item;

  // console.log(formData);

  const Delete = () => {

    Alert.alert(
      "¿Está seguro que desea elimiar esta información.",
      "Si eliminas esta información también se eliminara de la base de datos.",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Borrar", onPress: () => remove() }

      ],
      { cancelable: false }
    );


  }

  const remove = () => {

    console.log("OK Pressed")
    db.collection('Gestacion').doc(id).delete().then(function () {
      //console.log("Document successfully deleted!");

      navigation.navigate('gestación');

    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });

  }

  const updateInfo = () => {
    navigation.navigate('UpdateGestación', { id: id, GetInformaFromDataBase: GetInformaFromDataBase });
    setFormData({})

  }

  return (


    <ScrollView contentContainerStyle={styles.body}>

      <LinearGradient colors={['#E3EAE9', '#BEE2DF']} key={id} style={styles.container}>


        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Gestación </Text>
          </View>

          <Text style={styles.litleTime}>{Hoy}</Text>
        </View>

        <View style={styles.bodyContainer}>

          <View style={styles.ViewContainer}>
            <Text style={styles.TextContainer}>No Del Cerdo: </Text>
            <Text style={styles.AnswerContainer}>{NoDelCerdo}</Text>
          </View>

          <View style={styles.ViewContainer}>
            <Text style={styles.TextContainer}>Edad: </Text>
            <Text style={styles.AnswerContainer}>{Edad}</Text>
          </View>

          <View style={styles.ViewContainer}>
            <Text style={styles.TextContainer}>No. Cerda: </Text>
            <Text style={styles.AnswerContainer}>{NoCerda}</Text>
          </View>

          <View style={styles.ViewContainer}>
            <Text style={styles.TextContainer}>No. Parto: </Text>
            <Text style={styles.AnswerContainer}>{NoParto}</Text>
          </View>

          <View style={styles.ViewContainer}>
            <Text style={styles.TextContainer}>Inicio de gestación: </Text>
            <Text style={styles.AnswerContainer}>{InicioDeGestación}</Text>
          </View>

          <View style={styles.ViewContainer}>
            <Text style={styles.TextContainer}>Fin de gestación: </Text>
            <Text style={styles.AnswerContainer}>{FinDeGestación}</Text>
          </View>


          <View style={styles.ViewContainer}>
            <Text style={styles.TextContainer}>Numero de lechones: </Text>
            <Text style={styles.AnswerContainer}>{NoDeLechones}</Text>
          </View>

          <View style={styles.ViewContainer}>
            <Text style={styles.TextContainer}>Vivos: </Text>
            <Text style={styles.AnswerContainer}>{Vivos}</Text>
          </View>

          <View style={styles.ViewContainer}>
            <Text style={styles.TextContainer}>Muertos: </Text>
            <Text style={styles.AnswerContainer}>{Muertos}</Text>
          </View>

          <View style={styles.ViewContainer}>
            <Text style={styles.TextContainer}>Notificación:  </Text>
            <Text style={styles.AnswerContainer}>{FinDeGestación}</Text>
          </View>

        </View>

        <View style={styles.bottonContainer}>

          <TouchableOpacity style={styles.button} onPress={() => updateInfo()}>
            <MaterialIcons name="update" size={wp('12%')} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => Delete()}>
            <MaterialCommunityIcons name="delete-circle" size={wp('12%')} color="#fff" />
          </TouchableOpacity>

        </View>




      </LinearGradient>

    </ScrollView>







  )
}



const styles = StyleSheet.create({
  body: {
    backgroundColor: '#FFCD9F',
    flex: 1

  },
  titleContainer: {
    width: '40%',
    height: '100%',
    // backgroundColor:'red',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  title: {
    textAlign: 'center',
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#fff',

  },
  litleTime: {
    textAlign: 'right',
    fontSize: wp('3.5%'),
    fontWeight: 'bold',
    color: '#fff',
    marginTop: wp('2%'),
    width: '55%'

  },

  header: {
    flexDirection: 'row',
    backgroundColor: '#0B5A8A',
    height: wp('20%'),
    width: '100%',
    marginBottom: wp('5%'),
    borderTopLeftRadius: wp('3%'),
    borderTopRightRadius: wp('3%'),
    paddingVertical: wp('2%')

  },

  container: {
    backgroundColor: '#C8BA3E',
    marginTop: wp('5%'),
    marginHorizontal: wp('2.5%'),
    borderRadius: wp('3%'),
    marginBottom: wp('5%'),
    // paddingBottom: wp('5%'),
    elevation: 5


  },
  ViewContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  TextContainer: {
    fontSize: wp('5%'),
    fontWeight: 'bold'

  },
  AnswerContainer: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    color: '#120980'


  },


  bottonContainer: {
    height: wp('25%'),
    paddingBottom: wp('5%'),
    borderBottomLeftRadius: wp('3%'),
    borderBottomRightRadius: wp('3%'),
    backgroundColor: '#0B5A8A',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  button: {
    height: wp('20%'),
    width: wp('20%'),
    alignItems: 'center',
    // backgroundColor:'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp('2%')

  },

  bodyContainer: {
    marginHorizontal: wp('2%'),
    // backgroundColor:'red',
    marginBottom: wp('2%')

  },

  TextButton: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff'


  },
  cargarMasContainer: {
    backgroundColor: '#FFCD9F',
    zIndex: -1,
    height: wp('40%'),
    alignItems: 'center',
    justifyContent: 'flex-end'

  },
  FooterButton: {
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: wp('3%'),
    // backgroundColor:'#F2E9D0',
    //  paddingTop:7,
    //marginTop:'70%'

  },

  FooterTextButton: {
    fontSize: 20,
    fontWeight: 'bold'

  },
  Image: {
    height: 200,
    width: 200,
    margin: '10%'

  },

  ImageContainer: {

    backgroundColor: '#0B5A8A',
    alignItems: 'center',
    width: 250,
    height: 250,
    borderRadius: 50

  }


});