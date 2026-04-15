/** @format */

export enum CartActionTypes {
  FETCH_MY_ORDER_REQUEST = "cart/FETCH_MY_ORDER_REQUEST",
  CREATE_ORDER_REQUEST = "cart/CREATE_ORDER_REQUEST",
  GET_SHIPPING_REQUEST = "cart/GET_SHIPPING_REQUEST",
  GET_ORDER_NOTES_REQUEST = "cart/GET_ORDER_NOTES_REQUEST",
}

export interface CartItem {
  product: any;
  variation?: any;
  quantity: number;
}

export interface CartState {
  cartItems: CartItem[];
  total: number;
  totalPrice: number;

  myOrders: any[];
  shippings?: any[];
  shippingMethod?: any;
  orderNotes?: any[];

  isFetching: boolean;
  error?: string | null;
  message?: string | null;

  customerInfo?: any;
}
