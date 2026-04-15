/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, WishListItem, WishListState } from "./wishlist-type";

const initialState: WishListState = {
  wishListItems: [],
  total: 0,
  totalPrice: 0,
};

const isSameProduct = (a: WishListItem, b: Product) => {
  return a.product.id === b.id;
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addWishListItem: (state, action: PayloadAction<Product | any>) => {
      const exists = state.wishListItems.some((item) =>
        isSameProduct(item, action.payload),
      );

      if (!exists) {
        state.wishListItems.push({ product: action.payload });
        state.total += 1;
      }
    },

    removeWishListItem: (state, action: PayloadAction<Product>) => {
      const before = state.wishListItems.length;

      state.wishListItems = state.wishListItems.filter(
        (item) => !isSameProduct(item, action.payload),
      );

      const after = state.wishListItems.length;
      state.total -= before - after;
    },

    emptyWishList: (state) => {
      state.wishListItems = [];
      state.total = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addWishListItem, removeWishListItem, emptyWishList } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
