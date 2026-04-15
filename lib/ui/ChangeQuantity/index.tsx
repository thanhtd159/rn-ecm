/** @format */

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Color, Constants } from "@lib/common";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

export interface ChangeQuantityProps {
  /** Initial quantity value */
  quantity?: number;
  /** Callback when quantity changes; receives the new quantity */
  onChangeQuantity?: (qty: number) => void;
  /** Additional container style */
  style?: ViewStyle;
}

const ChangeQuantity: React.FC<ChangeQuantityProps> = ({
  quantity: quantityProp = 1,
  onChangeQuantity = () => {},
  style,
}) => {
  const [quantity, setQuantity] = useState(quantityProp);

  useEffect(() => {
    if (quantityProp !== undefined) {
      setQuantity(quantityProp);
    }
  }, [quantityProp]);

  const increase = () => {
    if (quantity < Constants.LimitAddToCart) {
      const newQuantity = quantity + 1;
      onChangeQuantity(newQuantity);
      setQuantity(newQuantity);
    }
  };

  const reduced = () => {
    if (quantity > 1) {
      onChangeQuantity(quantity - 1);
      setQuantity(quantity - 1);
    }
  };

  const hitSlop = { top: 20, right: 10, bottom: 20, left: 10 };
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.btnUp}
        hitSlop={hitSlop}
        onPress={increase}
      >
        <FontAwesome name="sort-up" size={20} color="#b7c4cb" />
      </TouchableOpacity>
      <Text style={styles.text}>{quantity}</Text>
      <TouchableOpacity
        style={styles.btnDown}
        hitSlop={hitSlop}
        onPress={reduced}
      >
        <FontAwesome name="sort-down" size={20} color="#b7c4cb" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 30,
    backgroundColor: "#f7f8fa",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d4dce1",
    borderRadius: 15,
  },
  text: {
    fontSize: 18,
    fontFamily: Constants.fontFamily,
    color: Color.blackTextPrimary,
  },
  btnUp: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  btnDown: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChangeQuantity;
