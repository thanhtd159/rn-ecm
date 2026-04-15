/** @format */

import { RootState } from "@/lib/store/store";
import { createSelector } from "@reduxjs/toolkit";

// language
export const selectAuth = (state: RootState) => state.auth;

export const selectUser = createSelector(selectAuth, (auth) => auth.user);

export const selectIsSuccess = createSelector(
  selectAuth,
  (auth) => auth.isSuccess,
);

export const selectIsIntroFinished = createSelector(
  selectAuth,
  (auth) => auth.isIntroFinished,
);
export const selectAccessToken = createSelector(
  selectAuth,
  (auth) => auth.accessToken,
);
