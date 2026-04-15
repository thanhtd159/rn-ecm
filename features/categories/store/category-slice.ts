/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, CategoryState, DisplayMode } from "./category-type";

const initialState: CategoryState = {
  isFetching: false,
  error: null,
  displayMode: DisplayMode.GridMode,
  list: [],
  selectedCategory: null,
  // selectedLayout: Config.CategoryListView ? "list" : "grid",
  selectedLayout: "grid",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    fetchCategoriesPending(state) {
      state.isFetching = true;
      state.error = null;
    },
    fetchCategoriesSuccess(state, action: PayloadAction<Category[]>) {
      state.isFetching = false;
      state.list = action.payload || [];
      state.error = null;
    },
    fetchCategoriesFailure(state, action: PayloadAction<string>) {
      state.isFetching = false;
      state.list = [];
      state.error = action.payload;
    },
    switchDisplayMode(state, action: PayloadAction<DisplayMode>) {
      state.displayMode = action.payload;
    },
    setSelectedCategory(state, action: PayloadAction<Category>) {
      state.selectedCategory = action.payload;
    },
    setSelectedLayout(state, action: PayloadAction<string | boolean>) {
      state.selectedLayout = action.payload || false;
    },
  },
});

export const categoryReducer = categorySlice.reducer;
export const categoryActions = categorySlice.actions;
