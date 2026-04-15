/** @format */

import React from "react";
import { ActivityIndicator, View, ViewStyle } from "react-native";

import Color from "@/lib/common/Color";

import styles from "./styles";

export interface SpinkitProps {
  /** Optional extra style applied to the container */
  css?: ViewStyle;
}

const Spinkit: React.FC<SpinkitProps> = ({ css }) => (
  <View style={[styles.spinner, typeof css !== "undefined" ? css : null]}>
    <ActivityIndicator color={Color.spin} />
  </View>
);

export default Spinkit;
