/** @format */

import React from "react";
import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";
import TimeAgo from "react-native-timeago";
import ImageCache from "../ImageCache";
import css from "./style";

interface DefaultLayoutProps {
  imageURL?: string;
  title?: string;
  date?: string | number | Date;
  viewPost?: (event: GestureResponderEvent) => void;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  imageURL,
  title,
  date,
  viewPost,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.9} style={css.panel} onPress={viewPost}>
      <ImageCache uri={imageURL} style={css.imagePanel} />

      <Text style={css.name}>{title}</Text>

      <Text style={[css.time, { textAlign: "center" }]}>
        {date ? <TimeAgo time={date} hideAgo /> : null}
      </Text>
    </TouchableOpacity>
  );
};

export default DefaultLayout;
