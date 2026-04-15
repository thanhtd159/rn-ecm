export interface ToastState {
  list: ToastItem[];
}

export interface ToastItem {
  msg: string;
  key: number | string;
}
