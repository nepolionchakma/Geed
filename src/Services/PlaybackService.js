import TrackPlayer, {
  Capability,
  Event,
  RatingType,
  RepeatMode,
} from 'react-native-track-player';

// Flag to track if the player has been set up
let isPlayerSetup = false;

export async function setupPlayer() {
  try {
    // Check if the player is already set up
    if (isPlayerSetup) {
      return true;
    }

    // Attempt to get the current track to see if the player is initialized
    await TrackPlayer.getCurrentTrack(); // If it throws, setup the player
    isPlayerSetup = true;
    return true;
  } catch (e) {
    // If the player is not initialized, set it up
    await TrackPlayer.setupPlayer({
      maxCacheSize: 1024 * 100, // Set cache size if needed
    });
    await TrackPlayer.updateOptions({
      ratingType: RatingType.Heart,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.Stop,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
      notificationCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
    });

    isPlayerSetup = true;
    return true;
  }
}

export async function addTrack(Songs) {
  try {
    // Check if the player is initialized first
    const isSetup = await setupPlayer();
    if (!isSetup) {
      console.log('Player setup failed');
      return;
    }

    // Add new songs to the player queue if player is setup
    await TrackPlayer.add(Songs);
    await TrackPlayer.setRepeatMode(RepeatMode.Queue); // Set repeat mode for continuous play
    console.log('Tracks added and repeat mode set.');
  } catch (error) {
    console.log('Error adding track to player:', error);
  }
}

export async function playbackService() {
  // Listen for events from external controls (like lock screen or notification center)
  TrackPlayer.addEventListener(Event.RemotePlay, async () => {
    try {
      await TrackPlayer.play();
      console.log('Playback started');
    } catch (error) {
      console.log('Error playing track:', error);
    }
  });

  TrackPlayer.addEventListener(Event.RemotePause, async () => {
    try {
      await TrackPlayer.pause();
      console.log('Playback paused');
    } catch (error) {
      console.log('Error pausing track:', error);
    }
  });

  TrackPlayer.addEventListener(Event.RemoteNext, async () => {
    try {
      await TrackPlayer.skipToNext();
      console.log('Skipped to next track');
    } catch (error) {
      console.log('Error skipping to next track:', error);
    }
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, async () => {
    try {
      await TrackPlayer.skipToPrevious();
      console.log('Skipped to previous track');
    } catch (error) {
      console.log('Error skipping to previous track:', error);
    }
  });
}
