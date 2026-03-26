import type { ImageProps } from "expo-image";
import { Image as ExpoImage } from "expo-image";
import * as React from "react";

export type ImgProps = ImageProps & {
  // bỏ className vì không còn dùng
};

export function Image({
  style,
  placeholder = "L6PZfSi_.AyE_3t7t7R**0o#DgR4",
  ...props
}: ImgProps) {
  return (
    <ExpoImage
      style={style}
      placeholder={placeholder}
      contentFit="cover" // optional: default hay dùng
      {...props}
    />
  );
}

export function preloadImages(sources: string[]) {
  return ExpoImage.prefetch(sources);
}
