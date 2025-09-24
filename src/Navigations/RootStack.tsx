// import { StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import PlayingScreen from '../Screens/PlayingScreen';
import BottomTabs from './BottomTabs';
const {Navigator, Screen} = createNativeStackNavigator();
const RootStack = () => {
  return (
    <Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      <Screen name="HomeScreen" component={BottomTabs} />
      <Screen name="PlayingScreen" component={PlayingScreen} />
    </Navigator>
  );
};

export default RootStack;

// const styles = StyleSheet.create({});
