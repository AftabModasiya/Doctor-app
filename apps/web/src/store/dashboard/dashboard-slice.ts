import { createSlice } from "@reduxjs/toolkit";
import type { IDashboardCounts } from "@models/dashboard";
import { getDashboardCountsAsyncThunk } from "./dashboard-async-thunk";
import { SliceNames } from "@constants/redux-constant";

interface DashboardState {
    counts: IDashboardCounts | null;
    loading: boolean;
    error: string | null;
}

const initialState: DashboardState = {
    counts: null,
    loading: false,
    error: null,
};

const dashboardSlice = createSlice({
    name: SliceNames.DASHBOARD,
    initialState,
    reducers: {
        clearDashboardError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDashboardCountsAsyncThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getDashboardCountsAsyncThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.counts = action.payload?.data || null;
            })
            .addCase(getDashboardCountsAsyncThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearDashboardError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
