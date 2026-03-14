import { createSlice } from "@reduxjs/toolkit";
import type { IDashboardCounts, IChartData } from "@models/dashboard";
import { getDashboardCountsAsyncThunk, getPatientChartAsyncThunk } from "./dashboard-async-thunk";
import { SliceNames } from "@constants/redux-constant";

interface DashboardState {
    counts: IDashboardCounts | null;
    chartData: IChartData | null;
    loading: boolean;
    chartLoading: boolean;
    error: string | null;
}

const initialState: DashboardState = {
    counts: null,
    chartData: null,
    loading: false,
    chartLoading: false,
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
            })
            .addCase(getPatientChartAsyncThunk.pending, (state) => {
                state.chartLoading = true;
                state.error = null;
            })
            .addCase(getPatientChartAsyncThunk.fulfilled, (state, action) => {
                state.chartLoading = false;
                state.chartData = action.payload?.data || null;
            })
            .addCase(getPatientChartAsyncThunk.rejected, (state, action) => {
                state.chartLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearDashboardError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
