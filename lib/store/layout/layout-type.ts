// layout.types.ts
// export interface Product {
//   id: number;
//   name: string;
//   // add more fields if needed
// }

import { ItemProduct } from "@/features/products/store/product-type";

export interface LayoutItem {
  layout: string;
  category?: string;
  tag?: string;
  list: ItemProduct[];
  isFetching?: boolean;
  finish?: boolean;
}

export interface LayoutState {
  layout: LayoutItem[];
  isFetching: boolean;
  initializing: boolean;
  error?: string;
}
