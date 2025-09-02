import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Components/Header';
import { colors } from '../Constants/Colors';

const AboutUsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text>AboutUsScreen</Text>
    </SafeAreaView>
  );
};

export default AboutUsScreen;

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
