// store/toast/toast.saga.ts
import { delay, put, takeEvery } from "redux-saga/effects";
import { addToast, removeToast } from "./my-toast-slice";

interface ShowToastAction {
  type: "toast/showToast";
  payload: {
    msg: string;
    duration?: number;
  };
}

let nextToastId = 0;

function* handleShowToast(action: ShowToastAction) {
  const { msg, duration = 4000 } = action.payload;

  const key = nextToastId++;

  yield put(addToast({ key, msg }));
  yield delay(duration);
  yield put(removeToast({ key }));
}

export function* toastSaga() {
  yield takeEvery("toast/showToast", handleShowToast);
}
