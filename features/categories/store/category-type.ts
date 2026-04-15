/** @format */

export enum CategoryActionTypes {
  FETCH_CATEGORIES_REQUEST = "category/FETCH_CATEGORIES_REQUEST",
  FETCH_CATEGORIES_SUCCESS = "category/FETCH_CATEGORIES_SUCCESS",
  FETCH_CATEGORIES_FAILURE = "category/FETCH_CATEGORIES_FAILURE",

  SWITCH_DISPLAY_MODE = "category/SWITCH_DISPLAY_MODE",
  SET_SELECTED_CATEGORY = "category/SET_SELECTED_CATEGORY",
  SET_SELECTED_LAYOUT = "category/SET_SELECTED_LAYOUT",
}

export enum DisplayMode {
  ListMode = "ListMode",
  GridMode = "GridMode",
  CardMode = "CardMode",
}

// model (có thể customize thêm)
export interface Category {
  id: number;
  name: string;
  slug?: string;
  parent?: number;
}

export interface CategoryState {
  isFetching: boolean;
  error: string | null;
  displayMode: DisplayMode;
  list: Category[];
  selectedCategory: Category | null;
  selectedLayout: string | boolean;
}
