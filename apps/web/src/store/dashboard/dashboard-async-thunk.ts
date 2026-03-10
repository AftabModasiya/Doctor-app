import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDashboardCountsApi, getPatientChartApi } from "@services/dashboard-service";
import { enqueueErrorToast } from "@shared/services/toast-service";

const getDashboardCountsAsyncThunk = createAsyncThunk(
    "dashboard/getCounts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getDashboardCountsApi();
            return response.data;
        } catch (error: any) {
            const message = error.response?.data?.message || "Something went wrong while fetching dashboard counts";
            enqueueErrorToast(message);
            return rejectWithValue(message);
        }
    },
);

const getPatientChartAsyncThunk = createAsyncThunk(
    "dashboard/getPatientChart",
    async ({ startDate, endDate }: { startDate: string; endDate: string }, { rejectWithValue }) => {
        try {
            const response = await getPatientChartApi(startDate, endDate);
            return response.data;
        } catch (error: any) {
            const message = error.response?.data?.message || "Something went wrong while fetching patient chart data";
            enqueueErrorToast(message);
            return rejectWithValue(message);
        }
    },
);

export { getDashboardCountsAsyncThunk, getPatientChartAsyncThunk };
