import {StyleSheet, Text} from 'react-native';
import React from 'react';
import Header from '../Components/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../Constants/Colors';

const SettingsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text>SettingsScreen</Text>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingVertical: spacing.sm,
    // paddingHorizontal: spacing.xs,
  },
});
