import {useEffect} from 'react';
import {Image, Platform, StyleSheet, View} from 'react-native';
import delay from '../Services/delay';
import BootSplash from 'react-native-bootsplash';

const Logo = require('../Assets/logo.jpg');
const Loader = ({navigation}: {navigation: any}) => {
  useEffect(() => {
    (async () => {
      try {
        const isVisible = await BootSplash.isVisible();
        if (isVisible) {
          await delay(500);
          await BootSplash.hide({fade: true});
          navigation.replace('Drawer');
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [navigation]);

  return (
    <View style={styles.center}>
      <Image style={styles.logo} source={Logo} />
      {/* <Text>Geed</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: Platform.OS === 'ios' ? 'flex-start' : 'center',
    paddingTop: Platform.OS === 'ios' ? 2.6 : 0.001,
    backgroundColor: 'white',
    flex: 1,
  },
  logo: {
    width: Platform.OS === 'ios' ? 90 : 100,
    height: Platform.OS === 'ios' ? 98 : 90,
    alignSelf: 'center',
  },
});

export default Loader;
