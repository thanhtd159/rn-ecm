/** @format */

import { Languages } from "@lib/common";
// import { WooWorker } from "api-ecommerce";
import { put, takeLatest } from "redux-saga/effects";
import { productActions } from "./product-slice";
import { ProductActionTypes } from "./product-type";

// fetch by category
function* fetchProductsSaga(action: any): any {
  try {
    yield put(productActions.fetchPending());

    const { categoryId, per_page, page, filters } = action.payload;

    // const json = yield call(
    //   WooWorker.productsByCategoryId,
    //   categoryId,
    //   per_page,
    //   page,
    //   filters,
    // );
    const json = {} as any;
    if (!json || json.code) {
      yield put(
        productActions.fetchFailure(
          json?.message || Languages.ErrorMessageRequest,
        ),
      );
    } else {
      yield put(productActions.fetchProductsSuccess(json));
    }
  } catch (e: any) {
    yield put(productActions.fetchFailure(e.message));
  }
}

// search by name
function* fetchByNameSaga(action: any): any {
  try {
    yield put(productActions.fetchPending());

    const { name, per_page, page, filter } = action.payload;

    // const json = yield call(
    //   WooWorker.productsByName,
    //   name,
    //   per_page,
    //   page,
    //   filter,
    // );
    const json = {} as any;
    yield put(
      productActions.fetchByNameSuccess({
        items: json,
        page,
        isMore: json.length === per_page,
      }),
    );
  } catch (e: any) {
    yield put(productActions.fetchFailure(e.message));
  }
}

// coupon
function* getCouponSaga(action: any): any {
  try {
    yield put(productActions.fetchPending());

    const { code, totalPrice } = action.payload;
    // const json = yield call(WooWorker.getAllCouponCode);

    // 👉 bạn có thể reuse logic cũ ở đây (giữ nguyên business)

    const coupon = {
      amount: 10,
      code,
    };

    yield put(productActions.setCoupon(coupon));
  } catch (e: any) {
    yield put(productActions.fetchFailure(e.message));
  }
}

export function* productSaga() {
  yield takeLatest(
    ProductActionTypes.FETCH_PRODUCTS_REQUEST,
    fetchProductsSaga,
  );

  yield takeLatest(
    ProductActionTypes.FETCH_PRODUCTS_BY_NAME_REQUEST,
    fetchByNameSaga,
  );

  yield takeLatest(ProductActionTypes.GET_COUPON_REQUEST, getCouponSaga);
}
