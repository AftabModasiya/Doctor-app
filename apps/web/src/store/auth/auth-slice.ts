import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: any | null;
  accessToken: string | null;
  refreshToken: string | null;
  companyId: string | number | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  companyId: null,
  isAuthenticated: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (
      state,
      action: PayloadAction<{
        user?: any;
        accessToken: string;
        refreshToken: string;
        companyId?: string | number;
      }>,
    ) => {
      if (action.payload.user) state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      if (action.payload.companyId) state.companyId = action.payload.companyId;
      state.isAuthenticated = true;
    },
    logOutAction: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.companyId = null;
      state.isAuthenticated = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { loginAction, logOutAction, setLoading } = authSlice.actions;
export default authSlice.reducer;
