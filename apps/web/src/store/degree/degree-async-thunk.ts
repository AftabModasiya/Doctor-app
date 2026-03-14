import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import {
  getDegreesApi,
  getDegreeByIdApi,
  createDegreeApi,
  updateDegreeApi,
  deleteDegreeApi,
} from "@services/degree-service";
import type { ICreateDegreeRequest } from "@models/degree";
import {
  enqueueErrorToast,
  successToast,
} from "@shared/services/toast-service";
import { DegreeActionTypes } from "@constants/degree-constant";

const getErrorMessage = (
  error: unknown,
  fallback = "Something went wrong",
): string => {
  const axiosError = error as AxiosError<{ message?: string }>;
  return axiosError?.response?.data?.message || axiosError?.message || fallback;
};

const getDegreesAsyncThunk = createAsyncThunk(
  DegreeActionTypes.DEGREE_GET_ALL,
  async (_, { rejectWithValue }) => {
    try {
      const response = await getDegreesApi();
      return response.data;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

const getDegreeByIdAsyncThunk = createAsyncThunk(
  DegreeActionTypes.DEGREE_GET_BY_ID,
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getDegreeByIdApi(id);
      return response.data;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

const createDegreeAsyncThunk = createAsyncThunk(
  DegreeActionTypes.DEGREE_CREATE,
  async (body: ICreateDegreeRequest, { rejectWithValue }) => {
    try {
      const response = await createDegreeApi(body);
      successToast("Degree created successfully");
      return response.data;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

const updateDegreeAsyncThunk = createAsyncThunk(
  DegreeActionTypes.DEGREE_UPDATE,
  async (
    { id, body }: { id: string; body: Partial<ICreateDegreeRequest> },
    { rejectWithValue },
  ) => {
    try {
      const response = await updateDegreeApi(id, body);
      successToast("Degree updated successfully");
      return response.data;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

const deleteDegreeAsyncThunk = createAsyncThunk(
  DegreeActionTypes.DEGREE_DELETE,
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await deleteDegreeApi(id);
      successToast("Degree deleted successfully");
      return response.data;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

export {
  getDegreesAsyncThunk,
  getDegreeByIdAsyncThunk,
  createDegreeAsyncThunk,
  updateDegreeAsyncThunk,
  deleteDegreeAsyncThunk,
};
