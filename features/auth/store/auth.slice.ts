import { storageService } from "@/lib/storage/local-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state, _action) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user || null;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    loginFailure: (state) => {
      state.loading = false;
    },
    refreshTokenSuccess: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    // logout: () => initialState,
    logout: (state) => {
      storageService.clearAll();
      return initialState;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  refreshTokenSuccess,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
