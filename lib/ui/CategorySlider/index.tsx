/** @format */

import { Languages, Styles, Tools } from "@/lib/common";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-swiper";
import _Button from "../Button/index";
import styles from "./index_style";
const Button = _Button as any;
// import {Button} from '../index';

export interface SliderProduct {
  id?: number | string;
  name?: string;
  price?: string;
  images: { src: string[] };
}

export interface CategorySliderProps {
  products?: SliderProduct[];
  clickProduct?: (product: SliderProduct) => void;
  showAllProduct?: () => void;
}

const CategorySlider: React.FC<CategorySliderProps> = ({
  products = [],
  clickProduct,
  showAllProduct,
}) => {
  const [currentProduct, setCurrentProduct] = useState<any>(
    products.length > 0 ? products[0] : {},
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const onChangeProduct = (index: number) => {
    setCurrentProduct(products[index]);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.productView}>
      <Swiper
        height={Styles.width / 1.44}
        showsPagination={false}
        onMomentumScrollEnd={(e, state, context) =>
          onChangeProduct(state.index)
        }
      >
        {products.map((product, index) => (
          <TouchableOpacity
            key={index.toString()}
            style={{ flex: 1 }}
            onPress={() => clickProduct?.(product)}
          >
            <Image
              source={{ uri: product.images.src[0] }}
              style={styles.imageProduct}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </Swiper>
      <Text style={styles.name}>{currentProduct.name}</Text>
      <Text style={styles.price}>
        {Tools.getCurrencyFormatted(currentProduct.price, "")}
      </Text>

      <View style={{ backgroundColor: "white" }}>
        <View style={styles.indicatorView}>
          {products.map((product, index) => (
            <View
              key={index.toString()}
              style={[
                styles.indicator,
                currentIndex == index && styles.currentIndicator,
              ]}
            />
          ))}
        </View>

        <View style={styles.btnContainer}>
          <Button
            text={Languages.ShopNow.toUpperCase()}
            style={styles.btnShop}
            textStyle={styles.btnShopText}
            onPress={() => showAllProduct?.()}
          />
        </View>
      </View>
    </View>
  );
};

export default CategorySlider;
