/** @format */

import { put, takeLatest } from "redux-saga/effects";
import {
  fetchCategoriesFailure,
  fetchCategoriesSuccess,
} from "./category-action";
import { categoryActions } from "./category-slice";
import { Category, CategoryActionTypes } from "./category-type";
// import { WooWorker } from 'api-ecommerce';

// worker saga
function* fetchCategoriesSaga(): any {
  try {
    // set loading
    yield put(categoryActions.fetchCategoriesPending());

    const items: Category[] = [
      { id: 1, name: "Category 1" },
      { id: 2, name: "Category 2" },
      { id: 3, name: "Category 3" },
    ];
    const json = { code: 200, message: "Success", items: items }; //yield call(WooWorker.getCategories);

    if (!json) {
      yield put(fetchCategoriesFailure("Can't get data from server"));
    } else if (json.code) {
      yield put(fetchCategoriesFailure(json.message));
    } else {
      yield put(fetchCategoriesSuccess(json as any));
      // update slice luôn
      yield put(categoryActions.fetchCategoriesSuccess(json.items));
    }
  } catch (error: any) {
    yield put(fetchCategoriesFailure(error.message));
    yield put(categoryActions.fetchCategoriesFailure(error.message));
  }
}

// watcher
export function* categorySaga() {
  yield takeLatest(
    CategoryActionTypes.FETCH_CATEGORIES_REQUEST,
    fetchCategoriesSaga,
  );
}
