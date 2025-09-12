import {FlatList, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colors} from '../Constants/Colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../Components/Header';
// import {fontFamilies} from '../Constants/Fonts';
import {spacing} from '../Constants/dimensions';
import CardWithCategory from '../Components/CardWithCategory';
import FloatingPlayer from '../Components/FloatingPlayer';
import {SongsWithCategory} from '../Data/SongsWithCategory';
import TrackPlayer, {useActiveTrack} from 'react-native-track-player';

import AudioModule from 'react-native-local-audio';
import {requestPermissions} from '../Utils/FilePermission';

function HomeScreen() {
  // Get the current active track from TrackPlayer
  const activeTrack = useActiveTrack();

  // Define a state to manage whether the floating player should show
  const [isPlayingQueue, setIsPlayingQueue] = useState(false);
  useEffect(() => {
    (async () => {
      const songs = await TrackPlayer.getQueue();
      console.log(songs, activeTrack, 'activeTrack--');
      if (activeTrack && songs.length > 0) {
        setIsPlayingQueue(true);
      }
      // if(songs.length > 0) {
      // }
    })();
  }, [activeTrack]);

  useEffect(() => {
    (async () => {
      await requestPermissions();
      const songsOrError = await AudioModule.getAllAudio({
        sortBy: 'TITLE',
        orderBy: 'ASC',
        limit: 20,
        offset: 0,
        coverQuality: 50,
      });
      console.log(songsOrError, 'songsOrError');
      // error
      if (typeof songsOrError === 'string') {
        // do something with the error
        console.log(songsOrError, 'songsOrError');
        return;
      }
    })();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Header />

      {/* Render the list of songs */}
      <FlatList
        keyExtractor={(item, index) => (item.id + index).toString()}
        data={SongsWithCategory}
        renderItem={CardWithCategory}
        contentContainerStyle={{gap: 22, paddingBottom: spacing.sm}}
        showsVerticalScrollIndicator={false}
      />

      {/* Conditionally render FloatingPlayer if there is an active track */}
      {isPlayingQueue && <FloatingPlayer />}
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingBottom: spacing.sm, // Add padding at the bottom to prevent overlap
  },
  // floatingPlayerContainer: {
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   paddingHorizontal: spacing.sm,
  //   paddingVertical: spacing.sm,
  //   backgroundColor: colors.background, // Optional: Background color for the floating player
  //   borderTopLeftRadius: 10,
  //   borderTopRightRadius: 10,
  //   shadowColor: '#000',
  //   shadowOffset: {width: 0, height: -2},
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5, // Add some shadow/elevation for better floating effect on Android
  // },
});
