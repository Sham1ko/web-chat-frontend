import {
  AxiosDefaults,
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { removeSessionCookies } from "@/utils";
import api from "@/services/ApiService";
import { paths } from "@/router";
import {
  getAccessToken,
  getRefreshToken,
  saveTokensToStorage,
} from "@/utils/jwt";
import publicApiService from "./publicApiService";

type FailedRequestQueue = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
};

let isRefreshing = false;
let failedRequestQueue: FailedRequestQueue[] = [];

type SetAuthorizationHeaderParams = {
  request: AxiosDefaults | AxiosRequestConfig;
  accessToken: string | null;
};

export function setAuthorizationHeader(params: SetAuthorizationHeaderParams) {
  const { request, accessToken } = params;

  (request.headers as Record<string, unknown>)[
    "Authorization"
  ] = `Bearer ${accessToken}`;
}

function handleRefreshToken(refreshToken: string | undefined) {
  isRefreshing = true;

  publicApiService
    .post("/auth/refresh", undefined, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })
    .then((response) => {
      const { accessToken, refreshToken } = response.data;
      saveTokensToStorage(accessToken, refreshToken);
      setAuthorizationHeader({ request: api.defaults, accessToken });

      failedRequestQueue.forEach((request) => request.onSuccess(accessToken));
      failedRequestQueue = [];
    })
    .catch((error) => {
      failedRequestQueue.forEach((request) => request.onFailure(error));
      failedRequestQueue = [];
      removeSessionCookies();
    })
    .finally(() => {
      isRefreshing = false;
    });
}

function onRequest(config: AxiosRequestConfig) {
  const accessToken = getAccessToken();

  if (accessToken) {
    setAuthorizationHeader({ request: config, accessToken });
  }

  return config as InternalAxiosRequestConfig;
}

function onRequestError(error: AxiosError): Promise<AxiosError> {
  return Promise.reject(error);
}

function onResponse(response: AxiosResponse): AxiosResponse {
  return response;
}

type ErrorCode = {
  code: string;
};

function onResponseError(
  error: AxiosError<ErrorCode>
): Promise<AxiosError | AxiosResponse> {
  if (error?.response?.status === 401) {
    if (error.response?.statusText === "Unauthorized") {
      const originalConfig = error.config as AxiosRequestConfig;
      const refreshToken = getRefreshToken();

      if (!isRefreshing) {
        handleRefreshToken(refreshToken);
      }

      return new Promise((resolve, reject) => {
        failedRequestQueue.push({
          onSuccess: (accessToken: string) => {
            setAuthorizationHeader({ request: originalConfig, accessToken });
            resolve(api(originalConfig));
          },
          onFailure: (error: AxiosError) => {
            reject(error);
          },
        });
      });
    } else {
      removeSessionCookies();
      window.location.href = paths.LOGIN_PATH;
    }
  }

  return Promise.reject(error);
}

export function setupInterceptors(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);

  return axiosInstance;
}
