/** @format */

import { Category, CategoryActionTypes, DisplayMode } from "./category-type";

export const fetchCategoriesRequest = () => ({
  type: CategoryActionTypes.FETCH_CATEGORIES_REQUEST,
});

export const fetchCategoriesSuccess = (items: Category[]) => ({
  type: CategoryActionTypes.FETCH_CATEGORIES_SUCCESS,
  payload: items,
});

export const fetchCategoriesFailure = (error: string) => ({
  type: CategoryActionTypes.FETCH_CATEGORIES_FAILURE,
  payload: error,
});

export const switchDisplayMode = (mode: DisplayMode) => ({
  type: CategoryActionTypes.SWITCH_DISPLAY_MODE,
  payload: mode,
});

export const setSelectedCategory = (category: Category) => ({
  type: CategoryActionTypes.SET_SELECTED_CATEGORY,
  payload: category,
});

export const setSelectedLayout = (value: string | boolean) => ({
  type: CategoryActionTypes.SET_SELECTED_LAYOUT,
  payload: value,
});
