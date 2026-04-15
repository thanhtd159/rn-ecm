/** @format */

import { put, takeLatest } from "redux-saga/effects";

// import { WooWorker } from "api-ecommerce";

import { fetchPaymentsRequest } from "./payment-action";

import {
  fetchPaymentsFailure,
  fetchPaymentsStart,
  fetchPaymentsSuccess,
} from "./payment-slice";

import { Payment } from "./payment-type";

// worker
function* handleFetchPayments(): Generator {
  try {
    yield put(fetchPaymentsStart());

    // const json = yield call(WooWorker.getPayments);
    const json = {} as any;
    if (!json || json.code) {
      yield put(fetchPaymentsFailure());
      return;
    }

    yield put(fetchPaymentsSuccess(json as Payment[]));
  } catch (error) {
    yield put(fetchPaymentsFailure());
  }
}

// watcher
export function* paymentSaga() {
  yield takeLatest(fetchPaymentsRequest.type, handleFetchPayments);
}
