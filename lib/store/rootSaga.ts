import { authSaga } from "@/features/auth/store/auth.saga";
// import productSaga from "@/features/products/store/productSaga";
import { all } from "redux-saga/effects";
// import userSaga from "./users/userSaga";

export default function* rootSaga() {
  if (__DEV__) {
    console.log("🚀 Saga started");
  }
  yield all([authSaga()]);
  // yield all([productSaga(), userSaga(), authSaga()]);
}
