/** @format */

import React, { useCallback } from "react";
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Constants, withTheme } from "@lib/common";

import { productActions } from "@/features/products/store/product-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/useRedux";
import styles from "./styles";

/** ===== Types ===== */

interface ThemeType {
  colors: {
    background: string;
    text: string;
  };
}

export interface ItemLayoutProps {
  layout: string;
  image: ImageSourcePropType;
  text: string;
  close?: () => void;
  theme: ThemeType;
}

/** ===== Component ===== */

const ItemLayoutComponent: React.FC<ItemLayoutProps> = ({
  layout,
  image,
  text,
  close,
  theme,
}) => {
  const { text: textColor } = theme.colors;

  const dispatch = useAppDispatch();

  const layoutHome = useAppSelector((state: any) => state.products.layoutHome);

  const changeLayout = useCallback(
    (newLayout: string) => {
      dispatch(productActions.switchLayout(newLayout));
      close?.(); // safe call
    },
    [dispatch, close],
  );

  const displayMode = layoutHome ?? Constants.Layout.horizon;

  const isActive = displayMode === layout;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.rowView}
      onPress={() => changeLayout(layout)}
    >
      <View style={[styles.row, isActive && styles.rowActive]}>
        <Image
          source={image}
          style={[
            styles.imageIcon,
            { tintColor: textColor },
            isActive && { tintColor: "#fff" },
          ]}
        />

        <Text
          style={[
            styles.text,
            isActive && styles.imageIconActive,
            { color: textColor },
          ]}
        >
          {text}
          {/* {Languages[text]} */}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

ItemLayoutComponent.displayName = "ItemLayout";

/** ===== Fix HOC type ===== */

const ItemLayout = withTheme(
  ItemLayoutComponent as React.ComponentType<any>,
) as React.FC<Omit<ItemLayoutProps, "theme">>;

export default ItemLayout;
