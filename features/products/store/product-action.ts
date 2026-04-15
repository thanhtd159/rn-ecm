/** @format */

import { ProductActionTypes } from "./product-type";

export const fetchProductsRequest = (payload: any) => ({
  type: ProductActionTypes.FETCH_PRODUCTS_REQUEST,
  payload,
});

export const fetchProductsByNameRequest = (payload: any) => ({
  type: ProductActionTypes.FETCH_PRODUCTS_BY_NAME_REQUEST,
  payload,
});

export const fetchAllProductsRequest = (payload: any) => ({
  type: ProductActionTypes.FETCH_ALL_PRODUCTS_REQUEST,
  payload,
});

export const fetchStickyProductsRequest = (payload?: any) => ({
  type: ProductActionTypes.FETCH_STICKY_PRODUCTS_REQUEST,
  payload,
});

export const getCouponRequest = (payload: any) => ({
  type: ProductActionTypes.GET_COUPON_REQUEST,
  payload,
});

export const clearProducts = () => ({
  type: ProductActionTypes.CLEAR_PRODUCTS,
});

export const initProducts = () => ({
  type: ProductActionTypes.INIT_PRODUCTS,
});
