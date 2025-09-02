import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../Constants/Colors';
import { fontSizes, iconSizes, spacing } from '../Constants/dimensions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Card from '../Components/Card';
import FloatingPlayer from '../Components/FloatingPlayer';
import { useNavigation } from '@react-navigation/native';

export default function LikedSongsScreen() {
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerIcons}>
        <TouchableOpacity onPress={goBack}>
          <Icon
            name="chevron-left"
            size={iconSizes.lg}
            color={colors.iconPrimary}
          />
        </TouchableOpacity>
        <Text style={styles.titleText}>Liked Songs</Text>
        <TouchableOpacity>
          <Icon
            name="equalizer"
            size={iconSizes.lg}
            color={colors.iconPrimary}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={{ flex: 9 }}>
          <FlatList
            keyExtractor={item => item.toString()}
            // ListHeaderComponent={() => (
            //   <Text style={styles.titleText}>LikeScreen</Text>
            // )}
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            renderItem={() => (
              <Card
                containerStyle={{ width: '47%' }}
                imageStyle={{
                  height: 120,
                  width: 120,
                }}
              />
            )}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              marginVertical: spacing.md,
              flex: 6,
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <FloatingPlayer />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.sm,
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  titleText: {
    fontSize: fontSizes.md,
    color: colors.textPrimary,
    fontWeight: 'bold',
    paddingHorizontal: spacing.xs,
  },
  content: {
    flex: 1,
  },
});
