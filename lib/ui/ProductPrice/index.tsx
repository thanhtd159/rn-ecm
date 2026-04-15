/** @format */

import { Color, Tools } from "@/lib/common";
import { Currency } from "@/lib/store/currency/currency-type";
import React from "react";
import { StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";
import styles from "./styles";

interface ThemeType {
  colors: {
    text: string;
  };
}

export interface ProductPrice {
  price?: number | string;
  regular_price?: number | string;
  on_sale?: boolean;
  sale_price?: number | string;
}

export interface ProductPriceProps {
  product?: ProductPrice;
  hideDisCount?: boolean;
  style?: StyleProp<ViewStyle>;
  fontStyle?: StyleProp<TextStyle>;
  currency?: Currency;
  theme: ThemeType;
}

const ProductPrice: React.FC<ProductPriceProps> = ({
  product,
  hideDisCount,
  style,
  fontStyle,
  theme: {
    colors: { text },
  },
  currency,
}) => {
  if (!product) return null;

  const productPrice = Tools.getPriceIncludedTaxAmount(
    product,
    null,
    false,
    currency,
  );

  const regularPrice = Tools.getRegularPrice({
    product,
    currency,
    isSale: true,
  });

  const productPriceSale = product.on_sale
    ? Tools.getCurrencyFormatted(regularPrice, currency)
    : null;

  // ✅ safe number parsing
  const price = Number(product.price);
  const regular = Number(product.regular_price);

  const discount =
    product.on_sale && regular > 0
      ? Math.round((1 - price / regular) * 100)
      : 0;

  return (
    <View style={[styles.price_wrapper, style]}>
      {!!productPrice && (
        <Text
          style={[
            styles.text_list,
            styles.price,
            { color: Color.blackTextSecondary },
            { color: text },
            fontStyle,
          ]}
        >
          {productPrice}
        </Text>
      )}

      {product.on_sale && productPriceSale ? (
        <Text
          style={[
            styles.text_list,
            styles.sale_price,
            { color: text },
            fontStyle,
          ]}
        >
          {productPriceSale}
        </Text>
      ) : null}

      {!hideDisCount && product.on_sale && discount > 0 ? (
        <View style={styles.saleWrap}>
          <Text
            style={[
              styles.text_list,
              styles.sale_off,
              { color: text },
              fontStyle,
            ]}
          >
            -{discount}%
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default ProductPrice;
