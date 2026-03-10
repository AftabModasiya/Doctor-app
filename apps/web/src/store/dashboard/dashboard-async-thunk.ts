import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDashboardCountsApi } from "@services/dashboard-service";
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

export { getDashboardCountsAsyncThunk };
