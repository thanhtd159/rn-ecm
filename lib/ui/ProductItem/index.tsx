/** @format */

import React, { useCallback } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";

import { Images, Tools, withTheme } from "@/lib/common";
import ChangeQuantity from "../ChangeQuantity";
// import {
//   addCartItem as addCartItemAction,
//   removeCartItem as removeCartItemAction,
// } from "@features/cart/cartSlice";

import { useAppDispatch } from "@/lib/store/useRedux";
import styles from "./styles";

export interface ProductItemProps {
  product: {
    id: string | number;
    name: string;
    price?: string;
    images?: any[];
    attributes?: any[];
  };
  quantity?: number;
  viewQuantity?: boolean;
  variation?: {
    id: number;
    image: {
      id: number;
      src: string;
    };
    attributes?: {
      name: string;
      option: string;
    }[];
  };
  onPress?: (data: { product: any }) => void;
  onRemove?: (product: any, variation?: any) => void;
  currency?: { symbol: string; code: string };
  theme?: {
    colors: { background: string; text: string; lineColor: string };
    dark: boolean;
  };
}

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  quantity,
  viewQuantity,
  variation,
  onPress,
  onRemove,
  theme = {
    colors: { background: "#ffffff", text: "#000000", lineColor: "#e0e0e0" },
    dark: false,
  },
  currency,
}) => {
  const {
    colors: { background, text, lineColor },
    dark: isDark,
  } = theme;
  const dispatch = useAppDispatch();

  const addCartItem = (p: any, v: any) => {
    // dispatch(addCartItemAction({ product: p, variation: v }));
  };

  const removeCartItem = (p: any, v: any) => {
    // dispatch(removeCartItemAction({ id: p.id }));
  };

  const onChangeQuantity = useCallback(
    (q: number) => {
      if ((quantity ?? 0) < q) {
        addCartItem(product, variation);
      } else {
        removeCartItem(product, variation);
      }
    },
    [quantity, product, variation, addCartItem, removeCartItem],
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: background },
        isDark && { borderBottomColor: lineColor },
      ]}
    >
      <View style={styles.content}>
        <TouchableOpacity onPress={() => onPress?.({ product })}>
          <Image
            source={{ uri: Tools.getImageVariation(product, variation) }}
            style={styles.image}
          />
        </TouchableOpacity>

        <View
          style={[
            styles.infoView,
            { width: Dimensions.get("window").width - 180 },
          ]}
        >
          <TouchableOpacity onPress={() => onPress?.({ product })}>
            <Text style={[styles.title, { color: text }]}>{product.name}</Text>
          </TouchableOpacity>
          <View style={styles.priceContainer}>
            <Text style={[styles.price, { color: text }]}>
              {Tools.getPriceIncludedTaxAmount(
                product,
                variation,
                false,
                currency,
              )}
            </Text>
            {variation &&
              typeof variation.attributes !== "undefined" &&
              variation.attributes.map((variant) => {
                return (
                  <Text key={variant.name} style={styles.productVariant(text)}>
                    {variant.option}
                  </Text>
                );
              })}
          </View>
        </View>
        {viewQuantity && (
          <ChangeQuantity
            style={styles.quantity}
            quantity={quantity}
            onChangeQuantity={onChangeQuantity}
          />
        )}
      </View>

      {viewQuantity && (
        <TouchableOpacity
          style={styles.btnTrash}
          onPress={() => onRemove?.(product, variation)}
        >
          <Image
            source={Images.IconTrash}
            style={[styles.icon, { tintColor: text }]}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default withTheme(ProductItem);
