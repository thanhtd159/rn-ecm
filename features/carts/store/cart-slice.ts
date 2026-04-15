/** @format */

import { Constants, Languages, Tools } from "@lib/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import Validate from "../utils/Validate";
import Validate from "@/lib/utils/Validate";
import { CartItem, CartState } from "./cart-type";

const initialState: CartState = {
  cartItems: [],
  total: 0,
  totalPrice: 0,
  myOrders: [],
  isFetching: false,
};

const getPrice = (product: any, variation?: any) => {
  return Number(
    variation?.price
      ? Tools.getPriceIncludedTaxAmount(variation, null, true)
      : Tools.getPriceIncludedTaxAmount(product, null, true),
  );
};

const isSameItem = (a: CartItem, b: CartItem) => {
  if (b.variation) {
    return a.product.id === b.product.id && a.variation?.id === b.variation.id;
  }
  return a.product.id === b.product.id;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ===== CART =====
    addCartItem(
      state,
      action: PayloadAction<{ product: any; variation?: any }>,
    ) {
      const { product, variation } = action.payload;

      const existing = state.cartItems.find((item) =>
        isSameItem(item, { product, variation, quantity: 1 }),
      );

      const price = getPrice(product, variation);

      if (existing) {
        if (existing.quantity < Constants.LimitAddToCart) {
          existing.quantity += 1;
        }
      } else {
        state.cartItems.push({ product, variation, quantity: 1 });
      }

      state.total += 1;
      state.totalPrice += price;
    },

    removeCartItem(
      state,
      action: PayloadAction<{ product: any; variation?: any }>,
    ) {
      const index = state.cartItems.findIndex((item) =>
        isSameItem(item, { ...action.payload, quantity: 1 }),
      );

      if (index === -1) return;

      const item = state.cartItems[index];
      const price = getPrice(item.product, item.variation);

      if (item.quantity === 1) {
        state.cartItems.splice(index, 1);
      } else {
        item.quantity -= 1;
      }

      state.total -= 1;
      state.totalPrice -= price;
    },

    deleteCartItem(
      state,
      action: PayloadAction<{
        product: any;
        variation?: any;
        quantity: number;
      }>,
    ) {
      const index = state.cartItems.findIndex((item) =>
        isSameItem(item, { ...action.payload, quantity: 1 }),
      );

      if (index === -1) return;

      const item = state.cartItems[index];
      const price = getPrice(item.product, item.variation);

      state.total -= item.quantity;
      state.totalPrice -= item.quantity * price;

      state.cartItems.splice(index, 1);
    },

    emptyCart(state) {
      state.cartItems = [];
      state.total = 0;
      state.totalPrice = 0;
    },

    // ===== VALIDATION =====
    validateCustomerInfo(state, action: PayloadAction<any>) {
      const { first_name, last_name, address_1, email, phone } = action.payload;

      if (!first_name || !last_name || !address_1 || !email || !phone) {
        state.message = Languages.RequireEnterAllFileds;
        return;
      }

      if (!Validate.isEmail(email)) {
        state.message = Languages.InvalidEmail;
        return;
      }

      state.customerInfo = action.payload;
      state.message = null;
    },

    // ===== API RESULT =====
    fetchPending(state) {
      state.isFetching = true;
      state.error = null;
    },

    fetchFailure(state, action: PayloadAction<string>) {
      state.isFetching = false;
      state.error = action.payload;
    },

    setOrders(state, action: PayloadAction<any[]>) {
      state.isFetching = false;
      state.myOrders = action.payload;
    },

    setShipping(state, action: PayloadAction<any[]>) {
      state.isFetching = false;
      state.shippings = action.payload;
    },

    setShippingMethod(state, action: PayloadAction<any>) {
      state.shippingMethod = action.payload;
    },

    setOrderNotes(state, action: PayloadAction<any[]>) {
      state.isFetching = false;
      state.orderNotes = action.payload;
    },

    createOrderSuccess(state) {
      state.isFetching = false;
      state.cartItems = [];
      state.total = 0;
      state.totalPrice = 0;
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
