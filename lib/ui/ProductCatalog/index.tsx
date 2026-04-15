/** @format */

import React, { memo, useCallback, useState } from "react";
import { Text, View } from "react-native";

import { Languages, withTheme } from "@/lib/common";
import Item from "../ChipItem";
import styles from "./style";

/** Types */
export interface CatalogCategory {
  id: number | string;
  name: string;
}

export interface Theme {
  colors: {
    text: string;
  };
}

export interface ProductCatalogProps {
  categories?: CatalogCategory[];
  onSelectCategory?: (category: CatalogCategory) => void;
  theme?: Theme;
}

/** Component */
const ProductCatalog: React.FC<ProductCatalogProps> = ({
  categories = [],
  onSelectCategory,
  theme,
}) => {
  const [selectedId, setSelectedId] = useState<CatalogCategory["id"] | null>(
    null,
  );

  const textColor = theme?.colors?.text ?? "#000";

  const handlePress = useCallback(
    (item: CatalogCategory) => {
      setSelectedId(item.id);
      onSelectCategory?.(item);
    },
    [onSelectCategory],
  );

  return (
    <View>
      <View style={styles.header}>
        <Text style={[styles.text, { color: textColor }]}>
          {Languages.ProductCatalog}
        </Text>
      </View>

      <View style={styles.container}>
        {categories.map((item) => (
          <Item
            key={item.id} // ✅ tránh dùng index
            item={item}
            label={item.name}
            onPress={handlePress}
            selected={selectedId === item.id}
          />
        ))}
      </View>
    </View>
  );
};

/** Optimize re-render */
export default withTheme(memo(ProductCatalog));
