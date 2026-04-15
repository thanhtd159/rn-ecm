/** @format */

import { put, takeLatest } from "redux-saga/effects";
import { switchLanguageRequest, switchRtlRequest } from "./language-action";

import { switchLanguage, switchRtl } from "./language-slice";

import { PayloadAction } from "@reduxjs/toolkit";
import { SwitchLanguagePayload } from "./language-type";

// worker
function* handleSwitchLanguage(
  action: PayloadAction<SwitchLanguagePayload>,
): Generator {
  // ví dụ:
  // yield call(i18n.changeLanguage, action.payload.lang);
  // yield call(saveToStorage, action.payload);

  yield put(switchLanguage(action.payload));
}

function* handleSwitchRtl(action: PayloadAction<boolean>): Generator {
  // ví dụ:
  // yield call(I18nManager.forceRTL, action.payload);

  yield put(switchRtl(action.payload));
}

// watcher
export function* languageSaga() {
  yield takeLatest(switchLanguageRequest.type, handleSwitchLanguage);
  yield takeLatest(switchRtlRequest.type, handleSwitchRtl);
}
