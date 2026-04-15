/** @format */

import { Color, Images } from "@/lib/common";
// import { Button } from "@components";
// import { useAppDispatch, useAppSelector } from "@redux/hooks";
// import {
//   addWishListItem,
//   removeWishListItem,
// } from "@redux/slices/wishListSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/useRedux";
import {
  addWishListItem,
  removeWishListItem,
} from "@/lib/store/wishlist/wishlist-slice";
import React from "react";
import Button from "../Button/Button";
import styles from "./styles";

export interface WishListIconProps {
  product: { id: string | number; attributes?: any[] };
  style?: object;
}

const getProductAttribute = (product: any, attrName: any) => {
  if (typeof product.attributes === "undefined") return null;
  for (let i = 0; i < product.attributes.length; i++) {
    if (product.attributes[i].name.toLowerCase() === attrName) {
      return product.attributes[i];
    }
  }
  return null;
};

const WishListIcon: React.FC<WishListIconProps> = ({ product, style }) => {
  const dispatch = useAppDispatch();
  const wishList = useAppSelector((state) => state.wishList);
  const AnyButton = Button as any;
  const isInWishList =
    wishList?.wishListItems?.find((item) => item.product.id === product.id) !==
    undefined;

  const handlePress = () => {
    if (isInWishList) {
      dispatch(removeWishListItem({ id: product.id }));
    } else {
      dispatch(addWishListItem({ product }));
    }
  };

  return (
    <AnyButton
      type="image"
      source={Images.IconWishList}
      imageStyle={[
        styles.imageButton,
        isInWishList && { tintColor: (Color as any).heartActiveWishList },
      ]}
      buttonStyle={[styles.buttonStyle, style && style]}
      onPress={handlePress}
    />
  );
};

export default WishListIcon;
