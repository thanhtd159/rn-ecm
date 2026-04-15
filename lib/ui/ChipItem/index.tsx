/** @format */

import React from "react";
import { Text, TouchableOpacity } from "react-native";

import { withTheme } from "@/lib/common";
import _styles from "./style";
const styles = _styles as any;

export interface ChipItemProps {
  item: string;
  label?: string;
  onPress: (item: string) => void;
  selected?: boolean;
  theme?: { dark: boolean };
}

const Item: React.FC<ChipItemProps> = ({
  item,
  label = "Restaurants",
  onPress,
  selected,
  theme = { dark: false },
}: ChipItemProps) => {
  const { dark } = theme;
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      style={[styles.container(dark), selected && styles.selected(dark)]}
    >
      <Text style={styles.text(dark)}>{label}</Text>
    </TouchableOpacity>
  );
};

export default withTheme(Item);
