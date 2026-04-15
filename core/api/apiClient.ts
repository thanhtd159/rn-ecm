import { ENV } from "@/env";
import { STORAGE_KEYS } from "@/lib/constants/auth.constants";
import { storageService } from "@/lib/storage/local-storage";
import axios from "axios";

// export const apiClient = axios.create({
//   baseURL: process.env.API_URL,
//   timeout: 10000,
// });

let accessTokenCache: string | null = null;

export const setAccessTokenCache = (token: string) => {
  accessTokenCache = token;
};

export const getAccessTokenCache = () => accessTokenCache;

export const apiClient = axios.create({
  // baseURL: process.env.EXPO_PUBLIC_API_URL,
  baseURL: ENV.API_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use(async (config) => {
  const token =
    getAccessTokenCache() || (await storageService.getItem(STORAGE_KEYS.TOKEN));
  // console.log("API URL RAW:", process.env.EXPO_PUBLIC_API_URL);
  // console.log("➡️ API Client REQUEST:", {
  //   url: config.url,
  //   method: config.method,
  //   data: config.data,
  //   params: config.params,
  // });

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("apiClient.ts - API Error :", error.response?.data);
    console.log("❌ AXIOS ERROR FULL:", {
      message: error.message,
      code: error.code,
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      fullUrl: error.config?.baseURL + error.config?.url,
      response: error.response?.data,
      status: error.response?.status,
    });

    if (error.response?.status === 401) {
      await storageService.removeItem(STORAGE_KEYS.TOKEN);
      // dispatch logout nếu cần
    }
    return Promise.reject(error);
  },
);

// apiClient.interceptors.response.use(
//   (response) => response.data,
//   async (error) => {
//     if (error.response?.status === 401) {
//       throw { type: "TOKEN_EXPIRED", error };
//     }

//     throw error;
//   },
// );

// apiClient.interceptors.response.use(
//   (res) => res.data,

//   async (error) => {
//     if (error.response?.status !== 401) return Promise.reject(error);

//     const originalRequest = error.config;

//     if (!getRefreshing()) {
//       setRefreshing(true);

//       const token = "xxxyyy";
//       //   const token = await refreshToken();

//       setRefreshing(false);

//       onRefreshed(token);
//     }

//     return new Promise((resolve) => {
//       subscribeTokenRefresh((token: string) => {
//         originalRequest.headers.Authorization = `Bearer ${token}`;

//         resolve(apiClient(originalRequest));
//       });
//     });
//   },
// );
