import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSpecializationsApi } from "@services/specialization-service";
import { SpecializationActionTypes } from "@constants/specialization-constant";
import { enqueueErrorToast } from "@shared/services/toast-service";
import type { AxiosError } from "axios";

const getSpecializationsAsyncThunk = createAsyncThunk(
  SpecializationActionTypes.SPECIALIZATION_GET_ALL,
  async (_, { rejectWithValue }) => {
    try {
      const response = await getSpecializationsApi();
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const message =
        axiosError?.response?.data?.message ||
        axiosError?.message ||
        "Failed to fetch specializations";
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

export { getSpecializationsAsyncThunk };
