/** @format */

import React from "react";
import { Text, TouchableOpacity, ViewStyle } from "react-native";
import TimeAgo from "react-native-timeago";

import { Constants, withTheme } from "@/lib/common";
import ImageCache from "../ImageCache";
import ProductPrice from "../ProductPrice";
import Rating from "../Rating";
import WishListIcon from "../WishListIcon";
import css from "./style";

/**
 * Types
 */
interface Product {
  average_rating?: number | string;
  [key: string]: any;
}

interface Theme {
  colors: {
    background: string;
    text: string;
  };
}

interface ColumnLayoutProps {
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
const ColumnLayout: React.FC<ColumnLayoutProps> = ({
  imageURL,
  post,
  type,
  title,
  date,
  viewPost,
  currency,
  theme,
}) => {
  const {
    colors: { text },
  } = theme;

  const isProduct = typeof type === "undefined";

  const wishIconStyle: ViewStyle = Constants.RTL ? { left: 20 } : { right: 25 };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={css.panelTwo}
      onPress={viewPost}
    >
      <ImageCache uri={imageURL} style={css.imagePanelTwo} />

      <Text style={[css.nameTwo, { color: text }]}>{title}</Text>

      {!isProduct && date && (
        <Text style={[css.timeTwo, { alignSelf: "center" }]}>
          <TimeAgo time={date} />
        </Text>
      )}

      {isProduct && post && (
        <>
          <ProductPrice currency={currency} product={post} hideDisCount />

          <WishListIcon product={post} style={wishIconStyle} />

          <Rating rating={Number(post.average_rating) || 0} />
        </>
      )}
    </TouchableOpacity>
  );
};

export default withTheme<ColumnLayoutProps>(ColumnLayout);
