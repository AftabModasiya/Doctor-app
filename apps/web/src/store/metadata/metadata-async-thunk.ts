import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getPatientMetadataApi,
    getDoctorMetadataApi,
    getMedicineMetadataApi,
} from "@services/metadata-service";
import { enqueueErrorToast } from "@shared/services/toast-service";
import type { AxiosError } from "axios";

const getErrorMessage = (
    error: unknown,
    fallback = "Something went wrong",
): string => {
    const axiosError = error as AxiosError<{ message?: string }>;
    return axiosError?.response?.data?.message || axiosError?.message || fallback;
};

export const getPatientMetadataAsyncThunk = createAsyncThunk(
    "metadata/getPatients",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getPatientMetadataApi();
            return response.data;
        } catch (error: unknown) {
            const message = getErrorMessage(error);
            enqueueErrorToast(message);
            return rejectWithValue(message);
        }
    },
);

export const getDoctorMetadataAsyncThunk = createAsyncThunk(
    "metadata/getDoctors",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getDoctorMetadataApi();
            return response.data;
        } catch (error: unknown) {
            const message = getErrorMessage(error);
            enqueueErrorToast(message);
            return rejectWithValue(message);
        }
    },
);

export const getMedicineMetadataAsyncThunk = createAsyncThunk(
    "metadata/getMedicines",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getMedicineMetadataApi();
            return response.data;
        } catch (error: unknown) {
            const message = getErrorMessage(error);
            enqueueErrorToast(message);
            return rejectWithValue(message);
        }
    },
);
