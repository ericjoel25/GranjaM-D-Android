import React from "react";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {View} from 'react-native';
import Navigation from './navigation';


export default function After(){
    return(
       
            <NavigationContainer>  
                 <Navigation/>
            </NavigationContainer>       
    )

}