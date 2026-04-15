// layout.slice.ts
import { ItemProduct } from "@/features/products/store/product-type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LayoutItem, LayoutState } from "./layout-type";

const initialState: LayoutState = {
  layout: [],
  isFetching: false,
  initializing: true,
};

interface IndexPayload {
  index: number;
}

interface FetchSuccessPayload extends IndexPayload {
  data: ItemProduct[];
  finish?: boolean;
}

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    // ===== HOME =====
    fetchHomeLayouts: (
      state,
      _action: PayloadAction<{ url: string; enable: boolean }>,
    ) => {
      state.initializing = true;
    },
    fetchHomeSuccess: (state, action: PayloadAction<LayoutItem[]>) => {
      state.layout = action.payload;
      state.initializing = false;
    },
    fetchHomeFailure: (state) => {
      state.initializing = false;
    },

    // ===== ALL =====
    fetchAllLayouts: (state, _action: PayloadAction<{ page: number }>) => {
      state.isFetching = true;
    },
    fetchAllSuccess: (state) => {
      state.isFetching = false;
    },

    // ===== ITEM =====
    fetchLayout: (state, action: PayloadAction<IndexPayload>) => {
      const item = state.layout[action.payload.index];
      if (item) item.isFetching = true;
    },

    fetchLayoutSuccess: (state, action: PayloadAction<FetchSuccessPayload>) => {
      const { index, data } = action.payload;
      const item = state.layout[index];
      if (item) {
        item.list = data;
        item.isFetching = false;
      }
    },

    fetchLayoutMore: (state, action: PayloadAction<FetchSuccessPayload>) => {
      const { index, data, finish } = action.payload;
      const item = state.layout[index];
      if (item) {
        item.list = [...item.list, ...data];
        item.isFetching = false;
        item.finish = finish;
      }
    },

    fetchLayoutFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isFetching = false;
    },
  },
});

export const layoutActions = layoutSlice.actions;
export default layoutSlice.reducer;
