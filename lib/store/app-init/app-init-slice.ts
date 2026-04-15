import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  loading: boolean;
  isConnected: boolean;
  initialized: boolean;
}

const initialState: AppState = {
  loading: true,
  isConnected: true,
  initialized: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    initApp: (state) => {
      state.loading = true;
    },
    initAppSuccess: (
      state,
      action: PayloadAction<{ isConnected: boolean }>,
    ) => {
      state.loading = false;
      state.initialized = true;
      state.isConnected = action.payload.isConnected;
    },
    initAppFailure: (state) => {
      state.loading = false;
    },
    updateConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
  },
});

export const {
  initApp,
  initAppSuccess,
  initAppFailure,
  updateConnectionStatus,
} = appSlice.actions;

export default appSlice.reducer;
