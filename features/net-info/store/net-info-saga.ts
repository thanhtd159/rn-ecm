/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NetInfoState } from "./net-info-type";

const initialState: NetInfoState = {
  isConnected: true,
};

const netInfoSlice = createSlice({
  name: "netInfo",
  initialState,
  reducers: {
    updateConnectionStatus(state, action: PayloadAction<boolean>) {
      state.isConnected = action.payload;
    },
  },
});

export const netInfoReducer = netInfoSlice.reducer;
export const netInfoActions = netInfoSlice.actions;
