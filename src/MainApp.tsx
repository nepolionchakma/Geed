import {
  ActivityIndicator,
  Platform,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {useEffect, useState} from 'react';
import {setupPlayer} from './Services/PlaybackService';
import {RecommendedSongs} from './Data/Songs';
import {setIsReady, setSong, resetSong} from './Redux/Slices/SongSlice';
import Drawer from './Navigations/Drawer';
import {useAppDispatch} from './Redux/Hooks/Hooks';
import TrackPlayer from 'react-native-track-player';
// import {colors} from './Constants/Colors';

const MainApp = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useAppDispatch();
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  useEffect(() => {
    const setup = async () => {
      try {
        const isSetup = await setupPlayer();
        // console.log(isSetup, 'isSetup');
        if (isSetup) {
          setIsPlayerReady(isSetup);
          // await addTrack(RecommendedSongs);
          dispatch(setSong(RecommendedSongs));
          dispatch(setIsReady(isSetup));
          // console.log('TrackPlayer is ready:', isSetup);
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

  if (!isPlayerReady) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <GestureHandlerRootView style={styles.GestureHandlerRootViewContainer}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <StatusBar
          barStyle={'light-content'}
          // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          translucent={Platform.OS === 'ios'}
        />
        <NavigationContainer>{isPlayerReady && <Drawer />}</NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default MainApp;

const styles = StyleSheet.create({
  GestureHandlerRootViewContainer: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
