/** @format */

export interface Product {
  id: string | number;
  name?: string;
  price?: number;
}

export interface WishListItem {
  product: Product;
}

export interface WishListState {
  wishListItems: WishListItem[];
  total: number;
  totalPrice: number;
}
