// store/toast/toast.slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ToastItem, ToastState } from "./my-toast-type";

const initialState: ToastState = {
  list: [],
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    // ===== TOAST (NEW) =====
    addToast: (state, action: PayloadAction<ToastItem>) => {
      const exists = state.list.some((t) => t.msg === action.payload.msg);

      if (!exists) {
        state.list.unshift(action.payload);
      }
    },

    removeToast: (state, action: PayloadAction<{ key: number | string }>) => {
      state.list = state.list.filter((t) => t.key !== action.payload.key);
    },

    clearToast: (state) => {
      state.list = [];
    },
  },
});

export const { addToast, removeToast, clearToast } = toastSlice.actions;
export default toastSlice.reducer;
