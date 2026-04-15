/** @format */

import { PayloadAction } from "@reduxjs/toolkit";
import { put, takeLatest } from "redux-saga/effects";

import { changeCurrencyRequest } from "./currency-action";
import { changeCurrency } from "./currency-slice";

import { Currency } from "./currency-type";

// worker
function* handleChangeCurrency(action: PayloadAction<Currency>): Generator {
  // ví dụ:
  // yield call(saveCurrencyToStorage, action.payload);
  // yield call(CurrencyWorker.setCurrency, action.payload);

  yield put(changeCurrency(action.payload));
}

// watcher
export function* currencySaga() {
  yield takeLatest(changeCurrencyRequest.type, handleChangeCurrency);
}
