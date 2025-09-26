// import { StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import {colors} from '../Constants/Colors';
const {Navigator, Screen} = createNativeStackNavigator();
const RootStack = () => {
  // const isDarkMode = false;
  return (
    <Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}>
      <Screen
        name="HomeScreen"
        component={BottomTabs}
        // options={{
        //   contentStyle: {
        //     backgroundColor: isDarkMode ? colors.background : colors.white,
        //   },
        // }}
      />
    </Navigator>
  );
};

export default RootStack;

// const styles = StyleSheet.create({});
