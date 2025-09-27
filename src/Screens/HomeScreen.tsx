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
import axios from 'axios';
import {SongsWithCategoryType, SongType} from '../Types/SongsType';

function HomeScreen() {
  const dispatch = useAppDispatch();
  const playBackState: PlaybackState | {state: undefined} = usePlaybackState();
  const stateSong = 'state' in playBackState ? playBackState.state : undefined;
  const [isLoading, setIsLoading] = useState(false);
  const [onlineDataCategories, setOnlineDataCategories] = useState<
    SongsWithCategoryType[] | null
  >(null);
  const [selectedCategoryName, setSelectedCategoryName] =
    useState('Recommended Songs');
  const [selectedCategorySongsURL, setSelectedCategorySongsURL] = useState<
    string | null
  >(null);
  const [selectedCategorySongs, setSelectedCategorySongs] = useState<
    SongType[] | null
  >(null);

  // Accessing the selected category from Redux state
  const selectedCategoryData = useAppSelector(
    (state: RootState) => state.selectedSongsCategory,
  );
  const isPlayingQueue = useAppSelector(
    (state: RootState) => state.tracks.isPlayingQueue,
  );
  const handleCategoryClick = (category: string) => {
    setSelectedCategoryName(category);
    console.log(category, 'category');
    // dispatch(setSelectedSongsCategory(category));
  };

  useEffect(() => {
    (async () => {
      try {
        const fetchingURL =
          'https://raw.githubusercontent.com/nepolionchakma/Geed/main/src/Data/categories.json';
        const onlineData = await axios.get(fetchingURL);
        setOnlineDataCategories(onlineData.data);
      } catch (error) {
        console.log(error, 'error');
      }
    })();
  }, []);

  useEffect(() => {
    (() => {
      switch (selectedCategoryName) {
        case 'Recommended Songs':
          return setSelectedCategorySongsURL(
            'https://raw.githubusercontent.com/nepolionchakma/Geed/main/src/Data/all.json',
          );
        case 'Chakma':
          return setSelectedCategorySongsURL(
            'https://raw.githubusercontent.com/nepolionchakma/Geed/main/src/Data/chakma.json',
          );
        case 'Marma':
          return setSelectedCategorySongsURL(
            'https://raw.githubusercontent.com/nepolionchakma/Geed/main/src/Data/marma.json',
          );

        default:
          return setSelectedCategorySongsURL(
            'https://raw.githubusercontent.com/nepolionchakma/Geed/main/src/Data/all.json',
          );
      }
    })();
  }, [selectedCategoryName]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        if (!selectedCategorySongsURL) {
          return;
        }
        const onlineData = await axios.get(selectedCategorySongsURL);
        setSelectedCategorySongs(onlineData.data);
      } catch (error) {
        console.log(error, 'error');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [selectedCategorySongsURL, selectedCategoryName]);

  useEffect(() => {
    if (
      !onlineDataCategories ||
      !selectedCategorySongs ||
      !selectedCategorySongsURL
    ) {
      return;
    }

    if (selectedCategorySongs) {
      // console.log(filteredSongs.songs, 'filteredSongs.songs');
      dispatch(setSelectedSongsViaCategory(selectedCategorySongs));
      addTrack(selectedCategorySongs);
    } else {
      console.log('No matching category found');
    }
  }, [
    dispatch,
    onlineDataCategories,
    selectedCategorySongs,
    selectedCategorySongsURL,
  ]);
  console.log(stateSong, 'stateSong--------');
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
          data={onlineDataCategories}
          renderItem={params => (
            <CategoryTabs
              {...params}
              selectedCategory={selectedCategoryName}
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
