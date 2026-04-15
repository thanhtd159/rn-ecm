// mockWooWorker.ts

import { fakeProducts } from "./fakeProduct";

export const WooWorkerMock = {
  productsByCategoryTag: async () => {
    await new Promise((res) => setTimeout(res, 500)); // giả lập delay
    return fakeProducts;
  },
};
