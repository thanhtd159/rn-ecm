/** @format */

import { Constants, Tools, withTheme } from "@/lib/common";
// import { ImageCache, ProductPrice, Rating, WishListIcon } from "@components";
import React from "react";
import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ImageCache from "../ImageCache";
import ProductPrice from "../ProductPrice";
import Rating from "../Rating";
import WishListIcon from "../WishListIcon";
import css from "./style";

interface ThemeType {
  colors: {
    background: string;
    text: string;
  };
}

interface Product {
  id: string | number;
  title?: {
    rendered?: string;
  };
  average_rating?: number;
  better_featured_image?: any;
  [key: string]: any;
}

interface TwoColumnProps {
  post?: Product;
  type?: string;
  currency?: string;
  viewPost?: (event: GestureResponderEvent) => void;
  theme: ThemeType;
}

const TwoColumn: React.FC<TwoColumnProps> = ({
  post,
  type,
  viewPost,
  currency,
  theme: {
    colors: { text },
  },
}) => {
  const imageURL = post ? Tools.getImage(post, "medium") : undefined;

  const title = post?.title?.rendered ?? "";

  const isProduct = !type;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={css.smCardNews}
      onPress={viewPost}
    >
      <View style={css.cardView}>
        <ImageCache style={css.smImage} uri={imageURL} />

        <View style={css.smDescription}>
          <Text style={[css.smTitle, { color: text }]}>
            {Tools.getDescription(title)}
          </Text>

          {isProduct && post ? (
            <ProductPrice currency={currency} product={post} hideDisCount />
          ) : null}
        </View>
      </View>

      {isProduct && post ? (
        <WishListIcon
          product={post}
          style={Constants.RTL ? { left: 10 } : { right: 25 }}
        />
      ) : null}

      {isProduct && post?.average_rating ? (
        <Rating rating={post.average_rating} size={5} />
      ) : null}
    </TouchableOpacity>
  );
};

export default withTheme(TwoColumn);
