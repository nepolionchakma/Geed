import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import SettingsScreen from '../Screens/SettingsScreen';
import RootStack from './RootStack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AboutUsScreen from '../Screens/AboutUsScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import FAQsScreen from '../Screens/FAQsScreen';
import {DrawerParamList} from '../Types/NavigationTypes';
import LikedSongsScreen from '../Screens/LikedSongsScreen';
import {iconSizes} from '../Constants/dimensions';
import {colors} from '../Constants/Colors';
import {Text} from 'react-native-gesture-handler';

const {Navigator, Screen} = createDrawerNavigator<DrawerParamList>();
const isDarkMode = true;
const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...props}>
      <TouchableOpacity onPress={() => {}} style={styles.mode}>
        <Icon
          name={isDarkMode ? 'dark-mode' : 'light-mode'}
          size={iconSizes.lg}
          color={isDarkMode ? 'white' : 'green'}
        />
      </TouchableOpacity>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};
const Drawer = () => {
  return (
    <Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        lazy: true,
        swipeEdgeWidth: 0,
        // drawerStyle: styles.drawer,
        drawerActiveTintColor: isDarkMode ? 'white' : 'green',
        drawerInactiveTintColor: 'black',
        drawerType: 'slide',
        drawerStyle: {
          backgroundColor: isDarkMode ? colors.background : '#fff',
          // width: 240,
        },
      }}>
      <Screen
        name="Home"
        component={RootStack}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon
              name="home"
              size={size}
              color={isDarkMode ? 'white' : 'green'}
            />
          ),
          drawerLabel: ({color}) => (
            <Text style={{color: isDarkMode ? 'white' : 'green'}}>Home</Text>
          ),
        }}
      />
      <Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon
              name="person"
              size={size}
              color={isDarkMode ? 'white' : 'green'}
            />
          ),
          drawerLabel: () => (
            <Text style={{color: isDarkMode ? 'white' : 'green'}}>Profile</Text>
          ),
        }}
      />
      <Screen
        name="Liked_Songs"
        component={LikedSongsScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon
              name="favorite"
              size={size}
              color={isDarkMode ? 'white' : 'green'}
            />
          ),
          drawerLabel: () => (
            <Text style={{color: isDarkMode ? 'white' : 'green'}}>
              Liked Songs
            </Text>
          ),
        }}
      />
      <Screen
        name="FAQs"
        component={FAQsScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon
              name="help"
              size={size}
              color={isDarkMode ? 'white' : 'green'}
            />
          ),
          drawerLabel: () => (
            <Text style={{color: isDarkMode ? 'white' : 'green'}}>FAQs</Text>
          ),
        }}
      />
      <Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon
              name="settings"
              size={size}
              color={isDarkMode ? 'white' : 'green'}
            />
          ),
          drawerLabel: () => (
            <Text style={{color: isDarkMode ? 'white' : 'green'}}>
              Settings
            </Text>
          ),
        }}
      />
      <Screen
        name="About_Us"
        component={AboutUsScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon
              name="info"
              size={size}
              color={isDarkMode ? 'white' : 'green'}
            />
          ),
          drawerLabel: () => (
            <Text style={{color: isDarkMode ? 'white' : 'green'}}>
              About Us
            </Text>
          ),
        }}
      />
    </Navigator>
  );
};

export default Drawer;
const styles = StyleSheet.create({
  drawer: {
    flex: 1,
  },
  mode: {
    // backgroundColor: colors.primary,
    padding: 10,
    marginLeft: 10,
    paddingVertical: 20,
  },
});
