import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import {
  createMedicineApi,
  deleteMedicineApi,
  getMedicineByIdApi,
  getAllMedicinesApi,
  updateMedicineApi,
} from "@services/medicine-service";
import type { ICreateMedicineRequest } from "@models/medicine";
import {
  enqueueErrorToast,
  successToast,
} from "@shared/services/toast-service";
import { MedicineActionTypes } from "@constants/medicine-constant";

const getErrorMessage = (
  error: unknown,
  fallback = "Something went wrong",
): string => {
  const axiosError = error as AxiosError<{ message?: string }>;
  return axiosError?.response?.data?.message || axiosError?.message || fallback;
};

const getAllMedicinesAsyncThunk = createAsyncThunk(
  MedicineActionTypes.MEDICINE_GET_ALL,
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllMedicinesApi();
      return response.data;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

const getMedicineByIdAsyncThunk = createAsyncThunk(
  MedicineActionTypes.MEDICINE_GET_BY_ID,
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await getMedicineByIdApi(id);
      return response.data;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

const createMedicineAsyncThunk = createAsyncThunk(
  MedicineActionTypes.MEDICINE_CREATE,
  async (body: ICreateMedicineRequest, { rejectWithValue }) => {
    try {
      const response = await createMedicineApi(body);
      successToast("Medicine created successfully");
      return response.data;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

const updateMedicineAsyncThunk = createAsyncThunk(
  MedicineActionTypes.MEDICINE_UPDATE,
  async (
    { id, body }: { id: number; body: Partial<ICreateMedicineRequest> },
    { rejectWithValue },
  ) => {
    try {
      const response = await updateMedicineApi(id, body);
      successToast("Medicine updated successfully");
      return response.data;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

const deleteMedicineAsyncThunk = createAsyncThunk(
  MedicineActionTypes.MEDICINE_DELETE,
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await deleteMedicineApi(id);
      successToast("Medicine deleted successfully");
      return response.data;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

export {
  getAllMedicinesAsyncThunk,
  getMedicineByIdAsyncThunk,
  createMedicineAsyncThunk,
  updateMedicineAsyncThunk,
  deleteMedicineAsyncThunk,
};
