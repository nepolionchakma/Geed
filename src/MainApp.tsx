import {Platform, StatusBar, StyleSheet, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {useEffect} from 'react';
import {addTrack, setupPlayer} from './Services/PlaybackService';
import {RecommendedSongs} from './Data/Songs';
import {setIsReady} from './Redux/Slices/SongSlice';
import Drawer from './Navigations/Drawer';
import {useAppDispatch} from './Redux/Hooks/Hooks';

const MainApp = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Setup and dispatch once on initial render
    const setup = async () => {
      try {
        let isSetup = await setupPlayer();
        if (isSetup) {
          await addTrack(RecommendedSongs);
          // Dispatch the setup status (isReady)
          dispatch(setIsReady(isSetup));
          console.log(isSetup, 'isSetup');
        }
      } catch (error) {
        console.error('Error during setup:', error);
      }
    };

    setup(); // Call setup on mount
  }, [dispatch]); // Empty dependency array ensures this runs once

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

export default MainApp;

const styles = StyleSheet.create({
  GestureHandlerRootViewContainer: {
    flex: 1,
  },
});
