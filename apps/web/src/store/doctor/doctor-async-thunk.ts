import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createDoctorApi,
  deleteDoctorApi,
  getDoctorByIdApi,
  getDoctorsApi,
  updateDoctorApi,
} from "@services/doctor-service";
import type { ICreateDoctorRequest } from "@models/doctor";
import {
  enqueueErrorToast,
  successToast,
} from "@shared/services/toast-service";
import { DoctorActionTypes } from "@constants/doctor-constant";
import type { AxiosError } from "axios";

const getErrorMessage = (
  error: unknown,
  fallback = "Something went wrong",
): string => {
  const axiosError = error as AxiosError<{ message?: string }>;
  return axiosError?.response?.data?.message || axiosError?.message || fallback;
};

const getDoctorsAsyncThunk = createAsyncThunk(
  DoctorActionTypes.DOCTOR_GET_ALL,
  async (_, { rejectWithValue }) => {
    try {
      const response = await getDoctorsApi();
      return response.data;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

const getDoctorByIdAsyncThunk = createAsyncThunk(
  DoctorActionTypes.DOCTOR_GET_BY_ID,
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getDoctorByIdApi(id);
      return response.data;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

const createDoctorAsyncThunk = createAsyncThunk(
  DoctorActionTypes.DOCTOR_CREATE,
  async (body: ICreateDoctorRequest, { rejectWithValue }) => {
    try {
      const response = await createDoctorApi(body);
      successToast("Doctor created successfully");
      return response.data;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

const updateDoctorAsyncThunk = createAsyncThunk(
  DoctorActionTypes.DOCTOR_UPDATE,
  async (
    { id, body }: { id: string; body: Partial<ICreateDoctorRequest> },
    { rejectWithValue },
  ) => {
    try {
      const response = await updateDoctorApi(id, body);
      successToast("Doctor updated successfully");
      return response.data;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

const deleteDoctorAsyncThunk = createAsyncThunk(
  DoctorActionTypes.DOCTOR_DELETE,
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await deleteDoctorApi(id);
      successToast("Doctor deleted successfully");
      return response.data;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

export {
  getDoctorsAsyncThunk,
  getDoctorByIdAsyncThunk,
  createDoctorAsyncThunk,
  updateDoctorAsyncThunk,
  deleteDoctorAsyncThunk,
};
