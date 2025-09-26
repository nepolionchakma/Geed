import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
interface Props {
  item: any;
  selectedCategory: string;
  handleCategoryClick: (category: string) => void;
}
const CategoryTabs = ({item, selectedCategory, handleCategoryClick}: Props) => {
  return (
    <TouchableOpacity
      onPress={() => handleCategoryClick(item?.title)}
      style={{
        backgroundColor:
          selectedCategory === item?.title ? '#525392ff' : '#21223dff',
        borderRadius: 5,
        paddingVertical: 2,
        paddingHorizontal: 4,
      }}>
      <Text style={{color: 'white'}}>{item?.title}</Text>
    </TouchableOpacity>
  );
};
export default CategoryTabs;

// const styles = StyleSheet.create({});
