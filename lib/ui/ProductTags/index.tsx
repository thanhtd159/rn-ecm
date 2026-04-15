/** @format */

import React, { useCallback, useState } from "react";
import { Text, View } from "react-native";

import { Languages, withTheme } from "@/lib/common";
import Item from "../ChipItem";
import styles from "./style";

export interface ProductTag {
  id: number | string;
  name: string;
}

export interface ProductTagsProps {
  tags?: ProductTag[];
  onSelectTag?: (tag: ProductTag) => void;
  theme?: { colors?: { text?: string } };
}

const ProductTags: React.FC<ProductTagsProps> = ({
  tags = [],
  onSelectTag,
  theme,
}) => {
  const text = theme?.colors?.text ?? "#000";

  const [selectedId, setSelectedId] = useState<number | string | null>(null);

  const onPress = useCallback(
    (item: ProductTag) => {
      setSelectedId(item.id);
      onSelectTag?.(item); // ✅ fix undefined function
    },
    [onSelectTag],
  );

  return (
    <View>
      <View style={styles.header}>
        <Text style={[styles.text, { color: text }]}>
          {Languages.ProductTags}
        </Text>
      </View>

      <View style={styles.container}>
        {tags.map((item) => (
          <Item
            key={item.id} // ✅ không dùng index
            item={item}
            label={item.name}
            onPress={onPress}
            selected={selectedId === item.id}
          />
        ))}
      </View>
    </View>
  );
};

export default withTheme(ProductTags);
