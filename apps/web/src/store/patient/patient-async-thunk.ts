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
  IUpdatePatientRequest,
} from "@models/patient";

const getPatientsAsyncThunk = createAsyncThunk(
  "patient/getPatients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPatientsApi();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
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
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);

const createPatientAsyncThunk = createAsyncThunk(
  "patient/createPatient",
  async (body: ICreatePatientRequest, { rejectWithValue }) => {
    try {
      const response = await createPatientApi(body);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);

const updatePatientAsyncThunk = createAsyncThunk(
  "patient/updatePatient",
  async (
    { id, body }: { id: string; body: IUpdatePatientRequest },
    { rejectWithValue },
  ) => {
    try {
      const response = await updatePatientApi(id, body);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);

const deletePatientAsyncThunk = createAsyncThunk(
  "patient/deletePatient",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await deletePatientApi(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
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