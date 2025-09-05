import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fontSizes, spacing} from '../Constants/dimensions';
import {colors} from '../Constants/Colors';
import {fontFamilies} from '../Constants/Fonts';
import Card from './Card';

const CardWithCategory = ({item}: any) => {
  console.log(item, 'item');
  return (
    <View style={styles.container}>
      <Text style={styles.txtHeader}>{item.title}</Text>
      <FlatList
        data={item.songs}
        renderItem={Card}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View style={{marginHorizontal: spacing.xs}} />
        )}
        // contentContainerStyle={{ paddingHorizontal: spacing.md }}
      />
    </View>
  );
};

export default CardWithCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 22,
    paddingHorizontal: spacing.sm,
  },
  txtHeader: {
    fontSize: fontSizes.lg,
    color: colors.textPrimary,
    fontFamily: fontFamilies.light,
  },
});
