import {PermissionsAndroid, Platform, Alert} from 'react-native';

export async function requestPermissions() {
  try {
    if (Platform.OS === 'android') {
      // For Android 13+ (API 33+), use READ_MEDIA_AUDIO
      if (Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.error('Permission denied for READ_MEDIA_AUDIO');
          Alert.alert(
            'Permission Denied',
            'You need to grant audio permission to continue.',
          );
          return;
        }
      } else {
        // For Android versions below API 33, request READ_EXTERNAL_STORAGE
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.error('Permission denied for READ_EXTERNAL_STORAGE');
          Alert.alert(
            'Permission Denied',
            'You need to grant storage permission to continue.',
          );
          return;
        }
      }
    }
  } catch (error) {
    console.error('Error requesting permissions:', error);
    Alert.alert(
      'Error',
      'There was an error requesting the permissions. Please try again.',
    );
  }
}
