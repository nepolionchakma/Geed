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
      onPress={() => handleCategoryClick(item?.category_name)}
      style={{
        backgroundColor:
          selectedCategory === item?.category_name ? '#525392ff' : '#21223dff',
        borderRadius: 5,
        paddingVertical: 2,
        paddingHorizontal: 4,
      }}>
      <Text style={{color: 'white'}}>{item?.category_name}</Text>
    </TouchableOpacity>
  );
};
export default CategoryTabs;

// const styles = StyleSheet.create({});
