/** @format */

import { Color, Styles } from "@lib/common";
import React from "react";
import { I18nManager, StyleSheet, Text } from "react-native";

export interface StandardTextProps {
  children?: React.ReactNode;
  style?: object;
  numberOfLines?: number;
  allowFontScaling?: boolean;
  ellipsizeMode?: "head" | "middle" | "tail" | "clip";
}

const StandardText: React.FC<StandardTextProps> = (props) => (
  <Text
    style={[styles.standardText, props.style]}
    ellipsizeMode={I18nManager.isRTL ? "head" : "tail"}
    numberOfLines={props.numberOfLines || 1}
    allowFontScaling={props.allowFontScaling || false}
    {...props}
  >
    {props.children}
  </Text>
);

const styles = StyleSheet.create({
  standardText: {
    fontWeight: "600",
    color: Color.blackTextPrimary,
    backgroundColor: "transparent",
    fontSize: Styles.FontSize.big,
    textAlign: "left",
    width: null,
  },
});

export default StandardText;
