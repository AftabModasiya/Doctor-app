import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createPatientApi,
  deletePatientApi,
  getPatientByIdApi,
  getPatientsApi,
  updatePatientApi,
} from "@services/patient-service";
import type {
  ICreatePatientRequest,
} from "@models/patient";
import { enqueueErrorToast, successToast } from "@shared/services/toast-service";

const getPatientsAsyncThunk = createAsyncThunk(
  "patient/getPatients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPatientsApi();
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

const getPatientByIdAsyncThunk = createAsyncThunk(
  "patient/getPatientById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getPatientByIdApi(id);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

const createPatientAsyncThunk = createAsyncThunk(
  "patient/createPatient",
  async (body: ICreatePatientRequest, { rejectWithValue }) => {
    try {
      const response = await createPatientApi(body);
      successToast("Patient created successfully");
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

const updatePatientAsyncThunk = createAsyncThunk(
  "patient/updatePatient",
  async (
    { id, body }: { id: string; body: Partial<ICreatePatientRequest> },
    { rejectWithValue },
  ) => {
    try {
      const response = await updatePatientApi(id, body);
      successToast("Patient updated successfully");
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

const deletePatientAsyncThunk = createAsyncThunk(
  "patient/deletePatient",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await deletePatientApi(id);
      successToast("Patient deleted successfully");
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
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