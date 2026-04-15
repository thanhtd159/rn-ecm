/** @format */

import { createAction } from "@reduxjs/toolkit";
import { Product } from "./wishlist-type";

// trigger saga
export const addWishListItemRequest = createAction<Product>(
  "wishlist/addWishListItemRequest",
);

export const removeWishListItemRequest = createAction<Product>(
  "wishlist/removeWishListItemRequest",
);

export const emptyWishListRequest = createAction(
  "wishlist/emptyWishListRequest",
);
