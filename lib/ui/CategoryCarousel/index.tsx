/** @format */

import { toast } from "@/lib/Omni";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-snap-carousel";
// import {setCategories} from '@redux/slices/categoriesSlice';

import { Images, Languages, Tools } from "@/lib/common";
import { useAppDispatch, useAppSelector } from "@/lib/store/useRedux";
import styles from "./styles";

export interface CarouselCategory {
  id: number | string;
  name?: string;
  image?: { src: string } | null;
  count?: number;
}

export interface CategoryCarouselProps {
  onViewCategory?: (data: { mainCategory: any }) => void;
}

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");

function wp(percentage: number) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideWidth = wp(75);
const slideHeight = viewportHeight * 0.65;
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const slideInnerContainer = {
  width: itemWidth,
  height: slideHeight,
  borderRadius: 6,
  overflow: "hidden",
  paddingHorizontal: itemHorizontalMargin,
  paddingBottom: 18, // needed for shadow
};

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({
  onViewCategory,
}) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.list);
  const netInfo = useAppSelector((state) => state.netInfo);

  const setSelectedCategory = (category: any) => {
    // signal selection via prop if needed
  };

  const fetchCategories = () => {
    if (!netInfo.isConnected) return toast(Languages.noConnection);
    // trigger saga or thunk here if needed
  };
  const showCategory = (category: any) => {
    setSelectedCategory({
      ...category,
      mainCategory: category,
    });
    if (onViewCategory) {
      onViewCategory({ mainCategory: category });
    }
  };

  const renderItem = ({ item }: { item: CarouselCategory }) => {
    if (item.image == null) return <View />;

    const image =
      item.image !== null
        ? { uri: item.image.src }
        : Images.categoryPlaceholder;

    return (
      <View style={slideInnerContainer as any}>
        <LinearGradient
          style={[styles.linearGradient, { width: itemWidth }] as any}
          colors={["rgba(0,0,0, 0)", "rgba(0, 0, 0, 0.8)"] as any}
        />
        <Image source={image} style={styles.image} />

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => showCategory(item)}
          style={styles.titleView}
        >
          <Text style={styles.title}>
            {Tools.getDescription(item.name, 200)}
          </Text>
          <Text numberOfLines={2} style={styles.count}>
            {item.count + " " + Languages.products}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Carousel
      layout={"stack"}
      layoutCardOffset={18}
      renderItem={renderItem}
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
      inactiveSlideOpacity={0.4}
      contentContainerCustomStyle={styles.sliderContainer}
      removeClippedSubviews={false}
      loop={true}
      data={categories}
    />
  );
};

export default CategoryCarousel;
