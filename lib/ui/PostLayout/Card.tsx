/** @format */

import React from "react";
import { I18nManager, Text, TouchableOpacity, ViewStyle } from "react-native";
import TimeAgo from "react-native-timeago";

import { withTheme } from "@/lib/common";
// import { ImageCache, ProductPrice, Rating, WishListIcon } from "@components";
import ImageCache from "../ImageCache";
import ProductPrice from "../ProductPrice";
import Rating from "../Rating";
import WishListIcon from "../WishListIcon";
import css from "./style";

/**
 * Types
 */
interface Product {
  id: string | number;
  average_rating?: number | string;
  [key: string]: any;
}

interface Theme {
  colors: {
    background: string;
    text: string;
  };
}

interface CardLayoutProps {
  post?: Product;
  title?: string;
  type?: string;
  imageURL?: string;
  date?: Date | string | number;
  viewPost?: () => void;
  currency?: string;
  theme: Theme;
}

/**
 * Component
 */
const CardLayout: React.FC<CardLayoutProps> = ({
  post,
  title,
  type,
  imageURL,
  date,
  viewPost,
  currency,
  theme,
}) => {
  const {
    colors: { text },
  } = theme;

  const wishIcon: ViewStyle = {
    top: 17,
    right: 30,
  };

  const wishIconRTL: ViewStyle = {
    top: 17,
    left: 17,
  };

  const isProduct = typeof type === "undefined";

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={css.panelOne}
      onPress={viewPost}
    >
      <ImageCache uri={imageURL} style={css.imagePanelOne} />

      <Text style={[css.nameOne, { color: text }]}>{title}</Text>

      {!isProduct && date && (
        <Text style={[css.timeOne, { textAlign: "center" }]}>
          <TimeAgo time={date} />
        </Text>
      )}

      {isProduct && post && (
        <>
          <ProductPrice currency={currency} product={post} hideDisCount />

          <WishListIcon
            product={post}
            style={I18nManager.isRTL ? wishIconRTL : wishIcon}
          />

          <Rating rating={Number(post.average_rating) || 0} />
        </>
      )}
    </TouchableOpacity>
  );
};

export default withTheme<CardLayoutProps>(CardLayout);
