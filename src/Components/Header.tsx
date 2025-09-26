import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../Constants/Colors';
import {iconSizes, spacing} from '../Constants/dimensions';
import {DrawerActions, useNavigation} from '@react-navigation/native';

const Header = () => {
  // const navigation = useNavigation<DrawerActionHelpers<DrawerParamList>>();
  // const openDrawer = () => {
  //   navigation.toggleDrawer();
  // };
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openDrawer}>
        <Icon name="menu" size={iconSizes.lg} color={colors.iconPrimary} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="search" size={iconSizes.lg} color={colors.iconPrimary} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
});
