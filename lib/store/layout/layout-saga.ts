// layout.saga.ts
import { flatten } from "lodash";
import { all, call, put, SagaReturnType, takeLatest } from "redux-saga/effects";

import { getAppConfigJson } from "@/lib/services/Utils";
import { HorizonLayouts, Languages } from "@lib/common";
import { layoutActions } from "./layout-slice";

import { fakeProducts } from "@/mock/fakeProduct";
import { SagaIterator } from "redux-saga";
// ===== HOME =====
function* fetchHomeSaga(
  action: ReturnType<typeof layoutActions.fetchHomeLayouts>,
): SagaIterator {
  try {
    const { url, enable } = action.payload;

    const result: SagaReturnType<typeof getAppConfigJson> = enable
      ? yield call(getAppConfigJson, url)
      : { HorizonLayout: HorizonLayouts };

    if (result?.HorizonLayout) {
      yield put(layoutActions.fetchHomeSuccess(result.HorizonLayout));
    } else {
      yield put(layoutActions.fetchHomeFailure());
    }
  } catch (e) {
    yield put(layoutActions.fetchHomeFailure());
  }
}

// ===== FETCH PRODUCTS =====
function* fetchProductsSaga(
  action: ReturnType<typeof layoutActions.fetchLayout>,
): SagaIterator {
  try {
    const { index } = action.payload;

    // const json = (yield call(
    //   WooWorkerMock.productsByCategoryTag,
    //   "",
    //   "",
    //   null,
    //   null,
    //   null,
    //   10,
    //   1,
    // )) as any[];

    const json = fakeProducts;

    if (!json) {
      yield put(layoutActions.fetchLayoutFailure(Languages.getDataError));
      return;
    }

    // if (json.code) {
    //   yield put(layoutActions.fetchLayoutFailure(json.message));
    //   return;
    // }

    yield put(
      layoutActions.fetchLayoutSuccess({
        index,
        data: flatten(json),
      }),
    );
  } catch (e) {
    yield put(layoutActions.fetchLayoutFailure("Error"));
  }
}

// ===== FETCH ALL =====
function* fetchAllSaga(
  action: ReturnType<typeof layoutActions.fetchAllLayouts>,
) {
  try {
    // bạn có thể select layouts từ store
    // rồi loop call fetchLayout

    // demo đơn giản:
    yield put(layoutActions.fetchAllSuccess());
  } catch (e) {
    yield put(layoutActions.fetchLayoutFailure("Error"));
  }
}

// ===== WATCHERS =====
export function* layoutSaga() {
  yield all([
    takeLatest(layoutActions.fetchHomeLayouts.type, fetchHomeSaga),
    takeLatest(layoutActions.fetchLayout.type, fetchProductsSaga),
    takeLatest(layoutActions.fetchAllLayouts.type, fetchAllSaga),
  ]);
}
