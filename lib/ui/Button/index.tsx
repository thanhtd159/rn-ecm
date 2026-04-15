/** @format */

import { Color } from "@/lib/common";
import { Icon } from "@/lib/Omni";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

export interface UIButtonProps {
  text?: string;
  /** Icon name (passed to Icon component) */
  icon?: string;
  onPress?: () => void;
  /** Extra style applied to outer container */
  button?: ViewStyle;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  containerColor?: string;
  textColor?: string;
  loading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<UIButtonProps> = ({
  text = "Button",
  icon,
  onPress = () => "Button pressed!",
  button,
  containerStyle = {},
  textStyle = {},
  containerColor = Color.primary,
  textColor = "white",
  loading,
  disabled,
}) => (
  <TouchableOpacity
    style={[
      styles.container,
      button,
      { backgroundColor: containerColor },
      containerStyle,
    ]}
    onPress={() => {
      if (disabled || loading) {
        return;
      }
      onPress();
    }}
  >
    {!loading ? (
      <>
        {icon ? (
          <Icon name={icon} color={textColor} size={24} style={styles.icon} />
        ) : (
          <View />
        )}
        <Text style={[styles.text, { color: textColor }, textStyle]}>
          {text}
        </Text>
      </>
    ) : (
      <ActivityIndicator color={textColor} />
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 44,
    padding: 10,
    flexDirection: "row",
  },
  text: {
    fontWeight: "bold",
  },
  icon: {
    marginRight: 10,
  },
});

export default Button;
