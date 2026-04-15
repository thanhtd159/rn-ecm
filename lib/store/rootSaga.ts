import { authSaga } from "@/features/auth/store/auth.saga";
import { cartSaga } from "@/features/carts/store/cart-saga";
import { categorySaga } from "@/features/categories/store/category-saga";
import { productSaga } from "@/features/products/store/product-saga";
// import productSaga from "@/features/products/store/productSaga";
import { all } from "redux-saga/effects";
import { toastSaga } from "./my-toast/my-toast-saga";
// import userSaga from "./users/userSaga";

export default function* rootSaga() {
  if (__DEV__) {
    console.log("🚀 Saga started");
  }
  yield all([
    authSaga(),
    categorySaga(),
    cartSaga(),
    productSaga(),
    toastSaga(),
    // splashSaga(),
  ]);
}
