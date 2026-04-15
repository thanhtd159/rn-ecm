/** @format */

import { Config } from "@lib/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Currency, CurrencyState } from "./currency-type";

const initialState: CurrencyState = {
  symbol: Config.DefaultCurrency.symbol,
  name: Config.DefaultCurrency.name,
  symbol_native: Config.DefaultCurrency.symbol,
  decimal_digits: Config.DefaultCurrency.precision,
  rounding: 0,
  code: Config.DefaultCurrency.code,
  name_plural: Config.DefaultCurrency.name_plural,
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    changeCurrency: (state, action: PayloadAction<Currency>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { changeCurrency } = currencySlice.actions;

export default currencySlice.reducer;
