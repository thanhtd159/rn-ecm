/** @format */

import { createAction } from "@reduxjs/toolkit";
import { Currency } from "./setting-type";

// language
export const switchLanguageRequest = createAction<{
  lang: string;
  rtl: boolean;
}>("settings/switchLanguageRequest");

export const switchRtlRequest = createAction<boolean>(
  "settings/switchRtlRequest",
);

// theme
export const toggleThemeRequest = createAction("settings/toggleThemeRequest");

// currency
export const changeCurrencyRequest = createAction<Currency>(
  "settings/changeCurrencyRequest",
);
