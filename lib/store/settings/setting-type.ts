/** @format */

export interface LanguageState {
  lang: string;
  rtl: boolean;
}

export interface Currency {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
}

export interface ThemeState {
  isDarkTheme: boolean;
}

export interface SettingsState {
  language: LanguageState;
  currency: Currency;
  theme: ThemeState;
  isOpen: boolean;
}
