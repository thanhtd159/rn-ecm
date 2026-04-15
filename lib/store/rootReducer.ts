import { combineReducers } from "@reduxjs/toolkit";

import { cartReducer } from "@/features/carts/store/cart-slice";
import { productReducer } from "@/features/products/store/product-slice";
import { categoryReducer } from "@features/categories/store/category-slice";
import authReducer from "../../features/auth/store/auth.slice";
import appInitReducer from "./app-init/app-init-slice";
import layoutReducer from "./layout/layout-slice";
import toastReducer from "./my-toast/my-toast-slice";
import { netInfoReducer } from "./net-info/net-info-slice";
import settingsReducer from "./settings/setting-slice";
import wishListReducer from "./wishlist/wishlist-slice";
// import productReducer from "../../features/products/store/productSlice";
// import userReducer from "./users/userSlice";

export const rootReducer = combineReducers({
  appInit: appInitReducer,
  products: productReducer,
  // users: userReducer,
  auth: authReducer,
  categories: categoryReducer,
  netInfo: netInfoReducer,
  cart: cartReducer,
  settings: settingsReducer,
  wishList: wishListReducer,
  toast: toastReducer,
  layouts: layoutReducer,
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
