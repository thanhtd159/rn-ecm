/** @format */
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectAppInitState = (state: RootState) => state.appInit;

export const selectLoading = createSelector(
  selectAppInitState,
  (appInitState) => appInitState.loading,
);
