/** @format */

import { Constants } from "@lib/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductState } from "./product-type";

const initialState: ProductState = {
  isFetching: false,
  error: null,
  list: [],
  listAll: [],
  stillFetch: true,
  page: 1,

  layoutHome: Constants.Layout.horizon,

  productsByName: [],
  productSticky: [],
  productVariations: null,
  productRelated: [],
  histories: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchPending(state) {
      state.isFetching = true;
      state.error = null;
    },

    fetchFailure(state, action: PayloadAction<string>) {
      state.isFetching = false;
      state.error = action.payload;
    },

    fetchProductsSuccess(state, action: PayloadAction<any[]>) {
      state.isFetching = false;
      state.list = state.list.concat(action.payload);
      state.stillFetch = action.payload.length !== 0;
    },

    fetchAllSuccess(
      state,
      action: PayloadAction<{ items: any[]; page: number }>,
    ) {
      state.isFetching = false;
      state.listAll =
        action.payload.page > 1
          ? state.listAll.concat(action.payload.items)
          : action.payload.items;

      state.page = action.payload.page;
      state.stillFetch = action.payload.items.length !== 0;
    },

    fetchByNameSuccess(
      state,
      action: PayloadAction<{
        items: any[];
        page: number;
        isMore: boolean;
      }>,
    ) {
      const { items, page, isMore } = action.payload;

      state.isFetching = false;
      state.productsByName =
        page === 1 ? items : state.productsByName.concat(items);

      state.isSearchMore = isMore;
      state.currentSearchPage = page;
    },

    fetchStickySuccess(state, action: PayloadAction<any[]>) {
      state.isFetching = false;
      state.productSticky = action.payload;
    },

    fetchVariantSuccess(state, action: PayloadAction<any>) {
      state.isFetching = false;
      state.productVariations = action.payload;
    },

    fetchRelatedSuccess(state, action: PayloadAction<any[]>) {
      state.isFetching = false;
      state.productRelated = action.payload;
    },

    fetchReviewsSuccess(state, action: PayloadAction<any[]>) {
      state.isFetching = false;
      state.reviews = action.payload;
    },

    setCoupon(state, action: PayloadAction<any>) {
      state.isFetching = false;
      state.coupon = action.payload;
    },

    clearCoupon(state) {
      state.coupon = { amount: 0, code: "" };
    },

    switchLayout(state, action: PayloadAction<string>) {
      state.layoutHome = action.payload;
    },

    saveSearchHistory(state, action: PayloadAction<string>) {
      if (!state.histories.includes(action.payload)) {
        state.histories.unshift(action.payload);
      }
      if (state.histories.length > 10) {
        state.histories.pop();
      }
    },

    clearSearchHistory(state) {
      state.histories = [];
    },

    clearProducts(state) {
      state.list = [];
      state.listAll = [];
      state.productsByName = [];
    },
  },
});

export const productReducer = productSlice.reducer;
export const productActions = productSlice.actions;
