/** @format */

import { Color, Icons, Styles } from "@/lib/common";
import { Icon } from "@/lib/Omni";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

export interface RatingProps {
  /** Numeric rating value (0–5) */
  rating?: number | string;
  /** Icon size in dp */
  size?: number;
  /** Filled star color */
  color?: string;
  /** Additional container style */
  style?: StyleProp<ViewStyle>;
}

const Rating: React.FC<RatingProps> = ({
  rating = 5,
  size = Styles.IconSize.SmallRating,
  color = Color.accent,
  style,
}) => {
  const formatRating = Number(rating) || 0;

  if (formatRating <= 0) return null;

  const stars = Array.from({ length: 5 }, (_, index) => {
    const starIndex = index + 1;

    return (
      <Icon
        key={starIndex}
        name={Icons.MaterialCommunityIcons.Star}
        size={size}
        color={formatRating >= starIndex ? color : Color.blackDivide}
      />
    );
  });

  return <View style={[styles.container, style]}>{stars}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default React.memo(Rating);
