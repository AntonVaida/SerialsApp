import React from "react"
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { FilmList } from '../../src/screens/FilmList';
import { DetailFilmInform } from '../../src/screens/DetailFilmInform';

const Stack = createNativeStackNavigator();

export const AppNavigation = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='FilmList' component={FilmList}/>
        <Stack.Screen name='DetailFilmInform' component={DetailFilmInform}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}