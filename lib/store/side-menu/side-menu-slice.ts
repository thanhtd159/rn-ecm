/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SideMenuState } from "./side-menu-type";

const initialState: SideMenuState = {
  isOpen: false,
};

export const sideMenuSlice = createSlice({
  name: "sideMenu",
  initialState,
  reducers: {
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

export const { openSideMenu, closeSideMenu, toggleSideMenu } =
  sideMenuSlice.actions;

export default sideMenuSlice.reducer;
