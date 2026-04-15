/** @format */

export interface Payment {
  id: string | number;
  enabled: boolean;
  title?: string;
}

export interface PaymentState {
  list: Payment[];
  isFetching: boolean;
  finish: boolean;
}
