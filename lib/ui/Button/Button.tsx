/** @format */

import { Color } from "@/lib/common";
import React from "react";
import {
  ActivityIndicator,
  I18nManager,
  Image,
  ImageSourcePropType,
  ImageStyle,
  ImageURISource,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type ButtonType = "default" | "border" | "image" | "text" | "tab";

export interface ButtonProps {
  type?: ButtonType;
  text?: string;
  onPress?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  inactive?: boolean;

  icon?: ImageSourcePropType;
  defaultSource?: number | ImageURISource;

  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  buttonView?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;

  color?: string;

  // special cases
  selected?: boolean;
  selectedStyle?: StyleProp<TextStyle>;
  isAddWishList?: boolean;
  isAddToCart?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
  switch (props.type) {
    case "border":
    case "text":
    case "default":
      return <BaseButton {...props} />;
    case "image":
      return <ImageButton {...props} />;
    case "tab":
      return <TabButton {...props} />;
    default:
      return <BaseButton {...props} />;
  }
};

export default React.memo(Button);

//
// 🔥 Base Button (reuse cho 80% case)
//
const BaseButton: React.FC<ButtonProps> = ({
  onPress,
  disabled,
  isLoading,
  inactive,
  icon,
  defaultSource,
  text,
  style,
  textStyle,
  buttonView,
  color,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled || isLoading}
      onPress={onPress}
      activeOpacity={0.9}
      style={[styles.button, style, inactive && { backgroundColor: "#C6D8E4" }]}
    >
      <View style={[styles.buttonView, buttonView]}>
        {icon && (
          <Image
            source={icon}
            defaultSource={defaultSource}
            style={[
              styles.imageIcon,
              { tintColor: color },
              I18nManager.isRTL && { transform: [{ rotate: "180deg" }] },
            ]}
          />
        )}

        {!!text && <Text style={[styles.text, textStyle]}>{text}</Text>}

        {isLoading && <ActivityIndicator style={styles.loading} color="#FFF" />}
      </View>
    </TouchableOpacity>
  );
};

//
// 🔥 Image Button
//
const ImageButton: React.FC<ButtonProps> = ({
  onPress,
  disabled,
  defaultSource,
  imageStyle,
  isAddWishList,
  isAddToCart,
  buttonStyle,
  icon,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.8}
      style={buttonStyle}
    >
      <Image
        source={icon}
        defaultSource={defaultSource}
        resizeMode="contain"
        style={[
          imageStyle,
          isAddWishList && { tintColor: Color.heartActiveWishList },
          isAddToCart && { tintColor: Color.product.TabActive },
        ]}
      />
    </TouchableOpacity>
  );
};

//
// 🔥 Tab Button
//
const TabButton: React.FC<ButtonProps> = ({
  onPress,
  selected,
  buttonStyle,
  text,
  textStyle,
  selectedStyle,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View
        style={[styles.tabButton, buttonStyle, selected && styles.tabActive]}
      >
        <Text
          style={[
            styles.tabButtonText,
            textStyle,
            selected && styles.tabActiveText,
            selected && selectedStyle,
          ]}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

//
// styles
//
const styles = StyleSheet.create({
  tabActiveText: {
    color: Color.product.TabActiveText,
  },
  tabActive: {
    marginTop: 1,
    borderBottomWidth: 2,
    borderBottomColor: Color.product.TabActive,
  },
  button: {
    backgroundColor: "#0B4A7D",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  imageIcon: {
    resizeMode: "contain",
    width: 20,
    marginRight: 8,
  },
  text: {
    color: "white",
    fontSize: 17,
    marginTop: 3,
  },
  tabButton: {
    height: 50,
    justifyContent: "center",
  },
  tabButtonText: {
    marginHorizontal: 10,
    textAlign: "center",
    fontSize: 12,
  },
  loading: {
    marginLeft: 5,
  },
});
