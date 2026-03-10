import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import {
  getSpecializationsApi,
  getSpecializationByIdApi,
  createSpecializationApi,
  updateSpecializationApi,
  deleteSpecializationApi,
} from "@services/specialization-service";
import type { ICreateSpecializationRequest } from "@models/specialization";
import {
  enqueueErrorToast,
  successToast,
} from "@shared/services/toast-service";
import { SpecializationActionTypes } from "@constants/specialization-constant";

const getErrorMessage = (
  error: unknown,
  fallback = "Something went wrong",
): string => {
  const axiosError = error as AxiosError<{ message?: string }>;
  return axiosError?.response?.data?.message || axiosError?.message || fallback;
};

const getSpecializationsAsyncThunk = createAsyncThunk(
  SpecializationActionTypes.SPECIALIZATION_GET_ALL,
  async (_, { rejectWithValue }) => {
    try {
      const response = await getSpecializationsApi();
      return response.data;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

const getSpecializationByIdAsyncThunk = createAsyncThunk(
  SpecializationActionTypes.SPECIALIZATION_GET_BY_ID,
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getSpecializationByIdApi(id);
      return response.data;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

const createSpecializationAsyncThunk = createAsyncThunk(
  SpecializationActionTypes.SPECIALIZATION_CREATE,
  async (body: ICreateSpecializationRequest, { rejectWithValue }) => {
    try {
      const response = await createSpecializationApi(body);
      successToast("Specialization created successfully");
      return response.data;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

const updateSpecializationAsyncThunk = createAsyncThunk(
  SpecializationActionTypes.SPECIALIZATION_UPDATE,
  async (
    { id, body }: { id: string; body: Partial<ICreateSpecializationRequest> },
    { rejectWithValue },
  ) => {
    try {
      const response = await updateSpecializationApi(id, body);
      successToast("Specialization updated successfully");
      return response.data;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

const deleteSpecializationAsyncThunk = createAsyncThunk(
  SpecializationActionTypes.SPECIALIZATION_DELETE,
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await deleteSpecializationApi(id);
      successToast("Specialization deleted successfully");
      return response.data;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

export {
  getSpecializationsAsyncThunk,
  getSpecializationByIdAsyncThunk,
  createSpecializationAsyncThunk,
  updateSpecializationAsyncThunk,
  deleteSpecializationAsyncThunk,
};
