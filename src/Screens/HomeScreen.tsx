import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../Components/Header';
import {spacing} from '../Constants/dimensions';
import {SongsWithCategory} from '../Data/SongsWithCategory';

import {useAppDispatch, useAppSelector} from '../Redux/Hooks/Hooks';
import {
  setSelectedSongsCategory,
  setSelectedSongsViaCategory,
} from '../Redux/Slices/SelectedCategory';
import {RootState} from '../Redux/Store/Store';
import CategoryTabs from '../Components/CategoryTabs';
import SongsCard from '../Components/SongsCard';
import {addTrack} from '../Services/PlaybackService';
import Container from '../Components/Container';
import FloatingPlayer from '../Components/FloatingPlayer';
import {PlaybackState, usePlaybackState} from 'react-native-track-player';
import {colors} from '../Constants/Colors';

function HomeScreen() {
  const dispatch = useAppDispatch();
  const playBackState: PlaybackState | {state: undefined} = usePlaybackState();
  const stateSong = 'state' in playBackState ? playBackState.state : undefined;
  const [isLoading, setIsLoading] = useState(false);

  // Accessing the selected category from Redux state
  const selectedCategoryData = useAppSelector(
    (state: RootState) => state.selectedSongsCategory,
  );
  const isPlayingQueue = useAppSelector(
    (state: RootState) => state.tracks.isPlayingQueue,
  );
  const handleCategoryClick = (category: string) => {
    dispatch(setSelectedSongsCategory(category));
  };

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

  // Whenever state changes
  useEffect(() => {
    if (stateSong === 'loading') {
      setIsLoading(true);
    } else if (stateSong === 'ready') {
      setIsLoading(false);
    }
  }, [stateSong]);

  return (
    <Container
      isRefresh={true}
      isScrollView={false}
      style={styles.container}
      header={<Header />}
      footer={isPlayingQueue && <FloatingPlayer />}>
      <View>
        {/* Top Categories Tabs Component */}
        <FlatList
          keyExtractor={(item, index) => (item.id + index).toString()} // Use a unique identifier for the key
          showsHorizontalScrollIndicator={false}
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
      {/* Songs List Component */}
      <SongsCard
        selectedSongsViaCategory={selectedCategoryData.selectedSongsViaCategory}
      />
      {isLoading && (
        <ActivityIndicator
          size="large"
          color={colors.white}
          style={styles.loadingIndicator}
        />
      )}
    </Container>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.background,
    // paddingBottom: spacing.sm,
  },
  contentContainerStyle: {
    height: 30,
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: spacing.md,
    overflow: 'hidden',
    marginTop: spacing.xs,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    zIndex: 1,
  },
});
