import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../Constants/Colors';
import { fontSizes, iconSizes, spacing } from '../Constants/dimensions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { Slider } from 'react-native-awesome-slider';
import { useSharedValue } from 'react-native-reanimated';
import {
  NextButton,
  PlayPauseButton,
  PreviousButton,
} from '../Components/PlayerColtroller';

const PlayingScreen = () => {
  const isLiked = true;
  const progress = useSharedValue(30);
  const min = useSharedValue(0);
  const max = useSharedValue(100);

  // const playBackState = usePlaybackState();
  const navigation = useNavigation();
  const imageUrl =
    'https://www.shutterstock.com/image-vector/retro-futuristic-background-1980s-style-600nw-487600702.jpg';
  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerIcons}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon
            name="chevron-left"
            size={iconSizes.lg}
            color={colors.iconPrimary}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Playing Now</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.coverImageContainer}>
          <Image source={{ uri: imageUrl }} style={[styles.coverImage]} />
        </View>
        <View style={styles.contentMiddle}>
          <View style={styles.contentText}>
            <Text style={styles.textTitle} numberOfLines={1}>
              Monster go home
            </Text>
            <Text style={styles.textArtist} numberOfLines={1}>
              Alan Wright
            </Text>
          </View>
        </View>
        <View style={{ gap: spacing.xl }}>
          <View style={styles.contentSound}>
            <View style={styles.contentMode}>
              <TouchableOpacity activeOpacity={0.5}>
                <Icon
                  name={isLiked ? 'volume-up' : 'volume-off'}
                  size={iconSizes.lg}
                  color={colors.iconPrimary}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5}>
                <Icon
                  name={isLiked ? 'favorite' : 'favorite-border'}
                  size={iconSizes.lg}
                  color={colors.iconPrimary}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.contentMode}>
              <TouchableOpacity activeOpacity={0.5}>
                <Icon
                  name={'repeat'}
                  size={iconSizes.lg}
                  color={colors.iconPrimary}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5}>
                <Icon
                  name={'shuffle'}
                  size={iconSizes.lg}
                  color={colors.iconPrimary}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contentTime}>
            <Text style={styles.textTime}>0:00</Text>
            <Text style={styles.textTime}>0:00</Text>
          </View>
          <View style={styles.contentSlider}>
            <Slider
              style={styles.slider}
              progress={progress}
              minimumValue={min}
              maximumValue={max}
              theme={{
                minimumTrackTintColor: colors.minimumTrackTintColor,
                maximumTrackTintColor: colors.maximumTrackTintColor,
              }}
            />
          </View>
          <View style={styles.actionContainer}>
            <PreviousButton
              size={spacing.xl}
              onPress={() => {}}
              name="skip-previous"
            />
            <PlayPauseButton
              size={spacing.xl}
              onPress={() => {}}
              name={'play'}
            />
            <NextButton size={spacing.xl} onPress={() => {}} name="skip-next" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PlayingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingVertical: spacing.sm,
  },
  headerIcons: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
  },
  backButton: { position: 'absolute', left: 10, zIndex: 1 },
  headerText: {
    flex: 1,
    fontSize: fontSizes.md,
    color: colors.textPrimary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    gap: spacing.lg,
  },
  coverImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentMiddle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentSound: {
    marginTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentTime: {
    marginTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textTime: {
    color: colors.textSecondary,
  },
  contentSlider: {
    height: 10,
  },
  slider: {
    // flex: 1,
    // alignContent: 'center',
    // alignItems: 'center',
    // alignSelf: 'center',
    // justifyContent: 'center',
    // marginTop: spacing.md,
  },
  contentMode: {
    flexDirection: 'row',
    gap: 10,
  },
  coverImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  contentText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  actionContainer: {
    flexDirection: 'row',
    gap: 40,
    justifyContent: 'center',
  },
});
