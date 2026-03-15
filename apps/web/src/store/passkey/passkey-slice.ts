import { createSlice } from '@reduxjs/toolkit';
import { SliceNames } from '@constants/redux-constant';
import type { TPasskeyRegisterOptionsResponse } from '@models/passkey';
import {
  passkeyRegisterOptionsThunk,
  passkeyRegisterVerifyThunk,
  registerPasskeyThunk,
} from './passkey-async-thunk';

interface PasskeyState {
  /** Registration options returned by /register/options — pass this to startRegistration() */
  registrationOptions: TPasskeyRegisterOptionsResponse | null;
  /** Loading state while fetching registration options */
  isLoadingOptions: boolean;
  /** Loading state while verifying the attestation response */
  isVerifying: boolean;
  /** True when the server confirms verified: true from /register/verify */
  isVerified: boolean;
  /** Loading state while running full passkey registration */
  isRegistering: boolean;
  /** Success message after registration completes */
  successMessage: string | null;
  error: string | null;
}

const initialState: PasskeyState = {
  registrationOptions: null,
  isLoadingOptions: false,
  isVerifying: false,
  isVerified: false,
  isRegistering: false,
  successMessage: null,
  error: null,
};

const passkeySlice = createSlice({
  name: SliceNames.PASSKEY,
  initialState,
  reducers: {
    resetPasskeyState: () => initialState,
    clearPasskeyError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ── Full Register
      .addCase(registerPasskeyThunk.pending, (state) => {
        state.isRegistering = true;
        state.isVerified = false;
        state.successMessage = null;
        state.error = null;
      })
      .addCase(registerPasskeyThunk.fulfilled, (state, action) => {
        state.isRegistering = false;
        type PayloadType = { verified?: boolean; message?: string } | { data?: { verified?: boolean; message?: string } };
        const payload = action.payload as PayloadType | undefined;

        let verified = false;
        let message: string | null = null;
        if (payload) {
          if ('data' in payload && payload.data) {
            verified = payload.data.verified ?? false;
            message = payload.data.message ?? null;
          } else if ('verified' in payload) {
            verified = payload.verified ?? false;
            message = 'message' in payload ? payload.message ?? null : null;
          }
        }

        state.isVerified = verified;
        state.successMessage = verified ? message || 'Passkey registered successfully' : null;
      })
      .addCase(registerPasskeyThunk.rejected, (state, action) => {
        state.isRegistering = false;
        state.isVerified = false;
        state.successMessage = null;
        state.error = action.payload as string;
      })

      // ── Register Options
      .addCase(passkeyRegisterOptionsThunk.pending, (state) => {
        state.isLoadingOptions = true;
        state.error = null;
        state.registrationOptions = null;
      })
      .addCase(passkeyRegisterOptionsThunk.fulfilled, (state, action) => {
        state.isLoadingOptions = false;
        type PayloadType = TPasskeyRegisterOptionsResponse | { data: TPasskeyRegisterOptionsResponse };
        const payload = action.payload as PayloadType | undefined;
        state.registrationOptions =
          (payload && 'data' in payload ? payload.data : payload) ?? null;
      })
      .addCase(passkeyRegisterOptionsThunk.rejected, (state, action) => {
        state.isLoadingOptions = false;
        state.error = action.payload as string;
      })

      // ── Register Verify
      .addCase(passkeyRegisterVerifyThunk.pending, (state) => {
        state.isVerifying = true;
        state.isVerified = false;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(passkeyRegisterVerifyThunk.fulfilled, (state, action) => {
        state.isVerifying = false;
        type PayloadType = { verified?: boolean } | { data?: { verified?: boolean } };
        const payload = action.payload as PayloadType | undefined;
        
        let verified = false;
        if (payload) {
            if ('data' in payload && payload.data) {
                verified = payload.data.verified ?? false;
            } else if ('verified' in payload) {
                verified = payload.verified ?? false;
            }
        }
        state.isVerified = verified;
        state.successMessage = verified ? 'Passkey registered successfully' : null;
      })
      .addCase(passkeyRegisterVerifyThunk.rejected, (state, action) => {
        state.isVerifying = false;
        state.isVerified = false;
        state.error = action.payload as string;
        state.successMessage = null;
      });
  },
});

export const { resetPasskeyState, clearPasskeyError } = passkeySlice.actions;
export default passkeySlice.reducer;
