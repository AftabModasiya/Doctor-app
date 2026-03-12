import { AuthEndpoints } from "@endpoints/auth-endpoint";
import type {
  TAuthGenerateTokenResponse,
  TChangePasswordPayload,
  TLoginApiPayload,
  TSsoExchangePayload,
} from "@models/auth";
import type { TApiResponse } from "@models/axios";
import { DELETE, GET, PATCH, POST } from "@shared/services/api-service";

const authRefreshTokenApi = (): TApiResponse<TAuthGenerateTokenResponse> => {
  return GET({
    URL: AuthEndpoints.refreshToken,
  });
};


const forgotPasswordApi = (payload: { email: string }) => {
  return PATCH({
    URL: AuthEndpoints.forgotPassword,
    body: {
      ...payload,
    },
  });
};

const verifyTokenApi = (
  token: string | null,
): TApiResponse<{
  id: string;
  email: string;
}> => {
  return GET({
    URL: AuthEndpoints.verifyToken,
    params: {
      token,
    },
  });
};

const resetPasswordApi = (payload: {
  newPassword: string;
  token: string | null;
}) => {
  const headers: Record<string, string> = {};

  if (payload.token) {
    headers.Authorization = `Bearer ${payload.token}`;
  }

  return PATCH({
    URL: AuthEndpoints.resetPassword,
    headers,
    body: {
      newPassword: payload.newPassword,
    },
  });
};

const verifyEmailApi = ({
  token,
}: {
  token: string | null;
}): TApiResponse<{
  id: number;
  email: string;
}> => {
  const backendBaseUrl = import.meta.env.VITE_BACKEND_URL || "";
  const url = `${backendBaseUrl}${AuthEndpoints.verifyEmail}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Language": "en",
    "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(url, {
    method: "GET",
    headers,
  })
    .then(async (response) => {
      const jsonData = await response.json();
      const axiosResponse = {
        data: {
          data: jsonData.data || jsonData,
          status: jsonData.status || response.status,
          message: jsonData.message || "",
        },
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        config: {},
      };

      if (!response.ok) {
        const error: any = new Error(jsonData.message || "Request failed");
        error.response = {
          data: {
            message: jsonData.message || "Request failed",
            status: jsonData.status || response.status,
          },
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          config: {},
        };
        error.config = {};
        throw error;
      }

      return axiosResponse as any;
    })
    .catch((error) => {
      if (!error.response) {
        const axiosError: any = new Error(error.message || "Network error");
        axiosError.response = {
          data: {
            message: error.message || "Network error",
            status: 0,
          },
          status: 0,
          statusText: "Network Error",
          headers: {},
          config: {},
        };
        axiosError.config = {};
        return Promise.reject(axiosError);
      }
      return Promise.reject(error);
    });
};

const verifySubAdminEmailApi = ({
  token,
}: {
  token: string | null;
}): TApiResponse<{ id: number; email: string }> => {
  return POST({
    URL: AuthEndpoints.verifySubAdminEmail,
    body: {
      token,
    },
  });
};

const logOutApi = () => {
  return DELETE({
    URL: AuthEndpoints.logout,
  });
};

const changePasswordApi = (payload: TChangePasswordPayload) => {
  return PATCH({
    URL: AuthEndpoints.changePassword,
    body: {
      ...payload,
    },
  });
};

const adminLoginApi = (
  payload: TLoginApiPayload,
): TApiResponse<TAuthGenerateTokenResponse> => {
  return PATCH({
    URL: AuthEndpoints.adminLogin,
    body: {
      ...payload,
    },
  });
};

const ssoExchangeApi = (
  payload: TSsoExchangePayload,
): TApiResponse<TAuthGenerateTokenResponse> => {
  return POST({
    URL: AuthEndpoints.ssoExchange,
    body: {
      ...payload,
    },
  });
};

export {
  adminLoginApi,
  authRefreshTokenApi,
  forgotPasswordApi,
  verifyTokenApi,
  resetPasswordApi,
  verifyEmailApi,
  logOutApi,
  changePasswordApi,
  verifySubAdminEmailApi,
  ssoExchangeApi,
};
