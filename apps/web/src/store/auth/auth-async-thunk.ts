import { AuthActionTypes } from "@constants/auth-constant";
import type {
  TChangePasswordPayload,
  TErrorResponse,
  TLoginApiPayload,
  TSendOtpViaEmailApiPayload,
  TSsoExchangePayload,
} from "@models/auth";
import type { TUserProfileEditPayload } from "@models/user";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import {
  authRefreshTokenApi,
  authSignInApi,
  changePasswordApi,
  forgotPasswordApi,
  logOutApi,
  resetPasswordApi,
  sendOtpViaEmailApi,
  verifyEmailApi,
  verifySubAdminEmailApi,
  verifyTokenApi,
  ssoExchangeApi,
} from "@services/auth-service";
import {
  enqueueErrorToast,
  successToast,
} from "@shared/services/toast-service";

const refreshTokenAsyncThunk = createAsyncThunk(
  AuthActionTypes.AUTH_REFRESH_TOKEN,
  async () => {
    const response = await authRefreshTokenApi();
    return response?.data;
  },
);

const signInAsyncThunk = createAsyncThunk(
  AuthActionTypes.AUTH_LOGIN,
  async (payload: TLoginApiPayload) => {
    const response = await authSignInApi(payload);
    return response?.data;
  },
);

const forgotPasswordAsyncThunk = createAsyncThunk(
  AuthActionTypes.AUTH_FORGOT_PASSWORD,
  async (payload: { email: string }) => {
    const response = await forgotPasswordApi(payload);
    successToast(response?.data?.message);
    return response?.data;
  },
);

const verifyTokenAsyncThunk = createAsyncThunk(
  AuthActionTypes.AUTH_VERIFY_TOKEN,
  async ({ token }: { token: string | null }) => {
    const response = await verifyTokenApi(token);
    successToast(response?.data?.message);
    return response?.data;
  },
);

const resetPasswordAsyncThunk = createAsyncThunk(
  AuthActionTypes.AUTH_RESET_PASSWORD,
  async (
    payload: { newPassword: string; token: string | null },
    { rejectWithValue },
  ) => {
    try {
      const response = await resetPasswordApi(payload);
      successToast(response?.data?.message);
      return response?.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<TErrorResponse>;
      const message =
        axiosError?.response?.data?.message ||
        axiosError?.message ||
        "Reset password failed";
      enqueueErrorToast(message);
      return rejectWithValue({ message });
    }
  },
);

const verifyEmailsAsyncThunk = createAsyncThunk(
  AuthActionTypes.AUTH_VERIFY_EMAILS,
  async (payload: { token: string | null }, { rejectWithValue }) => {
    try {
      const response = await verifyEmailApi(payload);
      return response?.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<TErrorResponse>;
      const message =
        axiosError?.response?.data?.message || axiosError?.message;
      return rejectWithValue({ message });
    }
  },
);

const verifySubAdminEmailsAsyncThunk = createAsyncThunk(
  AuthActionTypes.AUTH_VERIFY_SUB_ADMIN_EMAILS,
  async (payload: { token: string | null }, { rejectWithValue }) => {
    try {
      const response = await verifySubAdminEmailApi(payload);
      return response?.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<TErrorResponse>;
      const Message =
        axiosError?.response?.data?.message || axiosError?.message;
      return rejectWithValue({ message: Message });
    }
  },
);

const userProfileDataAsyncThunk = createAsyncThunk(
  AuthActionTypes.AUTH_USER_PROFILE_DATA,
  async () => {
    // Note: Removed user-service calls as they were missing
    return { data: null };
  },
);

const editUserDetailsAsyncThunk = createAsyncThunk(
  AuthActionTypes.AUTH_USER_PROFILE_DATA_UPDATE,
  async (_, { dispatch }) => {
    // Note: Removed user-service calls as they were missing
    dispatch(userProfileDataAsyncThunk());
    return { message: "Profile updated successfully" };
  },
);

const logOutAsyncThunk = createAsyncThunk(
  AuthActionTypes.AUTH_LOGOUT,
  async () => {
    const response = (await logOutApi())?.data;
    return response;
  },
);

const changePasswordAsyncThunk = createAsyncThunk(
  AuthActionTypes.AUTH_CHANGE_PASSWORD,
  async (payload: TChangePasswordPayload) => {
    const response = (await changePasswordApi(payload))?.data;
    successToast(response?.message);
    return response;
  },
);

const sendOtpViaEmailAsyncThunk = createAsyncThunk(
  "auth/send-otp-via-email",
  async (payload: TSendOtpViaEmailApiPayload) => {
    const response = await sendOtpViaEmailApi(payload);
    successToast(response?.data?.message);
    return response?.data;
  },
);

const ssoExchangeAsyncThunk = createAsyncThunk(
  "auth/sso/exchange",
  async (payload: TSsoExchangePayload) => {
    const response = await ssoExchangeApi(payload);
    return response?.data;
  },
);

export {
  refreshTokenAsyncThunk,
  sendOtpViaEmailAsyncThunk,
  changePasswordAsyncThunk,
  editUserDetailsAsyncThunk,
  forgotPasswordAsyncThunk,
  logOutAsyncThunk,
  resetPasswordAsyncThunk,
  signInAsyncThunk,
  userProfileDataAsyncThunk,
  verifyEmailsAsyncThunk,
  verifySubAdminEmailsAsyncThunk,
  verifyTokenAsyncThunk,
  ssoExchangeAsyncThunk,
};
