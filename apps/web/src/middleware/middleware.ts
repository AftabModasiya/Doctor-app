import { AuthEndpoints } from "@endpoints/auth-endpoint";
import type { TRootState } from "@models/redux.store";
import { authRefreshTokenApi } from "@services/auth-service";
import { Header_Keys, Token_Types } from "@shared/constants";
import { BackendResponse } from "@shared/enum/enum";
import { loginAction, logOutAction } from "@store/auth/auth-slice";
import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import type { Dispatch, Middleware, MiddlewareAPI } from "redux";

// Define the error response type
interface ErrorResponse {
  message?: string;
  [key: string]: unknown;
}

const backendBaseUrl = `http://192.168.1.146:3000/api`;

const axiosInstance = axios.create({
  baseURL: backendBaseUrl,
});

let isRefreshing = false;
let failedRequests: Array<() => void> = [];

const setupInterceptors = (storeApi: MiddlewareAPI<Dispatch, TRootState>) => {
  const { dispatch, getState } = storeApi;

  // Request Interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      const state = getState();
      const authToken = state.auth.accessToken;
      const refreshToken = state.auth.refreshToken;
      const companyId = state.auth.companyId;
      const endPoint = config.url;
      if (endPoint?.includes(AuthEndpoints.refreshToken))
        config.headers.Authorization = `${Token_Types.BEARER} ${refreshToken}`;
      else if (authToken)
        config.headers.Authorization = `${Token_Types.BEARER} ${authToken}`;
      config.headers["X-Language"] = "en";
      config.headers["X-Timezone"] =
        Intl.DateTimeFormat().resolvedOptions().timeZone;

      if (
        config.method &&
        config.method.toUpperCase() === "POST" &&
        companyId
      ) {
        config.headers["x-company-id"] = String(companyId);
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  // Response Interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<ErrorResponse>) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };
      const requestUrl =
        error.response?.config?.url || originalRequest?.url || "";

      // Handle refresh token endpoint failure - logout immediately
      if (
        error.response &&
        error.response.status === BackendResponse.UNAUTHORIZED &&
        requestUrl.includes("/refresh")
      ) {
        isRefreshing = false;
        failedRequests = [];
        dispatch(logOutAction());
        return Promise.reject(error);
      }

      // Handle 401 Unauthorized errors for other endpoints
      if (
        error.response &&
        error.response.status === BackendResponse.UNAUTHORIZED &&
        !requestUrl.includes(AuthEndpoints.sendOtpViaEamil) &&
        !requestUrl.includes(AuthEndpoints.signIn) &&
        !requestUrl.includes(AuthEndpoints.refreshToken) &&
        !requestUrl.includes(AuthEndpoints.forgotPassword) &&
        !originalRequest._retry
      ) {
        if (isRefreshing) {
          return new Promise<void>((resolve, reject) => {
            failedRequests.push(() => {
              const state = getState();
              const accessToken = state.auth.accessToken;
              if (accessToken && originalRequest.headers) {
                originalRequest.headers[Header_Keys.AUTHORIZATION] =
                  `${Token_Types.BEARER} ${accessToken}`;
                resolve(axiosInstance(originalRequest) as any);
              } else {
                reject(error);
              }
            });
          });
        }

        originalRequest._retry = true;
        const refreshToken = getState().auth.refreshToken;

        if (!refreshToken) {
          dispatch(logOutAction());
          return Promise.reject(error);
        }

        isRefreshing = true;

        try {
          const response = await authRefreshTokenApi();
          const newAccessToken = response?.data?.data?.accessToken;

          if (newAccessToken) {
            dispatch(
              loginAction({
                accessToken: newAccessToken,
                refreshToken: refreshToken,
              }),
            );

            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `${Token_Types.BEARER} ${newAccessToken}`;
            }

            failedRequests.forEach((callback) => callback());
            failedRequests = [];
            isRefreshing = false;

            return axiosInstance(originalRequest);
          } else {
            throw new Error("No access token received");
          }
        } catch (refreshError) {
          isRefreshing = false;
          failedRequests = [];
          dispatch(logOutAction());
          return Promise.reject(refreshError || error);
        }
      }

    },
  );
};

const apiMiddleware: Middleware<object, TRootState> = (storeApi) => {
  setupInterceptors(storeApi);
  return (next) => (action) => {
    next(action);
  };
};

export default apiMiddleware;
export { axiosInstance };
