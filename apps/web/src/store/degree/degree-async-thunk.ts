import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDegreesApi } from "@services/degree-service";
import { DegreeActionTypes } from "@constants/degree-constant";
import { enqueueErrorToast } from "@shared/services/toast-service";
import type { AxiosError } from "axios";

const getDegreesAsyncThunk = createAsyncThunk(
  DegreeActionTypes.DEGREE_GET_ALL,
  async (_, { rejectWithValue }) => {
    try {
      const response = await getDegreesApi();
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const message =
        axiosError?.response?.data?.message ||
        axiosError?.message ||
        "Failed to fetch degrees";
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

export { getDegreesAsyncThunk };
