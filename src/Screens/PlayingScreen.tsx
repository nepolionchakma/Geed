import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../Constants/Colors';
import {fontSizes, iconSizes, spacing} from '../Constants/dimensions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {Slider} from 'react-native-awesome-slider';
import {useSharedValue} from 'react-native-reanimated';
import {
  NextButton,
  PlayPauseButton,
  PreviousButton,
} from '../Components/PlayerColtroller';
import TrackPlayer, {
  PlaybackState,
  State,
  Track,
  useActiveTrack,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import Container from '../Components/Container';
import {useAppDispatch} from '../Redux/Hooks/Hooks';
import {setIsPlayingQueue} from '../Redux/Slices/SongSlice';
import QueueSongsList from '../Components/QueueSongsList';

export interface SongInfoProps {
  track: Track | null | undefined;
}

const PlayingScreen = () => {
  const isLiked = true;
  const navigation = useNavigation();
  const playBackState: PlaybackState | {state: undefined} = usePlaybackState();
  const state = 'state' in playBackState ? playBackState.state : undefined;
  const {position, duration} = useProgress();
  const activeTrack = useActiveTrack();
  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(0);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    max.value = duration;
  }, [duration, max]);

  useEffect(() => {
    progress.value = position;
  }, [position, progress]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  // Extract the state from the `playBackState`

  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
    await TrackPlayer.play();
    dispatch(setIsPlayingQueue(true));
  };
  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
    await TrackPlayer.play();
    dispatch(setIsPlayingQueue(true));
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
        dispatch(setIsPlayingQueue(true));
      } else {
        await TrackPlayer.pause();
        dispatch(setIsPlayingQueue(true));
      }
    }
  };

  const handleQueuePress = () => {
    setIsModalOpen(true);
  };
  // const [track, setTrack] = useState<Track | null>();
  // useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
  //   switch (event.type) {
  //     case Event.PlaybackTrackChanged:
  //       const track = await TrackPlayer.getTrack(event.nextTrack);
  //       console.log(track);
  //       setTrack(track);
  //       break;
  //   }
  // });
  // if (!activeTrack) {
  //   return (
  //     <View style={styles.loading}>
  //       <ActivityIndicator size="large" color={colors.textPrimary} />
  //     </View>
  //   );
  // }
  console.log(activeTrack, 'activeTrack');
  return (
    <Container isRefresh={true} isScrollView={false} style={styles.container}>
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
          <Image
            source={require('../Assets/logo1.jpg')}
            // source={{uri: activeTrack?.artwork?.toString()}}
            style={[styles.coverImage]}
          />
        </View>
        <View style={styles.contentMiddle}>
          <View style={styles.contentText}>
            <Text style={styles.textTitle} numberOfLines={1}>
              {activeTrack?.title}
            </Text>
            <Text style={styles.textArtist} numberOfLines={1}>
              {activeTrack?.artist} . {activeTrack?.album}
            </Text>
          </View>
        </View>
        <View style={{gap: spacing.xl}}>
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
              <TouchableOpacity activeOpacity={0.5} onPress={handleQueuePress}>
                <Icon
                  name={'queue-music'}
                  size={iconSizes.lg}
                  color={colors.iconPrimary}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contentTime}>
            <Text style={styles.textTime}>
              {new Date(position * 1000).toISOString().substr(11, 8)}
            </Text>
            <Text style={styles.textTime}>
              {new Date((duration - position) * 1000)
                .toISOString()
                .substr(11, 8)}
            </Text>
          </View>
          <View style={styles.contentSlider}>
            <Slider
              progress={progress}
              minimumValue={min}
              maximumValue={max}
              onSlidingComplete={async value => {
                await TrackPlayer.seekTo(value);
                await TrackPlayer.play();
              }}
              theme={{
                minimumTrackTintColor: colors.minimumTrackTintColor,
                maximumTrackTintColor: colors.maximumTrackTintColor,
              }}
              style={styles.slider}
              bubbleContainerStyle={{display: 'none'}}
            />
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
        </View>
      </View>
      <QueueSongsList
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      {state === State.Loading && (
        <ActivityIndicator
          size="large"
          color={colors.white}
          style={styles.loadingIndicator}
        />
      )}
      {/* Queue List  */}
    </Container>
  );
};

export default PlayingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.background,
    paddingVertical: spacing.sm,
  },
  headerIcons: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
  },
  backButton: {position: 'absolute', left: 10, zIndex: 1},
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
    width: 100,
    // width: 200,
    height: 100,
    // height: 200,
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
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
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
