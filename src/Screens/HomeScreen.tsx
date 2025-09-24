import {FlatList, StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colors} from '../Constants/Colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../Components/Header';
import {spacing} from '../Constants/dimensions';
import {SongsWithCategory} from '../Data/SongsWithCategory';
import TrackPlayer, {useActiveTrack} from 'react-native-track-player';

import {useAppDispatch, useAppSelector} from '../Redux/Hooks/Hooks';
import {
  setSelectedSongsCategory,
  setSelectedSongsViaCategory,
} from '../Redux/Slices/SelectedCategory';
import {RootState} from '../Redux/Store/Store';
import FloatingPlayer from '../Components/FloatingPlayer';
import CategoryTabs from '../Components/CategoryTabs';
import SongsCard from '../Components/SongsCard';
import {addTrack, setupPlayer} from '../Services/PlaybackService';

function HomeScreen() {
  const activeTrack = useActiveTrack();
  const [isPlayingQueue, setIsPlayingQueue] = useState(false);
  const dispatch = useAppDispatch();

  // Accessing the selected category from Redux state
  const selectedCategoryData = useAppSelector(
    (state: RootState) => state.selectedSongsCategory,
  );

  const handleCategoryClick = (category: string) => {
    dispatch(setSelectedSongsCategory(category));
  };

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

  useEffect(() => {
    const filteredSongs = SongsWithCategory.find(
      item => item.title === selectedCategoryData.selectedSongsCategory,
    );

    if (filteredSongs) {
      // console.log(filteredSongs.songs, 'filteredSongs.songs');
      dispatch(setSelectedSongsViaCategory(filteredSongs.songs));
      addTrack(filteredSongs.songs);
    } else {
      console.log('No matching category found');
    }
  }, [dispatch, selectedCategoryData]);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View>
        <FlatList
          keyExtractor={(item, index) => (item.id + index).toString()} // Use a unique identifier for the key
          data={SongsWithCategory}
          renderItem={params => (
            <CategoryTabs
              {...params}
              selectedCategory={selectedCategoryData.selectedSongsCategory}
              handleCategoryClick={handleCategoryClick}
            />
          )}
          contentContainerStyle={styles.contentContainerStyle}
          horizontal
        />
      </View>
      <SongsCard
        selectedSongsViaCategory={selectedCategoryData.selectedSongsViaCategory}
      />
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
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingBottom: spacing.sm,
  },
  contentContainerStyle: {
    height: 30,
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: spacing.md,
    overflow: 'hidden',
  },
});
