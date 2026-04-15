/** @format */

export const addAddress = (address: any) => ({
  type: "address/addAddress",
  payload: address,
});

export const removeAddress = (index: number) => ({
  type: "address/removeAddress",
  payload: index,
});
