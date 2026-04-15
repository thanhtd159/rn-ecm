/** @format */

import { Languages } from "@lib/common";
// import { WooWorker } from "api-ecommerce";
import { put, takeLatest } from "redux-saga/effects";
import { cartActions } from "./cart-slice";
import { CartActionTypes } from "./cart-type";

// orders
function* fetchOrdersSaga(action: any): any {
  try {
    yield put(cartActions.fetchPending());

    // const json = yield call(
    //   WooWorker.ordersByCustomerId,
    //   action.payload.id,
    //   40,
    //   1,
    // );
    const json = {} as any;
    yield put(cartActions.setOrders(json));
  } catch (e: any) {
    yield put(cartActions.fetchFailure(e.message));
  }
}

// create order
function* createOrderSaga(action: any): any {
  try {
    yield put(cartActions.fetchPending());

    // const json = yield call(WooWorker.createOrder, action.payload);
    const json = {} as any;

    if (json?.id) {
      yield put(cartActions.createOrderSuccess());
    } else {
      yield put(cartActions.fetchFailure(Languages.CreateOrderError));
    }
  } catch (e: any) {
    yield put(cartActions.fetchFailure(e.message));
  }
}

// shipping
function* getShippingSaga(action: any): any {
  try {
    yield put(cartActions.fetchPending());

    // const json = yield call(WooWorker.getShippingMethod, action.payload);
    const json = {} as any;
    if (!json || json.code) {
      yield put(
        cartActions.fetchFailure(
          json?.message || Languages.ErrorMessageRequest,
        ),
      );
    } else {
      yield put(cartActions.setShipping(json));
    }
  } catch (e: any) {
    yield put(cartActions.fetchFailure(e.message));
  }
}

// order notes
function* getOrderNotesSaga(action: any): any {
  try {
    yield put(cartActions.fetchPending());

    // const json = yield call(WooWorker.getOrderNotes, action.payload);
    const json = {} as any;
    yield put(cartActions.setOrderNotes(json));
  } catch (e: any) {
    yield put(cartActions.fetchFailure(e.message));
  }
}

export function* cartSaga() {
  yield takeLatest(CartActionTypes.FETCH_MY_ORDER_REQUEST, fetchOrdersSaga);

  yield takeLatest(CartActionTypes.CREATE_ORDER_REQUEST, createOrderSaga);

  yield takeLatest(CartActionTypes.GET_SHIPPING_REQUEST, getShippingSaga);

  yield takeLatest(CartActionTypes.GET_ORDER_NOTES_REQUEST, getOrderNotesSaga);
}
