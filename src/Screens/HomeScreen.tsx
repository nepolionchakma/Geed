import { FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { colors } from '../Constants/Colors';

import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Components/Header';
import { fontFamilies } from '../Constants/Fonts';
import { fontSizes, spacing } from '../Constants/dimensions';
// import Card from '../Components/Card';
import CardWithCategory from '../Components/CardWithCategory';
import FloatingPlayer from '../Components/FloatingPlayer';
import { SongsWithCategory } from '../Data/SongsWithCategory';

function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      {/* <CardWithCategory /> */}
      <FlatList
        keyExtractor={(item, index) => (item.id + index).toString()}
        data={SongsWithCategory}
        renderItem={CardWithCategory}
        contentContainerStyle={{ gap: 22, paddingBottom: spacing.sm }}
        showsVerticalScrollIndicator={false}
      />
      <FloatingPlayer />
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingVertical: spacing.sm,
    // paddingHorizontal: spacing.xs,
  },
  txtHeader: {
    fontSize: fontSizes.lg,
    color: colors.textPrimary,
    fontFamily: fontFamilies.light,
  },
});
