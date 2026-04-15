/** @format */

import { createAction } from "@reduxjs/toolkit";

export const openSideMenuRequest = createAction("sideMenu/openSideMenuRequest");

export const closeSideMenuRequest = createAction(
  "sideMenu/closeSideMenuRequest",
);

export const toggleSideMenuRequest = createAction<boolean | undefined>(
  "sideMenu/toggleSideMenuRequest",
);
