/** @format */

import { withTheme } from "@/lib/common";
// import { ImageCache, ProductPrice, WishListIcon } from "@components";
import React from "react";
import {
  GestureResponderEvent,
  I18nManager,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import ImageCache from "../ImageCache";
import ProductPrice from "../ProductPrice";
import WishListIcon from "../WishListIcon";
import css from "./style";

interface ThemeType {
  colors: {
    background: string;
    text: string;
    lineColor: string;
  };
}

interface SimpleLayoutProps {
  imageURL?: string;
  post?: any;
  type?: string;
  title?: string;
  description?: string;
  category?: string;
  currency?: string;
  viewPost?: (event: GestureResponderEvent) => void;
  viewCategory?: (event: GestureResponderEvent) => void;
  theme: ThemeType;
}

const SimpleLayout: React.FC<SimpleLayoutProps> = ({
  imageURL,
  post,
  type,
  title,
  description,
  viewPost,
  category,
  viewCategory,
  currency,
  theme: {
    colors: { background, text, lineColor },
  },
}) => {
  const price: StyleProp<ViewStyle> = {
    alignItems: "flex-start",
    marginLeft: 5,
  };

  const priceRTL: StyleProp<ViewStyle> = {
    alignItems: "flex-end",
    marginRight: 5,
  };

  const isRTL = I18nManager.isRTL;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        css.panelList,
        isRTL && { flexDirection: "row-reverse" },
        { backgroundColor: background, borderColor: lineColor },
      ]}
      onPress={viewPost}
    >
      <View style={css.simpleContent}>
        <Text style={[css.simpleTitle, { color: text }]}>{title}</Text>

        {description ? <Text style={css.simpleDesc}>{description}</Text> : null}

        <View>
          {typeof type === "undefined" && (
            <ProductPrice
              currency={currency}
              product={post}
              style={isRTL ? priceRTL : price}
              hideDisCount
            />
          )}

          {category ? (
            <TouchableOpacity onPress={viewCategory}>
              <Text style={css.category}>- {category}</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <ImageCache uri={imageURL} style={css.simpleImage} />

      {typeof type === "undefined" && (
        <WishListIcon product={post} style={{ top: 15 }} />
      )}
    </TouchableOpacity>
  );
};

export default withTheme(SimpleLayout);
