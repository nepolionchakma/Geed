import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../Components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../Constants/Colors';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text>ProfileScreen</Text>
    </SafeAreaView>
  );
};

export default ProfileScreen;

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
