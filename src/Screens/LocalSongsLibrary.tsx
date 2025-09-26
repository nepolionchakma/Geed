import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../Components/Header';
import {colors} from '../Constants/Colors';
import {spacing} from '../Constants/dimensions';
import {requestPermissions} from '../Utils/FilePermission';
import AudioModule from 'react-native-local-audio';
import {useAppDispatch, useAppSelector} from '../Redux/Hooks/Hooks';
import {setLocalSongs} from '../Redux/Slices/LocalSongs';
import {addTrack, setupPlayer} from '../Services/PlaybackService';
import {RootState} from '../Redux/Store/Store';
import SongsCard from '../Components/SongsCard';
import FloatingPlayer from '../Components/FloatingPlayer';
import TrackPlayer, {useActiveTrack} from 'react-native-track-player';

const LocalSongsLibrary = () => {
  const dispatch = useAppDispatch();
  const [isPlayingQueue, setIsPlayingQueue] = useState(false);
  const activeTrack = useActiveTrack();
  const selectedCategoryData = useAppSelector(
    (state: RootState) => state.localSongs,
  );
  // Ensure status bar is not transparent and looks good across devices
  useEffect(() => {
    if (Platform.OS === 'ios') {
      StatusBar.setBarStyle('dark-content', true); // Dark status bar for iOS
    }
    StatusBar.setTranslucent(false); // Prevent translucency for all platforms
    StatusBar.setBackgroundColor(colors.background); // Set a background color
  }, []);

  // Check the queue for active tracks
  useEffect(() => {
    const checkActiveTrack = async () => {
      try {
        // Ensure player setup completes first
        await setupPlayer();

        // Now that player is set up, get the queue and check active track
        const songs = await TrackPlayer.getQueue();
        if (activeTrack && songs.length > 0 && activeTrack.id !== songs[0].id) {
          setIsPlayingQueue(true);
        } else {
          setIsPlayingQueue(false);
        }
      } catch (error) {
        console.error('Error in setupPlayer or TrackPlayer:', error);
      }
    };

    checkActiveTrack();
  }, [activeTrack]);

  // Request permissions and fetch audio files
  useEffect(() => {
    const fetchAudioFiles = async () => {
      try {
        await requestPermissions();
        const songsOrError = await AudioModule.getAllAudio({
          sortBy: 'TITLE',
          orderBy: 'ASC',
          // limit: 20,
          // offset: 0,
          artworkQuality: 50,
        });
        console.log(songsOrError, 'songsOrError');
        if (typeof songsOrError === 'string') {
          console.log(songsOrError, 'songsOrError');
          return;
        } else {
          dispatch(setLocalSongs(songsOrError));
          addTrack(songsOrError);
        }
      } catch (error) {
        console.error('Error fetching audio files:', error);
      }
    };

    fetchAudioFiles();
  }, [dispatch]);
  return (
    <View style={styles.container}>
      <Header />
      {/* <FlatList
        keyExtractor={(item, index) => `${item.id}-${item.title}-${index}`} // Combining id and title
        data={selectedCategoryData.localSongs}
        renderItem={({item}) => (
          <SongsCard
            selectedSongsViaCategory={
              selectedCategoryData.localSongs
            }
          />
        )}
      /> */}
      <SongsCard selectedSongsViaCategory={selectedCategoryData.localSongs} />
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          marginBottom: 70,
        }}>
        {isPlayingQueue && <FloatingPlayer />}
      </View>
    </View>
  );
};

export default LocalSongsLibrary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingBottom: spacing.sm,
    paddingTop: spacing.md, // Padding to avoid the status bar
  },
});
