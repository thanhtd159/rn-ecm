/** @format */

import { put, takeLatest } from "redux-saga/effects";
import {
  addWishListItemRequest,
  emptyWishListRequest,
  removeWishListItemRequest,
} from "./wishlist-action";

import {
  addWishListItem,
  emptyWishList,
  removeWishListItem,
} from "./wishlist-slice";

import { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./wishlist-type";

// Worker Sagas
function* handleAddWishList(action: PayloadAction<Product>): Generator {
  // có thể call API ở đây
  yield put(addWishListItem(action.payload));
}

function* handleRemoveWishList(action: PayloadAction<Product>): Generator {
  yield put(removeWishListItem(action.payload));
}

function* handleEmptyWishList(): Generator {
  yield put(emptyWishList());
}

// Watcher Saga
export function* wishlistSaga() {
  yield takeLatest(addWishListItemRequest.type, handleAddWishList);
  yield takeLatest(removeWishListItemRequest.type, handleRemoveWishList);
  yield takeLatest(emptyWishListRequest.type, handleEmptyWishList);
}
