import { setAccessTokenCache } from "@/core/api/apiClient";
import { STORAGE_KEYS } from "@/lib/constants/auth.constants";
import { storageService } from "@/lib/storage/local-storage";
import { call, put, takeLatest } from "redux-saga/effects";
import { loginApi } from "../services/auth.api";
import { AUTH_LOGIN } from "./auth-type";
import { loginFailure, loginSuccess } from "./auth.slice";

// export function* initAuthSaga(): any {
//   const { accessToken } = yield call(asynLocalStorage.get, STORAGE_KEYS.TOKEN);
//   const { refreshToken } = yield call(
//     asynLocalStorage.get,
//     STORAGE_KEYS.REFRESH_TOKEN,
//   );

//   if (accessToken && refreshToken) {
//     yield put(
//       loginSuccess({
//         accessToken,
//         refreshToken,
//         user: null,
//       }),
//     );
//   }
// }

function* loginSaga(action: any): any {
  try {
    console.log("action: ", action.payload);

    const res = yield call(loginApi, action.payload);

    // // ✅ lưu vào storage
    setAccessTokenCache(res.accessToken);
    const accessToken = String(res?.accessToken ?? "");
    const refreshToken = String(res?.refreshToken ?? "");

    // Lưu token (có context + ép string)
    yield call(storageService.setItem, STORAGE_KEYS.TOKEN, accessToken);

    if (refreshToken) {
      yield call(
        storageService.setItem,
        STORAGE_KEYS.REFRESH_TOKEN,
        refreshToken,
      );
    }

    yield put(loginSuccess({ ...res, isSuccess: true }));

    // navigate sau
    // alert("Login successful! Navigating to products list...");
    // const router = useRouter();

    // router.replace("/home");
  } catch (e) {
    yield put(loginFailure());
  }
}

export function* authSaga() {
  yield takeLatest(AUTH_LOGIN, loginSaga);
}
