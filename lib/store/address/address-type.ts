/** @format */

export interface Address {
  email: string;
  first_name: string;
  last_name: string;
  address_1: string;
  state: string;
  postcode: string;
  country: string;
  phone: string;
  city: string;
  note?: string;
}

export interface AddressState {
  list: Address[];
  selectedAddress?: Address;
  reload: boolean;
}
