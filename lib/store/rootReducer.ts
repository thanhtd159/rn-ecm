import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../../features/auth/store/auth.slice";
// import productReducer from "../../features/products/store/productSlice";
// import userReducer from "./users/userSlice";

export const rootReducer = combineReducers({
  // products: productReducer,
  // users: userReducer,
  auth: authReducer,
});

/**
 * reset store khi logout
 */
// export const rootReducer = (state: any, action: any) => {
//   if (action.type === "auth/logout") {
//     state = undefined;
//   }

//   return appReducer(state, action);
// };

export type RootState = ReturnType<typeof rootReducer>;
