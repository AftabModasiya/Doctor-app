import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import {
    createPrescriptionApi,
    deletePrescriptionApi,
    getPrescriptionByIdApi,
    getPrescriptionsApi,
    updatePrescriptionApi,
} from "@services/prescription-service";
import type { ICreatePrescriptionRequest } from "@models/prescription";
import {
    enqueueErrorToast,
    successToast,
} from "@shared/services/toast-service";

const getErrorMessage = (
    error: unknown,
    fallback = "Something went wrong",
): string => {
    const axiosError = error as AxiosError<{ message?: string }>;
    return axiosError?.response?.data?.message || axiosError?.message || fallback;
};

export const getPrescriptionsAsyncThunk = createAsyncThunk(
    "prescription/get-all",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getPrescriptionsApi();
            return response.data;
        } catch (error: unknown) {
            const message = getErrorMessage(error);
            enqueueErrorToast(message);
            return rejectWithValue(message);
        }
    },
);

export const getPrescriptionByIdAsyncThunk = createAsyncThunk(
    "prescription/get-by-id",
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await getPrescriptionByIdApi(id);
            return response.data;
        } catch (error: unknown) {
            const message = getErrorMessage(error);
            enqueueErrorToast(message);
            return rejectWithValue(message);
        }
    },
);

export const createPrescriptionAsyncThunk = createAsyncThunk(
    "prescription/create",
    async (body: ICreatePrescriptionRequest, { rejectWithValue }) => {
        try {
            const response = await createPrescriptionApi(body);
            successToast("Prescription created successfully");
            return response.data;
        } catch (error: unknown) {
            const message = getErrorMessage(error);
            enqueueErrorToast(message);
            return rejectWithValue(message);
        }
    },
);

export const updatePrescriptionAsyncThunk = createAsyncThunk(
    "prescription/update",
    async (
        { id, body }: { id: number; body: Partial<ICreatePrescriptionRequest> },
        { rejectWithValue },
    ) => {
        try {
            const response = await updatePrescriptionApi(id, body);
            successToast("Prescription updated successfully");
            return response.data;
        } catch (error: unknown) {
            const message = getErrorMessage(error);
            enqueueErrorToast(message);
            return rejectWithValue(message);
        }
    },
);

export const deletePrescriptionAsyncThunk = createAsyncThunk(
    "prescription/delete",
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await deletePrescriptionApi(id);
            successToast("Prescription deleted successfully");
            return response.data;
        } catch (error: unknown) {
            const message = getErrorMessage(error);
            enqueueErrorToast(message);
            return rejectWithValue(message);
        }
    },
);
