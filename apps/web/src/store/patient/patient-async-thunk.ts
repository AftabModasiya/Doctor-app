import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createPatientApi,
  deletePatientApi,
  getPatientByIdApi,
  getPatientsApi,
  updatePatientApi,
} from "@services/patient-service";
import type { ICreatePatientRequest } from "@models/patient";
import {
  enqueueErrorToast,
  successToast,
} from "@shared/services/toast-service";
import { PatientActionTypes } from "@constants/patient-constant";
import type { AxiosError } from "axios";

const getErrorMessage = (
  error: unknown,
  fallback = "Something went wrong",
): string => {
  const axiosError = error as AxiosError<{ message?: string }>;
  return axiosError?.response?.data?.message || axiosError?.message || fallback;
};

const getPatientsAsyncThunk = createAsyncThunk(
  PatientActionTypes.PATIENT_GET_ALL,
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPatientsApi();
      return response.data;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

const getPatientByIdAsyncThunk = createAsyncThunk(
  PatientActionTypes.PATIENT_GET_BY_ID,
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getPatientByIdApi(id);
      return response.data;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

const createPatientAsyncThunk = createAsyncThunk(
  PatientActionTypes.PATIENT_CREATE,
  async (body: ICreatePatientRequest, { rejectWithValue }) => {
    try {
      const response = await createPatientApi(body);
      successToast("Patient created successfully");
      return response.data;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

const updatePatientAsyncThunk = createAsyncThunk(
  PatientActionTypes.PATIENT_UPDATE,
  async (
    { id, body }: { id: string; body: Partial<ICreatePatientRequest> },
    { rejectWithValue },
  ) => {
    try {
      const response = await updatePatientApi(id, body);
      successToast("Patient updated successfully");
      return response.data;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

const deletePatientAsyncThunk = createAsyncThunk(
  PatientActionTypes.PATIENT_DELETE,
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await deletePatientApi(id);
      successToast("Patient deleted successfully");
      return response.data;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

export {
  getPatientsAsyncThunk,
  getPatientByIdAsyncThunk,
  createPatientAsyncThunk,
  updatePatientAsyncThunk,
  deletePatientAsyncThunk,
};
