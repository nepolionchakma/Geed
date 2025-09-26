import {StyleSheet, TouchableOpacity, useColorScheme} from 'react-native';
import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import SettingsScreen from '../Screens/SettingsScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AboutUsScreen from '../Screens/AboutUsScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import FAQsScreen from '../Screens/FAQsScreen';
import {DrawerParamList} from '../Types/NavigationTypes';
import LikedSongsScreen from '../Screens/LikedSongsScreen';
import {iconSizes} from '../Constants/dimensions';
import {colors} from '../Constants/Colors';
import {Text} from 'react-native-gesture-handler';
import RootStack from './RootStack';
import PlayingScreen from '../Screens/PlayingScreen';

const {Navigator, Screen} = createDrawerNavigator<DrawerParamList>();
const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const isDarkMode = useColorScheme() === 'dark';
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
  const isDarkMode = useColorScheme() === 'dark';
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
          backgroundColor: colors.background,
          // width: 240,
        },
        // drawerContentStyle: {backgroundColor: colors.background},
      }}>
      <Screen
        name="Home"
        component={RootStack}
        options={{
          drawerIcon: ({size}) => (
            <Icon
              name="home"
              size={size}
              color={isDarkMode ? 'white' : 'green'}
            />
          ),
          drawerLabel: () => (
            <Text style={{color: isDarkMode ? 'white' : 'green'}}>Home</Text>
          ),
          // sceneStyle: {backgroundColor: isDarkMode ? 'black' : 'white'},
        }}
      />
      <Screen
        name="PlayingScreen"
        component={PlayingScreen}
        options={{
          drawerIcon: ({size}) => (
            <Icon
              name="music-note"
              size={size}
              color={isDarkMode ? 'white' : 'green'}
            />
          ),
          drawerLabel: () => (
            <Text style={{color: isDarkMode ? 'white' : 'green'}}>
              Playing Now
            </Text>
          ),
          // sceneStyle: {backgroundColor: isDarkMode ? 'black' : 'white'},
        }}
      />
      <Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({size}) => (
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
          drawerIcon: ({size}) => (
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
          drawerIcon: ({size}) => (
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
          drawerIcon: ({size}) => (
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
          drawerIcon: ({size}) => (
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
