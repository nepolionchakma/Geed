import {ActivityIndicator, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../Components/Header';
import {colors} from '../Constants/Colors';
import {requestPermissions} from '../Utils/FilePermission';
import AudioModule from 'react-native-local-audio';
import {useAppDispatch, useAppSelector} from '../Redux/Hooks/Hooks';
import {setLocalSongs} from '../Redux/Slices/LocalSongs';
import {addTrack} from '../Services/PlaybackService';
import {RootState} from '../Redux/Store/Store';
import SongsCard from '../Components/SongsCard';
import Container from '../Components/Container';
import FloatingPlayer from '../Components/FloatingPlayer';

const LocalSongsLibrary = () => {
  const dispatch = useAppDispatch();
  const selectedCategoryData = useAppSelector(
    (state: RootState) => state.localSongs,
  );
  const [isLoading, setIsLoading] = useState(false);
  const isPlayingQueue = useAppSelector(
    (state: RootState) => state.tracks.isPlayingQueue,
  );
  // Ensure status bar is not transparent and looks good across devices
  // useEffect(() => {
  //   if (Platform.OS === 'ios') {
  //     StatusBar.setBarStyle('dark-content', true); // Dark status bar for iOS
  //   }
  //   StatusBar.setTranslucent(false); // Prevent translucency for all platforms
  //   StatusBar.setBackgroundColor(colors.background); // Set a background color
  // }, []);

  useEffect(() => {
    const fetchAudioFiles = async () => {
      setIsLoading(true);
      try {
        await requestPermissions();
        const songsOrError = await AudioModule.getAllAudio({
          sortBy: 'TITLE',
          orderBy: 'ASC',
          // limit: 20,
          // offset: 0,
          artworkQuality: 50,
        });
        // console.log(songsOrError, 'songsOrError');
        if (typeof songsOrError === 'string') {
          // console.log(songsOrError, 'songsOrError');
          return;
        } else {
          dispatch(setLocalSongs(songsOrError));
          addTrack(songsOrError);
        }
      } catch (error) {
        console.error('Error fetching audio files:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAudioFiles();
  }, [dispatch]);

  if (isLoading) {
    return (
      <Container
        isScrollView={false}
        style={styles.container}
        header={<Header />}>
        <ActivityIndicator
          size="large"
          color={colors.white}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        />
      </Container>
    );
  }
  return (
    <Container
      isRefresh={true}
      isScrollView={false}
      style={styles.container}
      header={<Header />}
      footer={isPlayingQueue && <FloatingPlayer />}>
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
    </Container>
  );
};

export default LocalSongsLibrary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.background,
    // paddingBottom: spacing.sm,
    // paddingTop: spacing.md, // Padding to avoid the status bar
  },
});
