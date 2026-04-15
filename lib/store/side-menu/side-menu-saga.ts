/** @format */

import { put, takeLatest } from "redux-saga/effects";
import {
  closeSideMenuRequest,
  openSideMenuRequest,
  toggleSideMenuRequest,
} from "./side-menu-action";

import { closeSideMenu, openSideMenu, toggleSideMenu } from "./side-menu-slice";

import { PayloadAction } from "@reduxjs/toolkit";

// workers
function* handleOpen(): Generator {
  yield put(openSideMenu());
}

function* handleClose(): Generator {
  yield put(closeSideMenu());
}

function* handleToggle(action: PayloadAction<boolean | undefined>): Generator {
  yield put(toggleSideMenu(action.payload));
}

// watcher
export function* sideMenuSaga() {
  yield takeLatest(openSideMenuRequest.type, handleOpen);
  yield takeLatest(closeSideMenuRequest.type, handleClose);
  yield takeLatest(toggleSideMenuRequest.type, handleToggle);
}
