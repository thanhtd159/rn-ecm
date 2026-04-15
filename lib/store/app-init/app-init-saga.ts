import NetInfo from "@react-native-community/netinfo";
import { I18nManager } from "react-native";
import { call, put, takeLatest } from "redux-saga/effects";

import { initApp, initAppFailure, initAppSuccess } from "./app-init-slice";

// import { fetchHomeLayouts } from "@/services/home-service";
// import WooWorker from "@/services/woo-worker";
import { Config } from "@lib/common";
import { layoutActions } from "../layout/layout-slice";

const EN_LANGUAGE = "en";

function* handleInitApp(): Generator<any, void, any> {
  try {
    const language = "en"; // Config.language;

    // RTL
    I18nManager.forceRTL(language === EN_LANGUAGE);

    // Woo init
    // yield call([WooWorker, "init"], {
    //   url: Config.WooCommerce.url,
    //   consumerKey: Config.WooCommerce.consumerKey,
    //   consumerSecret: Config.WooCommerce.consumerSecret,
    //   wp_api: true,
    //   version: "wc/v3",
    //   queryStringAuth: true,
    //   language: 'en'
    // });

    // fetch layout
    // yield put(
    //   layoutActions.fetchHomeLayouts,
    //   Config.HomeCaching.url,
    //   Config.HomeCaching.enable,
    // );

    console.log("app-init: ", language, Config.HomeCaching.url);

    yield put(
      layoutActions.fetchHomeLayouts({
        url: Config.HomeCaching.url,
        enable: Config.HomeCaching.enable,
      }),
    );
    // network
    const netInfo = yield call(NetInfo.fetch);
    const isConnected = netInfo.type !== "none";

    console.log("app-init: ", isConnected);
    yield put(initAppSuccess({ isConnected }));
  } catch (error) {
    console.error("Init App Error:", error);
    yield put(initAppFailure());
  }
}

export function* appSaga() {
  yield takeLatest(initApp.type, handleInitApp);
}
