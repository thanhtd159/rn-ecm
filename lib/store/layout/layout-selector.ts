/** @format */
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectLayout = (state: RootState) => state.layouts;

export const selectInitializing = createSelector(
  selectLayout,
  (layoutState) => layoutState.initializing,
);

export const selectLayoutState = createSelector(
  selectLayout,
  (layoutState) => layoutState.layout,
);
