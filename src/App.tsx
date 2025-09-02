// import React, {useEffect} from 'react';
// import {View, Button, Text, StyleSheet, SafeAreaView} from 'react-native';
// import TrackPlayer, {Capability} from 'react-native-track-player';
// import {playbackService} from './Services/PlaybackService';

// const MainApp: React.FC = () => {
//   useEffect(() => {
//     async function setupPlayer() {
//       // Set up TrackPlayer
//       await TrackPlayer.setupPlayer();
//       await TrackPlayer.updateOptions({
//         capabilities: [
//           Capability.Play,
//           Capability.Pause,
//           Capability.Stop,
//           Capability.SkipToNext,
//           Capability.SkipToPrevious,
//         ],
//         notificationCapabilities: [
//           Capability.Play,
//           Capability.Pause,
//           Capability.SkipToNext,
//           Capability.SkipToPrevious,
//         ],
//       });

//       // Register the playback service
//       TrackPlayer.registerPlaybackService(() => playbackService);

//       // Add the tracks (if any) here for testing purposes
//       const tracks = [
//         {
//           id: 'trackId1',
//           url: require('./assets/song1.mp3'), // Path to your local music file
//           title: 'Song 1',
//           artist: 'Artist 1',
//           artwork: require('./assets/image1.jpg'), // Path to cover image
//         },
//       ];

//       // Add the tracks to TrackPlayer
//       await TrackPlayer.add(tracks);
//     }

//     setupPlayer();

//     return () => {
//       // Cleanup on unmount
//       TrackPlayer.reset();
//     };
//   }, []);

//   // Functions to control the player
//   const playMusic = async () => {
//     await TrackPlayer.play();
//   };

//   const pauseMusic = async () => {
//     await TrackPlayer.pause();
//   };

//   const nextTrack = async () => {
//     await TrackPlayer.skipToNext();
//   };

//   const previousTrack = async () => {
//     await TrackPlayer.skipToPrevious();
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Welcome to the Music Player</Text>
//       <Button title="Play" onPress={playMusic} />
//       <Button title="Pause" onPress={pauseMusic} />
//       <Button title="Next" onPress={nextTrack} />
//       <Button title="Previous" onPress={previousTrack} />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#ffffffff',
//   },
// });

// export default MainApp;
