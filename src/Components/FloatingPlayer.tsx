import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {colors} from '../Constants/Colors';
import {fontSizes, spacing} from '../Constants/dimensions';
import {NextButton, PlayPauseButton, PreviousButton} from './PlayerColtroller';
import {Slider} from 'react-native-awesome-slider';
import {useSharedValue} from 'react-native-reanimated';
import MovingText from './MovingText';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DrawerParamList} from '../Types/NavigationTypes';
import TrackPlayer, {
  PlaybackState,
  State,
  useActiveTrack,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import {RootState} from '../Redux/Store/Store';
import {useAppSelector} from '../Redux/Hooks/Hooks';

const FloatingPlayer = () => {
  const activeTrack = useActiveTrack();
  const navigation =
    useNavigation<NativeStackNavigationProp<DrawerParamList>>();
  const {position, duration} = useProgress();
  // console.log(position, 'position');
  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(0);

  useEffect(() => {
    max.value = duration;
  }, [duration, max]);

  useEffect(() => {
    progress.value = position;
  }, [position, progress]);

  // const imageUrl =
  //   'https://www.shutterstock.com/image-vector/retro-futuristic-background-1980s-style-600nw-487600702.jpg';

  const handleOpenPlayingScreen = () => {
    navigation.navigate('PlayingScreen');
  };

  const data = useAppSelector((state: RootState) => state.tracks);
  const playBackState: PlaybackState | {state: undefined} = usePlaybackState();
  const state = 'state' in playBackState ? playBackState.state : undefined;

  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };
  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };
  const togglePlayBack = async (playback: State | undefined) => {
    // Ensure that the playback state is valid before proceeding
    if (playback === undefined) {
      return;
    } // Skip if undefined

    const currentTrack = await TrackPlayer.getCurrentTrack();

    if (currentTrack !== null) {
      if (playback === State.Paused || playback === State.Ready) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };
  if (!data.isReady) {
    return (
      <View style={{backgroundColor: colors.background}}>
        <ActivityIndicator size="large" color={colors.iconPrimary} />
      </View>
    );
  }
  // console.log(activeTrack, 'activeTrack');
  return (
    <View style={styles.container}>
      <Slider
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        onSlidingComplete={value => TrackPlayer.seekTo(value)}
        theme={{
          minimumTrackTintColor: colors.minimumTrackTintColor,
          maximumTrackTintColor: colors.maximumTrackTintColor,
        }}
        style={styles.slider}
        bubbleContainerStyle={{display: 'none'}}
      />
      <TouchableOpacity
        style={styles.containerFloatingPlayer}
        activeOpacity={0.5}
        onPress={handleOpenPlayingScreen}>
        <View style={styles.imageAndText}>
          <Image
            // source={{uri: activeTrack?.artwork}}
            source={require('../Assets/logo1.jpg')}
            style={styles.coverImage}
          />
          <View style={[styles.textContainer]}>
            <MovingText
              text={activeTrack?.title!}
              style={styles.textTitle}
              animationThreshold={15}
            />
            {/* <Text style={styles.textTitle}>Monster go home</Text> */}
            <Text style={styles.textArtist}>
              {activeTrack?.artist?.length && activeTrack?.artist?.length > 15
                ? activeTrack?.artist?.slice(0, 22) + '...'
                : activeTrack?.artist}
            </Text>
          </View>
        </View>
        <View style={styles.actionContainer}>
          <PreviousButton
            size={spacing.xl}
            onPress={() => skipToPrevious()}
            name="skip-previous"
          />
          <PlayPauseButton
            size={spacing.xl}
            onPress={() => togglePlayBack(state)}
            name={state === State.Playing ? 'pause' : 'play'}
          />
          <NextButton
            size={spacing.xl}
            onPress={() => skipToNext()}
            name="skip-next"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FloatingPlayer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.floatingBG,
    paddingVertical: spacing.xs,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    marginBottom: 73,
  },
  slider: {
    zIndex: 1,
    top: -10,
  },
  containerFloatingPlayer: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    justifyContent: 'space-between',
  },
  imageAndText: {
    flex: 1,
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingTop: spacing.xs,
  },
  textContainer: {
    width: '85%',
    paddingHorizontal: spacing.xs,
    overflow: 'hidden',
  },
  coverImage: {
    width: 30,
    height: 30,
    borderRadius: 10,
  },
  textTitle: {
    color: colors.textPrimary,
    paddingRight: spacing.xs,
    fontSize: fontSizes.md,
  },
  textArtist: {
    color: colors.textSecondary,
    fontSize: fontSizes.md,
  },
  actionContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flexDirection: 'row',
  },
});
