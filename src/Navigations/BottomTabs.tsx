import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../Constants/Colors';
import LocalSongsLibrary from '../Screens/LocalSongsLibrary';

const {Navigator, Screen} = createBottomTabNavigator();
const BottomTabs = () => {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: colors.bottomTab, // You can customize this if needed
          borderTopWidth: 0, // To hide the border at the top of the tab bar
        },
        tabBarLabelStyle: {display: 'none'}, // Hide the label if you don't want to show text
      }}>
      <Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <Icon name="home" size={26} color={focused ? color : 'white'} />
          ),
        }}
      />
      {/* <Screen
        name="Search"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <Icon name={'search'} size={26} color={focused ? color : 'white'} />
          ),
        }}
      /> */}
      <Screen
        name="Library"
        component={LocalSongsLibrary}
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <Icon
              name={focused ? 'folder-open' : 'folder'}
              size={26}
              color={focused ? color : 'white'}
            />
          ),
        }}
      />
    </Navigator>
  );
};

export default BottomTabs;
