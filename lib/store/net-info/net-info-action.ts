/** @format */

import { NetInfoActionTypes } from "./net-info-type";

export const updateConnectionStatus = (isConnected: boolean) => ({
  type: NetInfoActionTypes.UPDATE_CONNECTION_STATUS,
  payload: isConnected,
});
