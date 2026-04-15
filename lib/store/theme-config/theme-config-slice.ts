/** @format */

import { Config } from "@lib/common";
import { createSlice } from "@reduxjs/toolkit";
import { ThemeConfigState } from "./theme-config-type";

const initialState: ThemeConfigState = {
  isDarkTheme: Config.Theme.isDark,
};

export const themeConfigSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkTheme: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
    },

    // optional: set trực tiếp
    setTheme: (state, action: { payload: boolean }) => {
      state.isDarkTheme = action.payload;
    },
  },
});

export const { toggleDarkTheme, setTheme } = themeConfigSlice.actions;

export default themeConfigSlice.reducer;
