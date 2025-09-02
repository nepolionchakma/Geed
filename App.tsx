import {Platform, StatusBar, StyleSheet, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Drawer from './src/Navigations/Drawer';
import {NavigationContainer} from '@react-navigation/native';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView style={styles.GestureHandlerRootViewContainer}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          translucent={Platform.OS === 'ios'}
        />
        <NavigationContainer>
          <Drawer />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  GestureHandlerRootViewContainer: {
    flex: 1,
  },
});
