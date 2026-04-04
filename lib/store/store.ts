import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { logger } from "./logger";
import { rootReducer } from "./rootReducer";
import rootSaga from "./rootSaga";

// ------Default store without Reactotron------
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware);

    return __DEV__ ? middlewares.concat(logger) : middlewares;
  },
});

// ------Store with Reactotron------
// const sagaMiddleware = createSagaMiddleware({
//   sagaMonitor: reactotron?.createSagaMonitor?.(),
// });

// export const store = configureStore({
//   reducer: rootReducer,

//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),

//   enhancers: (getDefaultEnhancers) =>
//     reactotron?.createEnhancer
//       ? getDefaultEnhancers().concat(reactotron.createEnhancer())
//       : getDefaultEnhancers(),
// });

// const sagaMiddleware = createSagaMiddleware({
//   sagaMonitor: reactotron?.createSagaMonitor?.(),
// });

// export const store = configureStore({
//   reducer: rootReducer,

//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       thunk: false,
//     }).concat(sagaMiddleware),

//   enhancers: (getDefaultEnhancers) =>
//     reactotron
//       ? getDefaultEnhancers().concat(reactotron.createEnhancer())
//       : getDefaultEnhancers(),
// });

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
