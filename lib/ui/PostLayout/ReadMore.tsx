/** @format */

import { Images } from "@/lib/common";
import React from "react";
import {
  GestureResponderEvent,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TimeAgo from "react-native-timeago";
import css from "./style";

interface ReadMoreLayoutProps {
  imageURL?: string;
  title?: string;
  description?: string;
  date?: string | number | Date;
  category?: string;
  viewPost?: (event: GestureResponderEvent) => void;
  viewCategory?: (event: GestureResponderEvent) => void;
}

const ReadMoreLayout: React.FC<ReadMoreLayoutProps> = ({
  imageURL,
  title,
  description,
  date,
  viewPost,
  category,
  viewCategory,
}) => {
  return (
    <View style={css.panelList}>
      <TouchableOpacity onPress={viewPost}>
        <Image
          defaultSource={Images.PlaceHolder}
          source={imageURL ? { uri: imageURL } : Images.PlaceHolder}
          style={css.imageList}
        />
      </TouchableOpacity>

      <TouchableOpacity style={css.titleList} onPress={viewPost}>
        <Text style={css.nameList}>{title}</Text>

        {description ? (
          <Text style={css.descriptionList}>{description}</Text>
        ) : null}

        <View style={{ flexDirection: "row" }}>
          {date ? <TimeAgo style={css.timeList} time={date} hideAgo /> : null}

          {category ? (
            <TouchableOpacity onPress={viewCategory}>
              <Text style={css.category}>- {category}</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ReadMoreLayout;
