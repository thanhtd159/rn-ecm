import { delay, put, select, takeLatest } from "redux-saga/effects";
import { RootState } from "../store";
import { initApp, initAppFail, initAppSuccess } from "./splash-slice";

const MIN_DISPLAY_TIME = 1000;

// selector
const selectNetInfo = (state: RootState) => state.netInfo;

function* handleInitApp() {
  try {
    console.log("Splash.saga: Handle init app");

    // đảm bảo splash hiển thị tối thiểu
    yield delay(MIN_DISPLAY_TIME);

    const netInfo: ReturnType<typeof selectNetInfo> =
      yield select(selectNetInfo);

    if (netInfo?.isConnected) {
      // call API, preload data...
      console.log("Online mode");
    } else {
      console.log("Offline mode");
    }

    yield put(initAppSuccess());
  } catch (error) {
    yield put(initAppFail());
  }
}

export function* splashSaga() {
  yield takeLatest(initApp.type, handleInitApp);
}
