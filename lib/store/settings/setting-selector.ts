/** @format */
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectSettings = (state: RootState) => state.settings;

export const selectLanguage = createSelector(
  selectSettings,
  (settings) => settings.language,
);

export const selectCurrencySymbol = createSelector(
  selectSettings,
  (settings) => settings.currency.symbol,
);

export const selectTheme = createSelector(
  selectSettings,
  (settings) => settings.theme,
);

export const selectIsDarkTheme = createSelector(
  selectSettings,
  (settings) => settings.theme.isDarkTheme,
);

export const selectCurrency = createSelector(
  selectSettings,
  (settings) => settings.currency,
);

export const selectSideMenu = createSelector(
  selectSettings,
  (settings) => settings.isOpen,
);
