/** @format */

import { CartActionTypes } from "./cart-type";

export const fetchMyOrderRequest = (user: any) => ({
  type: CartActionTypes.FETCH_MY_ORDER_REQUEST,
  payload: user,
});

export const createOrderRequest = (payload: any) => ({
  type: CartActionTypes.CREATE_ORDER_REQUEST,
  payload,
});

export const getShippingRequest = (payload: any) => ({
  type: CartActionTypes.GET_SHIPPING_REQUEST,
  payload,
});

export const getOrderNotesRequest = (orderId: number) => ({
  type: CartActionTypes.GET_ORDER_NOTES_REQUEST,
  payload: orderId,
});
