/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { Address, AddressState } from "./address-type";

const initialState: AddressState = {
  list: [],
  reload: false,
};

const buildAddressFromCustomer = (customerInfo: any): Address => ({
  email: customerInfo.email,
  first_name: customerInfo.first_name,
  last_name: customerInfo.last_name,
  address_1: customerInfo.billing?.address_1 || "",
  state: customerInfo.billing?.state || "",
  postcode: customerInfo.billing?.postcode || "",
  country: customerInfo.billing?.country || "",
  phone: customerInfo.billing?.phone || "",
  city: customerInfo.billing?.city || "",
  note: "",
});

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    addAddress(state, action: PayloadAction<Address>) {
      state.list.push(action.payload);
      state.reload = !state.reload;
    },

    removeAddress(state, action: PayloadAction<number>) {
      state.list.splice(action.payload, 1);
      state.reload = !state.reload;
    },

    selectAddress(state, action: PayloadAction<Address>) {
      state.selectedAddress = action.payload;
      state.reload = !state.reload;
    },

    initAddresses(state, action: PayloadAction<any>) {
      const address = buildAddressFromCustomer(action.payload);

      state.list = [address];
      state.selectedAddress = address;
      state.reload = !state.reload;
    },

    updateSelectedAddress(state, action: PayloadAction<Address>) {
      const index = state.list.findIndex((item) =>
        _.isEqual(item, state.selectedAddress),
      );

      if (index > -1) {
        state.list.splice(index, 1);
      }

      state.list.push(action.payload);
      state.selectedAddress = action.payload;
      state.reload = !state.reload;
    },
  },
});

export const addressReducer = addressSlice.reducer;
export const addressActions = addressSlice.actions;
