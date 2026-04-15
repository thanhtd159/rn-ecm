/** @format */

import { Config, Constants } from "@lib/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Currency, SettingsState } from "./setting-type";

// ===== NEW: Toast Type =====

const initialState: SettingsState = {
  language: {
    lang: Constants.Language,
    rtl: Constants.RTL,
  },
  currency: {
    symbol: Config.DefaultCurrency.symbol,
    name: Config.DefaultCurrency.name,
    symbol_native: Config.DefaultCurrency.symbol,
    decimal_digits: Config.DefaultCurrency.precision,
    rounding: 0,
    code: Config.DefaultCurrency.code,
    name_plural: Config.DefaultCurrency.name_plural,
  },
  theme: {
    isDarkTheme: Config.Theme.isDark,
  },

  isOpen: false,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    // ===== LANGUAGE =====
    switchLanguage: (
      state,
      action: PayloadAction<{ lang: string; rtl: boolean }>,
    ) => {
      state.language.lang = action.payload.lang;
      state.language.rtl = action.payload.rtl;
    },

    switchRtl: (state, action: PayloadAction<boolean>) => {
      state.language.rtl = action.payload;
    },

    // ===== THEME =====
    toggleTheme: (state) => {
      state.theme.isDarkTheme = !state.theme.isDarkTheme;
    },

    setTheme: (state, action: PayloadAction<boolean>) => {
      state.theme.isDarkTheme = action.payload;
    },

    // ===== CURRENCY =====
    changeCurrency: (state, action: PayloadAction<Currency>) => {
      state.currency = {
        ...state.currency,
        ...action.payload,
      };
    },

    // ===== SIDE MENU (REFACTOR TỪ REDUX CŨ) =====
    openSideMenu: (state) => {
      state.isOpen = true;
    },

    closeSideMenu: (state) => {
      state.isOpen = false;
    },

    toggleSideMenu: (state, action: PayloadAction<boolean | undefined>) => {
      if (typeof action.payload === "undefined") {
        state.isOpen = !state.isOpen;
      } else {
        state.isOpen = action.payload;
      }
    },
  },
});

export const {
  switchLanguage,
  switchRtl,
  toggleTheme,
  setTheme,
  changeCurrency,
  openSideMenu,
  closeSideMenu,
  toggleSideMenu,
} = settingsSlice.actions;

export default settingsSlice.reducer;
