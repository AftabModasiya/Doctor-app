import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { browserSupportsWebAuthn, startRegistration } from '@simplewebauthn/browser';
import {
  passkeyRegisterOptionsApi,
  passkeyRegisterVerifyApi,
} from '@services/passkey-service';
import type { 
  TPasskeyRegisterVerifyPayload,
  TPasskeyRegisterVerifyResponse
} from '@models/passkey';
import {
  enqueueErrorToast,
  successToast,
} from '@shared/services/toast-service';
import { PasskeyActionTypes } from '@constants/passkey-constant';
import type { TRootState } from '@models/redux.store';
import type { TPasskeyRegisterOptionsResponse } from '@models/passkey';

const getErrorMessage = (
  error: unknown,
  fallback = 'Something went wrong',
): string => {
  const axiosError = error as AxiosError<{ message?: string }>;
  return (
    axiosError?.response?.data?.message || axiosError?.message || fallback
  );
};

const getWebAuthnErrorMessage = (error: unknown): string => {
  if (error instanceof DOMException) {
    if (error.name === 'NotAllowedError') {
      return 'Passkey registration cancelled';
    }
    if (error.name === 'InvalidStateError') {
      return 'A passkey already exists for this device';
    }
    if (error.name === 'NotSupportedError') {
      return 'Passkeys are not supported on this device or browser';
    }
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return 'Passkey registration failed';
};

const normalizeCreationOptions = (
  options: TPasskeyRegisterOptionsResponse,
  userFallback?: string,
): TPasskeyRegisterOptionsResponse => {
  if (!options?.user) return options;
  const name =
    options.user.name ||
    userFallback ||
    options.user.displayName ||
    'user';
  const displayName = options.user.displayName || name;

  return {
    ...options,
    // Prefer cross-platform to prompt QR / another device
    authenticatorSelection: {
      ...(options.authenticatorSelection || {}),
      authenticatorAttachment: 'cross-platform',
      userVerification: options.authenticatorSelection?.userVerification || 'preferred',
    },
    user: {
      ...options.user,
      name,
      displayName,
    },
  };
};

/**
 * Step 1 — Fetch WebAuthn registration options from the server.
 * The resolved value should be passed to startRegistration() from @simplewebauthn/browser.
 */
const passkeyRegisterOptionsThunk = createAsyncThunk(
  PasskeyActionTypes.PASSKEY_REGISTER_OPTIONS,
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await passkeyRegisterOptionsApi();
      const options = response.data.data as TPasskeyRegisterOptionsResponse;
      const state = getState() as TRootState;
      const userFallback = state.auth?.user?.email || state.auth?.user?.name;
      return normalizeCreationOptions(options, userFallback);
    } catch (error: unknown) {
      const message = getErrorMessage(error, 'Failed to get registration options');
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

/**
 * Step 2 — Send the RegistrationResponseJSON (attResp) to the server for verification.
 * Call this after startRegistration() resolves successfully.
 */
const passkeyRegisterVerifyThunk = createAsyncThunk(
  PasskeyActionTypes.PASSKEY_REGISTER_VERIFY,
  async (payload: TPasskeyRegisterVerifyPayload, { rejectWithValue }) => {
    try {
      const response = await passkeyRegisterVerifyApi(payload);
      
      const responseData = response.data as { success?: boolean; data?: TPasskeyRegisterVerifyResponse } & TPasskeyRegisterVerifyResponse;
      
      const passkeyData = responseData.data || responseData;
      const verified = passkeyData.verified ?? false;

      if (verified) {
        successToast('Device registered successfully');
      }
      return passkeyData;
    } catch (error: unknown) {
      const message = getErrorMessage(error, 'Registration verification failed');
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

/**
 * One-shot passkey registration:
 * 1) Fetch options from the server
 * 2) Trigger biometric prompt via startRegistration()
 * 3) Verify the response with the server
 */
const registerPasskeyThunk = createAsyncThunk(
  PasskeyActionTypes.PASSKEY_REGISTER,
  async (_, { getState, rejectWithValue }) => {
    try {
      if (!browserSupportsWebAuthn()) {
        return rejectWithValue('Passkeys are not supported in this browser');
      }

      const optionsResponse = await passkeyRegisterOptionsApi();
      const rawOptions =
        (optionsResponse.data?.data ?? optionsResponse.data) as TPasskeyRegisterOptionsResponse;
      const state = getState() as TRootState;
      const userFallback = state.auth?.user?.email || state.auth?.user?.name;
      const creationOptions = normalizeCreationOptions(rawOptions, userFallback);

      const attResp = await startRegistration(creationOptions);

      const verifyPayload: TPasskeyRegisterVerifyPayload = { attResp };
      const verifyResponse = await passkeyRegisterVerifyApi(verifyPayload);

      const responseData =
        verifyResponse.data as
          | { success?: boolean; data?: TPasskeyRegisterVerifyResponse }
          | TPasskeyRegisterVerifyResponse;

      const passkeyData = responseData.data || responseData;
      const verified = passkeyData.verified ?? false;

      if (verified) {
        successToast('Passkey registered successfully');
      }

      return passkeyData;
    } catch (error: unknown) {
      const message =
        error instanceof AxiosError
          ? getErrorMessage(error, 'Passkey registration failed')
          : getWebAuthnErrorMessage(error);
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

export { passkeyRegisterOptionsThunk, passkeyRegisterVerifyThunk };
export { registerPasskeyThunk };
