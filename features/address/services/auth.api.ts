import { apiClient } from "@/core/api/apiClient";
import { ILogin } from "../../../lib/store/address/address-type";

export const loginApi = async (data: ILogin) => {
  const res = await apiClient.post("/auth/login", data);
  return res.data;
};
