/** @format */

export enum ProductActionTypes {
  FETCH_PRODUCTS_REQUEST = "product/FETCH_PRODUCTS_REQUEST",
  FETCH_PRODUCTS_BY_NAME_REQUEST = "product/FETCH_PRODUCTS_BY_NAME_REQUEST",
  FETCH_PRODUCTS_BY_TAG_REQUEST = "product/FETCH_PRODUCTS_BY_TAG_REQUEST",
  FETCH_ALL_PRODUCTS_REQUEST = "product/FETCH_ALL_PRODUCTS_REQUEST",
  FETCH_STICKY_PRODUCTS_REQUEST = "product/FETCH_STICKY_PRODUCTS_REQUEST",
  FETCH_VARIANT_REQUEST = "product/FETCH_VARIANT_REQUEST",
  FETCH_RELATED_REQUEST = "product/FETCH_RELATED_REQUEST",
  FETCH_REVIEWS_REQUEST = "product/FETCH_REVIEWS_REQUEST",
  GET_COUPON_REQUEST = "product/GET_COUPON_REQUEST",

  CLEAR_PRODUCTS = "product/CLEAR_PRODUCTS",
  INIT_PRODUCTS = "product/INIT_PRODUCTS",
  SWITCH_LAYOUT_HOME = "product/SWITCH_LAYOUT_HOME",
  SAVE_SEARCH_HISTORY = "product/SAVE_SEARCH_HISTORY",
  CLEAR_SEARCH_HISTORY = "product/CLEAR_SEARCH_HISTORY",
}

export interface ProductState {
  isFetching: boolean;
  error: string | null;

  list: any[];
  listAll: any[];
  page: number;
  stillFetch: boolean;

  productsByName: any[];
  productSticky: any[];
  productVariations: any;
  productRelated: any[];

  reviews?: any[];
  coupon?: {
    amount: number;
    code: string;
    type?: string;
    id?: number;
  };

  layoutHome: string;
  histories: string[];

  isSearchMore?: boolean;
  currentSearchPage?: number;
}

// product.types.ts

export interface ProductImage {
  id?: number;
  src: string;
}

export interface ProductAttribute {
  id?: number;
  name: string;
  options: string[];
}

export interface ProductVariationAttribute {
  id?: number;
  name: string;
  option: string;
}

export interface ProductVariation {
  id: number;
  price: string;
  regular_price: string;
  sale_price?: string;
  on_sale?: boolean;
  attributes: ProductVariationAttribute[];
}

export interface ItemProduct {
  id: number;
  name: string;
  description: string;

  price: string;
  regular_price: string;
  sale_price?: string;
  on_sale: boolean;

  average_rating: string;
  rating_count: number;

  images: ProductImage[];

  attributes: ProductAttribute[];
  variations: ProductVariation[];
  default_attributes: ProductVariationAttribute[];
}
