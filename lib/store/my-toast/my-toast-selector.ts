/** @format */
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectToast = (state: RootState) => state.toast;

export const selectToastList = createSelector(
  selectToast,
  (toastState) => toastState.list,
);
