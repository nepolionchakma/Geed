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
import {setIsReady, setSong, resetSong} from './Redux/Slices/SongSlice';
import Drawer from './Navigations/Drawer';
import {useAppDispatch} from './Redux/Hooks/Hooks';
import TrackPlayer from 'react-native-track-player';

const MainApp = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useAppDispatch();

  useEffect(() => {
    const setup = async () => {
      try {
        const isSetup = await setupPlayer();
        console.log(isSetup, 'isSetup');
        if (isSetup) {
          // await addTrack(RecommendedSongs);
          dispatch(setSong(RecommendedSongs));
          dispatch(setIsReady(isSetup));
          console.log('TrackPlayer is ready:', isSetup);
        }
      } catch (error) {
        console.error('Error during setup:', error);
      }
    };

    setup(); // Call setup once

    return () => {
      dispatch(resetSong()); // Reset song state when unmounted
      TrackPlayer.stop();
      TrackPlayer.reset();
    };
  }, [dispatch]); // Only run once when component mounts

  return (
    <GestureHandlerRootView style={styles.GestureHandlerRootViewContainer}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <StatusBar
          barStyle={isDarkMode ? 'dark-content' : 'light-content'}
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
