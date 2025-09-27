import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React from 'react';
import {spacing} from '../Constants/dimensions';
import TrackPlayer from 'react-native-track-player';
import {SongType} from '../Types/SongsType';
import {colors} from '../Constants/Colors';
import {setIsPlayingQueue} from '../Redux/Slices/SongSlice';
import {useAppDispatch} from '../Redux/Hooks/Hooks';
import {addTrack} from '../Services/PlaybackService';
// interface SongType {
//   selectedSongsViaCategory: SongType[];
// }
const SongsCard = ({selectedSongsViaCategory}: any) => {
  const isDark = useColorScheme() === 'dark';
  const dispatch = useAppDispatch();
  const handlePlayTrack = async (item: SongType) => {
    try {
      await TrackPlayer.reset();
      await addTrack(selectedSongsViaCategory);
      const queueSongs = await TrackPlayer.getQueue();

      // Check if the song is already in the queue
      const trackIndex = queueSongs.findIndex(
        (song: any) => song.id === item.id,
      );

      if (trackIndex !== -1) {
        // If the track is already in the queue, start playing it
        await TrackPlayer.skip(trackIndex); // This will skip directly to the track in the queue
        await TrackPlayer.play();
        dispatch(setIsPlayingQueue(true));
        return;
      }

      // Add the track to the queue
      await TrackPlayer.add(item);
      await TrackPlayer.play();
      dispatch(setIsPlayingQueue(true));
    } catch (error) {
      console.log('Error Playing Track:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item, index) => `${item.id}-${item.title}-${index}`}
        data={selectedSongsViaCategory}
        renderItem={({item}) => {
          // console.log(`${item.artwork}`, 'artworkUri');
          return (
            <TouchableOpacity
              onPress={() => handlePlayTrack(item)}
              style={[
                styles.songItem,
                {
                  backgroundColor: isDark
                    ? colors.bottomTab
                    : colors.floatingBG,
                },
              ]}>
              <Image
                source={
                  require('../Assets/logo1.jpg')
                  // { uri: `${item.artwork} `, }
                }
                style={styles.image}
              />
              <View style={styles.textContainer}>
                <Text style={styles.text}>{item.title}</Text>
                <View>
                  <Text style={styles.text}>{item.artist}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default SongsCard;

const styles = StyleSheet.create({
  container: {flex: 1, padding: spacing.md},
  songItem: {
    flexDirection: 'row',
    gap: 10,
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {justifyContent: 'center'},
  text: {
    // fontSize: 20,
    // fontWeight: 'bold',
    color: 'white',
  },
  image: {
    width: 30,
    height: 30,
  },
});
