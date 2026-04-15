/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Payment, PaymentState } from "./payment-type";

const initialState: PaymentState = {
  list: [],
  isFetching: false,
  finish: false,
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    fetchPaymentsStart: (state) => {
      state.isFetching = true;
      state.finish = false;
    },

    fetchPaymentsSuccess: (state, action: PayloadAction<Payment[]>) => {
      state.list = action.payload.filter((p) => p.enabled);
      state.isFetching = false;
      state.finish = true;
    },

    fetchPaymentsFailure: (state) => {
      state.isFetching = false;
      state.finish = true;
    },
  },
});

export const {
  fetchPaymentsStart,
  fetchPaymentsSuccess,
  fetchPaymentsFailure,
} = paymentSlice.actions;

export default paymentSlice.reducer;
