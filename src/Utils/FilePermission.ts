import {PermissionsAndroid, Platform, Alert} from 'react-native';

export async function requestPermissions(): Promise<boolean> {
  try {
    if (Platform.OS === 'android') {
      let granted: string;

      if (Platform.Version >= 33) {
        // Android 13+ uses READ_MEDIA_AUDIO
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
          {
            title: 'Audio Permission',
            message:
              'App needs access to your audio files to function properly.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        );
      } else {
        // Android < 13 uses READ_EXTERNAL_STORAGE
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message:
              'App needs access to your audio files to function properly.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        );
      }

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        Alert.alert(
          'Permission Denied',
          'You need to grant permission to access audio files.',
        );
        return false;
      }
    } else {
      // iOS permissions handled differently (not required for local audio access)
      return true;
    }
  } catch (error) {
    console.error('Error requesting permissions:', error);
    Alert.alert(
      'Error',
      'There was an error requesting permissions. Please try again.',
    );
    return false;
  }
}
