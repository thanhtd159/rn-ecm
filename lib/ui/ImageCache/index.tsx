/** @format */

import React from "react";
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
} from "react-native";

export interface ImageCacheProps {
  uri?: string;
  style?: StyleProp<ImageStyle>;
  defaultSource?: ImageSourcePropType;
}

const ImageCache: React.FC<ImageCacheProps> = ({
  style,
  defaultSource,
  uri,
}) => {
  const source = uri ? { uri } : defaultSource;

  return <Image style={style} source={source} />;
};

export default ImageCache;
