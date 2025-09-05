import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../Constants/Colors';
import {fontSizes, spacing} from '../Constants/dimensions';
import TrackPlayer from 'react-native-track-player';

const Card = ({item}: any) => {
  console.log('Card Item:', item);

  // Function to handle track play when the card is pressed
  const handlePlayTrack = async () => {
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
    <TouchableOpacity style={styles.container} onPress={handlePlayTrack}>
      <Image source={{uri: item?.artwork}} style={styles.coverImage} />
      <View>
        <Text style={styles.textTitle} numberOfLines={1}>
          {item?.title}
        </Text>
        <Text style={styles.textArtist} numberOfLines={1}>
          {item?.artist}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: 170,
    alignItems: 'center',
  },
  coverImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  textTitle: {
    color: colors.textPrimary,
    fontSize: fontSizes.md,
    paddingVertical: spacing.xs,
  },
  textArtist: {
    color: colors.textSecondary,
    fontSize: fontSizes.sm,
  },
});
