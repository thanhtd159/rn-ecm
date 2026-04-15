/** @format */

import { RootState } from "@/lib/store/store";
import { createSelector } from "@reduxjs/toolkit";

// language
export const selectCategories = (state: RootState) => state.categories;

export const selectedCategory = createSelector(
  selectCategories,
  (categories) => categories.selectedCategory,
);

export const selectedListCategory = createSelector(
  selectCategories,
  (categories) => categories.list,
);
export const selectedLayoutCategory = createSelector(
  selectCategories,
  (categories) => categories.selectedLayout,
);
