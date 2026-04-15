/** @format */

import { put, select, takeLatest } from "redux-saga/effects";
import {
  changeCurrencyRequest,
  switchLanguageRequest,
  switchRtlRequest,
  toggleThemeRequest,
} from "./setting-action";

import {
  changeCurrency,
  switchLanguage,
  switchRtl,
  toggleTheme,
} from "./setting-slice";

import { PayloadAction } from "@reduxjs/toolkit";
import { Currency } from "./setting-type";

// selectors (inline)
const selectTheme = (state: any) => state.settings.theme.isDarkTheme;

// ===== LANGUAGE =====
function* handleSwitchLanguage(
  action: PayloadAction<{ lang: string; rtl: boolean }>,
): Generator {
  // call i18n, storage...
  yield put(switchLanguage(action.payload));
}

function* handleSwitchRtl(action: PayloadAction<boolean>): Generator {
  // call I18nManager nếu cần
  yield put(switchRtl(action.payload));
}

// ===== THEME =====
function* handleToggleTheme(): Generator {
  yield put(toggleTheme());

  const isDark = yield select(selectTheme);

  // save to storage
}

// ===== CURRENCY =====
function* handleChangeCurrency(action: PayloadAction<Currency>): Generator {
  // call CurrencyWorker / API
  yield put(changeCurrency(action.payload));
}

// ===== WATCHER =====
export function* settingsSaga() {
  yield takeLatest(switchLanguageRequest.type, handleSwitchLanguage);

  yield takeLatest(switchRtlRequest.type, handleSwitchRtl);

  yield takeLatest(toggleThemeRequest.type, handleToggleTheme);

  yield takeLatest(changeCurrencyRequest.type, handleChangeCurrency);
}
