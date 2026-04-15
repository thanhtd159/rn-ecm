/** @format */

import { createAction } from "@reduxjs/toolkit";
import { Currency } from "./currency-type";

export const changeCurrencyRequest = createAction<Currency>(
  "currency/changeCurrencyRequest",
);
