/** @format */

import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";

import { Constants, Languages, withTheme } from "@/lib/common";
import { useAppSelector } from "@/lib/store/useRedux";
import PostLayout from "../PostLayout";
import styles from "./styles";

interface ThemeType {
  colors: {
    background: string;
    text: string;
  };
}

interface Product {
  id: string | number;
  [key: string]: any;
}

export interface ProductRelatedProps {
  product?: Product;
  fetchProductRelated?: (product?: Product) => void;
  onViewProductScreen?: (data: { product: Product }) => void;
  theme: ThemeType;
}

const ProductRelated: React.FC<ProductRelatedProps> = ({
  product,
  fetchProductRelated,
  onViewProductScreen,
  theme: {
    colors: { background, text },
  },
}) => {
  const productRelated = useAppSelector((state) =>
    state.products.listAll.filter((p: Product) => p.id !== product?.id),
  );

  const currency = useAppSelector((state) => state.settings.currency);

  useEffect(() => {
    if (fetchProductRelated) {
      fetchProductRelated(product);
    }
  }, [fetchProductRelated, product]);

  if (!productRelated || productRelated.length === 0) {
    return null;
  }

  return (
    <View style={[styles.wrap, { backgroundColor: background }]}>
      <View style={styles.head}>
        <Text style={[styles.headTitle, { color: text }]}>
          {Languages.ProductRelated}
        </Text>
      </View>

      <View style={styles.flatlist}>
        <FlatList
          horizontal
          overScrollMode="never"
          data={productRelated}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PostLayout
              post={item}
              onViewPost={() => onViewProductScreen?.({ product: item })}
              layout={Constants.Layout.threeColumn}
              currency={currency}
            />
          )}
        />
      </View>
    </View>
  );
};

export default withTheme(React.memo(ProductRelated));
