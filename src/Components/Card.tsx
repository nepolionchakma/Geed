import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { colors } from '../Constants/Colors';
import { fontSizes, spacing } from '../Constants/dimensions';
import { SongType } from '../Types/SongsType';
interface CardProps {
  containerStyle?: any;
  imageStyle?: any;
  songs: SongType[];
}
const Card = ({ containerStyle, imageStyle, songs }: CardProps) => {
  return (
    <>
      {songs &&
        songs.map((item, index) => (
          <TouchableOpacity
            style={[styles.container, containerStyle]}
            key={index}
          >
            <Image
              source={{ uri: item.image }}
              style={[styles.coverImage, imageStyle]}
            />
            <View>
              <Text style={styles.textTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.textArtist} numberOfLines={1}>
                {item.artist}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
    </>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    // height: 270,
    width: 220,
    alignItems: 'center',
  },
  coverImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  textTitle: {
    color: colors.textPrimary,
    // textAlign: 'center',
    fontSize: fontSizes.md,
    paddingVertical: spacing.xs,
  },
  textArtist: {
    color: colors.textSecondary,
    // textAlign: 'center',
    fontSize: fontSizes.sm,
  },
});
