/** @format */

import { withTheme } from "@/lib/common";
// import { ImageCache, ProductPrice, Rating, WishListIcon } from "@components";
import React from "react";
import {
  GestureResponderEvent,
  I18nManager,
  Text,
  TouchableOpacity,
} from "react-native";
import TimeAgo from "react-native-timeago";
import ImageCache from "../ImageCache";
import ProductPrice from "../ProductPrice";
import Rating from "../Rating";
import WishListIcon from "../WishListIcon";
import css from "./style";

interface ThemeType {
  colors: {
    text: string;
  };
}

interface Product {
  id: string | number;
  average_rating?: number;
  [key: string]: any;
}

interface ThreeColumnProps {
  viewPost?: (event: GestureResponderEvent) => void;
  title?: string;
  post?: Product;
  type?: string;
  imageURL?: string;
  date?: string | number | Date;
  currency?: string;
  theme: ThemeType;
}

const ThreeColumn: React.FC<ThreeColumnProps> = ({
  viewPost,
  title,
  post,
  type,
  imageURL,
  date,
  currency,
  theme: {
    colors: { text },
  },
}) => {
  const isProduct = !type; // thay cho typeof type === 'undefined'

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={css.panelThree}
      onPress={viewPost}
    >
      <ImageCache uri={imageURL} style={css.imagePanelThree} />

      <Text style={[css.nameThree, { color: text }]}>{title}</Text>

      {!isProduct && date ? (
        <Text style={css.timeThree}>
          <TimeAgo time={date} />
        </Text>
      ) : null}

      {isProduct && (
        <ProductPrice currency={currency} product={post} hideDisCount />
      )}

      {isProduct && post ? (
        <WishListIcon
          product={post}
          style={I18nManager.isRTL ? { left: 10 } : { right: 20 }}
        />
      ) : null}

      {isProduct && post?.average_rating ? (
        <Rating rating={post.average_rating} />
      ) : null}
    </TouchableOpacity>
  );
};

export default withTheme(ThreeColumn);
