import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
/*Home */
import home from '../screens/home';
import HomeHeader from '../component/HeaderComponets/HomeHeader';

/*Gestación */
import gestación from '../screens/Gestacion/gestación';
import GestaciónSearch from '../component/HeaderComponets/InfoGestaciónHeader';
import BuscarGestación from '../screens/Gestacion/BuscarGestación';
import infoGestación from '../screens/Gestacion/InfoGestación';
import GestacionHeader from '../component/HeaderComponets/GestacionHeader';
import NotificationView from '../screens/Gestacion/NotificationView';
import UpdateGestación from '../screens/Gestacion/updateGestación';

/*Verraco */
import Varraco from '../screens/Varraco/verraco';
import BuscarVarraco from '../screens/Varraco/BuscarVarraco';
import infoVarraco from '../screens/Varraco/InfoVarraco';
import VarracoSearch from '../component/HeaderComponets/VarracoSearch';

/*Engordar */
import Engordar from '../screens/Engordar/engordar';
import infoEngordar from '../screens/Engordar/InfoEngordar';

/*Destete */
import Destete from '../screens/Destete/destete';
import infoDestete from '../screens/Destete/InfoDestete';
import BuscarDestete from '../screens/Destete/BuscarDestete';
import DesteteSearch from '../component/HeaderComponets/DesteteSearch';

/*Vacunación */
import Vacunación from '../screens/Vacunacion/vacunación';
import infoVacunación from '../screens/Vacunacion/InfoVacunación';
import { config } from 'rxjs';






const Stack = createStackNavigator();

export default function Navigation() {


  const config = {
    animation: 'spring',
    config: {
      stiffness: 1600000,
      damping: 80000,
      mass: 3,
      overshootClamping: false,
      restDisplacementThreshold: 0.001,
      restSpeedThreshold: 0.001,
    },
  };

  return (


    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        gestureDirection: 'horizontal',
        transitionSpec: {
          open: config,
          close: config
        },

        headerMode: 'screen',
        // headerTintColor:'red',
        headerStyle: { backgroundColor: 'tomato' },

      }}
      headerMode='screen'
      animation='fade'
    >

      <Stack.Screen name='home' component={home}
        options={({ navigation }) => ({
          headerMode:'none',
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'transparent',
            height:wp('5%')



          },

          headerTitle: () => < HomeHeader navigation={navigation} />,
          headerTintColor: '#fff',
          /*    headerTitleStyle:{
               fontSize:30,
               fontWeight:'bold',
               textAlign:'center',
               marginRight:40
              
             },*/

        })} />


      <Stack.Screen name='gestación' component={gestación}

        options={({ navigation }) => ({

          headerStyle: {
            backgroundColor: '#0B5A8A',
            height: 70,

          },
          headerTitle: () => <GestacionHeader navigation={navigation} />,
          headerTintColor: '#fff',
          /*    headerTitleStyle:{
            fontSize:30,
            fontWeight:'bold',
            textAlign:'center',
            marginRight:40
            
          },*/

        })} />


      <Stack.Screen name='UpdateGestación' component={UpdateGestación}

        options={({ navigation }) => ({
          title:'Actualizar Gestación',
          headerStyle: {
            backgroundColor: '#0B5A8A',
            height: 60,

          },
           headerTintColor: '#fff',
              headerTitleStyle:{
            fontSize:wp('5.5%'),
            fontWeight:'bold',
            textAlign:'center',
            marginRight:40
            
          },

        })} />
      <Stack.Screen name='infoGestación'
        component={infoGestación}

        options={({ navigation }) => ({

          headerStyle: {
            backgroundColor: '#0B5A8A',
            height: 70,

          },
          headerTitle: () => <GestaciónSearch navigation={navigation} />,
          headerTintColor: '#fff',
          /*    headerTitleStyle:{
            fontSize:30,
            fontWeight:'bold',
            textAlign:'center',
            marginRight:40
            
          },*/

        })} />

      <Stack.Screen name='Notification'
        component={NotificationView}

        options={{
          title: 'Notificaciónes',
          headerStyle: {
            backgroundColor: '#0B5A8A',
            height: 70
          },

          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 30,
            fontWeight: 'bold',
            textAlign: 'center',
            marginRight: 45
          }
        }}
      />



      <Stack.Screen name='varraco'
        component={Varraco}

        options={{
          title: 'Verraco',
          headerStyle: {
            backgroundColor: '#460819',
            height: 70
          },

          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 30,
            fontWeight: 'bold',
            textAlign: 'center',
            marginRight: 45
          }
        }} />


      <Stack.Screen name='infoVarraco' component={infoVarraco}

        options={({ navigation }) => ({

          headerStyle: {
            backgroundColor: '#812B1C',
            height: 70,

          },
          headerTitle: () => <VarracoSearch navigation={navigation} />,
          headerTintColor: '#fff',
          /*    headerTitleStyle:{
            fontSize:30,
            fontWeight:'bold',
            textAlign:'center',
            marginRight:40
            
          },*/

        })}

      />


      <Stack.Screen name='engordar'
        component={Engordar}

        options={{
          title: 'Engordar',
          headerStyle: {
            backgroundColor: '#0B738C',
            height: 70
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 30,
            fontWeight: 'bold',
            textAlign: 'center',
            marginRight: 70

          }

        }} />

      <Stack.Screen name='infoEngordar'
        component={infoEngordar}
        options={{
          title: 'Engordar',
          headerStyle: {
            backgroundColor: '#001F77',
            height: 70
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 30,
            fontWeight: 'bold',
            textAlign: 'center',
            marginRight: 70

          }

        }}
      />

      <Stack.Screen name='destete' component={Destete}

        options={{
          title: 'Destete',
          headerStyle: {
            backgroundColor: '#036082',
            height: 70
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 30,
            fontWeight: 'bold',
            textAlign: 'center',
            marginRight: 50

          }

        }}

      />


      <Stack.Screen name='infoDestete' component={infoDestete}

        options={({ navigation }) => ({

          headerStyle: {
            backgroundColor: '#CA4C08',
            height: 70,

          },
          headerTitle: () => <DesteteSearch navigation={navigation} />,
          headerTintColor: '#fff',
          /*    headerTitleStyle:{
               fontSize:30,
               fontWeight:'bold',
               textAlign:'center',
               marginRight:40
              
             },*/

        })}


      />
      <Stack.Screen name='vacunación' component={Vacunación}

        options={{
          title: 'Vacunación',
          headerStyle: {
            backgroundColor: '#0E70A4',
            height: 70
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 30,
            fontWeight: 'bold',
            textAlign: 'center',
            marginRight: 50

          }

        }}

      />

      <Stack.Screen name='InfoVacunación' component={infoVacunación}

        options={{
          title: 'Vacunación',
          headerStyle: {
            backgroundColor: '#0E70A4',
            height: 70
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 30,
            fontWeight: 'bold',
            //  textAlign:'center',
            // marginRight:50

          }

        }}

      />

      <Stack.Screen name='BuscarDestete' component={BuscarDestete}
        options={{
          title: '',

          headerTransparent: true,
          headerStyle: {
            backgroundColor: '#036082',
            height: 80,

          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            // fontSize:30,
            fontWeight: 'bold',
            // textAlign:'center',
            marginRight: 500


          }

        }} />

      <Stack.Screen name='BuscarVarraco' component={BuscarVarraco}
        options={{
          title: '',

          headerTransparent: true,
          headerStyle: {
            backgroundColor: '#812B1C',
            height: 80,

          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            // fontSize:30,
            fontWeight: 'bold',
            // textAlign:'center',
            marginRight: 500


          }

        }} />

      <Stack.Screen name='BuscarGestación' component={BuscarGestación}

        options={{
          title: '',

          headerTransparent: true,
          headerStyle: {
            backgroundColor: '#0B5A8A',
            height: 80,

          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            // fontSize:30,
            fontWeight: 'bold',
            // textAlign:'center',
            marginRight: 500


          }

        }} />



    </Stack.Navigator>





  );
}


