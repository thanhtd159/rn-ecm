/** @format */

export enum NetInfoActionTypes {
  UPDATE_CONNECTION_STATUS = "netInfo/UPDATE_CONNECTION_STATUS",
}

export interface NetInfoState {
  isConnected: boolean;
}
