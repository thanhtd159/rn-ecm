/** @format */

import { Constants } from "@lib/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LanguageState, SwitchLanguagePayload } from "./language-type";

const initialState: LanguageState = {
  lang: Constants.Language,
  rtl: Constants.RTL,
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    switchLanguage: (state, action: PayloadAction<SwitchLanguagePayload>) => {
      state.lang = action.payload.lang;
      state.rtl = action.payload.rtl;
    },

    switchRtl: (state, action: PayloadAction<boolean>) => {
      state.rtl = action.payload;
    },
  },
});

export const { switchLanguage, switchRtl } = languageSlice.actions;

export default languageSlice.reducer;
