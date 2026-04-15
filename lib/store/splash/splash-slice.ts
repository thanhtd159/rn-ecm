import { createSlice } from "@reduxjs/toolkit";

interface SplashState {
  loading: boolean;
  initialized: boolean;
}

const initialState: SplashState = {
  loading: false,
  initialized: false,
};

const splashSlice = createSlice({
  name: "splash",
  initialState,
  reducers: {
    initApp: (state) => {
      state.loading = true;
    },
    initAppSuccess: (state) => {
      state.loading = false;
      state.initialized = true;
    },
    initAppFail: (state) => {
      state.loading = false;
    },
  },
});

export const { initApp, initAppSuccess, initAppFail } = splashSlice.actions;
export default splashSlice.reducer;
