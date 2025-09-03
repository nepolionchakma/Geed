import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../Constants/Colors';
import {fontSizes, spacing} from '../Constants/dimensions';
import {NextButton, PlayPauseButton, PreviousButton} from './PlayerColtroller';
import {Slider} from 'react-native-awesome-slider';
import {useSharedValue} from 'react-native-reanimated';
import MovingText from './MovingText';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../Types/NavigationTypes';
import TrackPlayer, {
  PlaybackState,
  State,
  usePlaybackState,
} from 'react-native-track-player';
// import {addTrack, setupPlayer} from '../Services/PlaybackService';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {RootState} from '../Redux/Store/Store';

const FloatingPlayer = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const progress = useSharedValue(30);
  const min = useSharedValue(0);
  const max = useSharedValue(100);

  const data = useSelector((state: RootState) => state.tracks);

  const imageUrl =
    'https://www.shutterstock.com/image-vector/retro-futuristic-background-1980s-style-600nw-487600702.jpg';

  const handleOpenPlayingScreen = () => {
    navigation.navigate('PlayingScreen');
  };

  const playBackState: PlaybackState | {state: undefined} = usePlaybackState();

  // Extract the state from the `playBackState`
  const state = 'state' in playBackState ? playBackState.state : undefined;
  // const [isPlayerReady, setIsPlayerReady] = useState(false);
  // async function setup() {
  //   let isSetup = await setupPlayer();
  //   if (isSetup) {
  //     await addTrack();
  //   }
  //   return setIsPlayerReady(isSetup);
  // }
  // useEffect(() => {
  //   setup();
  // }, []);

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
  if (data?.isReady) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" color={colors.iconPrimary} />
      </SafeAreaView>
    );
  }
  return (
    <View style={styles.container}>
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
      <TouchableOpacity
        style={styles.containerFloatingPlayer}
        activeOpacity={0.5}
        onPress={handleOpenPlayingScreen}>
        <View style={styles.imageAndText}>
          <Image source={{uri: imageUrl}} style={styles.coverImage} />
          <View style={[styles.textContainer]}>
            <MovingText
              text="Monster go home Monster a a  aaa a "
              style={styles.textTitle}
              animationThreshold={15}
            />
            {/* <Text style={styles.textTitle}>Monster go home</Text> */}
            <Text style={styles.textArtist}>Alan Wright</Text>
          </View>
        </View>
        <View style={styles.actionContainer}>
          <PreviousButton
            size={spacing.lg}
            onPress={() => skipToPrevious()}
            name="skip-previous"
          />
          <PlayPauseButton
            size={spacing.lg}
            onPress={() => togglePlayBack(state)}
            name={state === State.Playing ? 'pause' : 'play'}
          />
          <NextButton
            size={spacing.lg}
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
    backgroundColor: '#192e46ff',
    paddingVertical: spacing.xs,
  },
  slider: {
    zIndex: 1,
    top: -10,
  },
  containerFloatingPlayer: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
    justifyContent: 'space-between',
  },
  imageAndText: {
    flex: 1,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingTop: spacing.xs,
  },
  textContainer: {
    width: '70%',
    paddingHorizontal: spacing.xs,
    overflow: 'hidden',
  },
  coverImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  textTitle: {
    color: colors.textPrimary,
    paddingRight: spacing.xs,
    fontSize: fontSizes.md,
  },
  textArtist: {
    color: colors.textSecondary,
    fontSize: fontSizes.sm,
  },
  actionContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flexDirection: 'row',
  },
});
