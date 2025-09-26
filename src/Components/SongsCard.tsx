import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {spacing} from '../Constants/dimensions';
import TrackPlayer from 'react-native-track-player';
import {SongType} from '../Types/SongsType';
// interface SongType {
//   selectedSongsViaCategory: SongType[];
// }
const SongsCard = ({selectedSongsViaCategory}: any) => {
  const handlePlayTrack = async (item: SongType) => {
    try {
      const songs = await TrackPlayer.getQueue();

      // Check if the song is already in the queue
      const trackIndex = songs.findIndex((song: any) => song.id === item.id);

      if (trackIndex !== -1) {
        // If the track is already in the queue, start playing it
        await TrackPlayer.skip(trackIndex); // This will skip directly to the track in the queue
        await TrackPlayer.play();
        return;
      }

      // Add the track to the queue
      await TrackPlayer.add(item);
      await TrackPlayer.play();
    } catch (error) {
      console.log('Error Playing Track:', error);
    }
  };

  return (
    <View style={{flex: 1, padding: spacing.md}}>
      <FlatList
        keyExtractor={(item, index) => `${item.id}-${item.title}-${index}`}
        data={selectedSongsViaCategory}
        renderItem={({item}) => {
          // console.log(`${item.artwork}`, 'artworkUri');
          return (
            <TouchableOpacity
              onPress={() => handlePlayTrack(item)}
              style={styles.songItem}>
              <Image
                source={
                  require('../Assets/logo1.jpg')
                  // { uri: `${item.artwork} `, }
                }
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              <View style={{justifyContent: 'center'}}>
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
  songItem: {
    flexDirection: 'row',
    gap: 10,
    padding: 10,
    backgroundColor: '#21223dff',
    borderRadius: 10,
    marginBottom: 5,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    // fontSize: 20,
    // fontWeight: 'bold',
    color: 'white',
  },
});
