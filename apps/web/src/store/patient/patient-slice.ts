import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IPatient } from "@models/patient";
import {
  createPatientAsyncThunk,
  deletePatientAsyncThunk,
  getPatientByIdAsyncThunk,
  getPatientsAsyncThunk,
  updatePatientAsyncThunk,
} from "./patient-async-thunk";
import { SliceNames } from "@constants/redux-constant";

interface PatientState {
  patients: IPatient[];
  selectedPatient: IPatient | null;
  loading: boolean;
  error: string | null;
}

const initialState: PatientState = {
  patients: [],
  selectedPatient: null,
  loading: false,
  error: null,
};

const patientSlice = createSlice({
  name: SliceNames.PATIENT,
  initialState,
  reducers: {
    clearPatientError: (state) => {
      state.error = null;
    },
    selectPatient: (state, action: PayloadAction<IPatient | null>) => {
      state.selectedPatient = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Patients
      .addCase(getPatientsAsyncThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPatientsAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = action.payload.data;
      })
      .addCase(getPatientsAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get Patient By Id
      .addCase(getPatientByIdAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPatientByIdAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPatient = action.payload.data;
      })
      .addCase(getPatientByIdAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create Patient
      .addCase(createPatientAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPatientAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.patients.push(action.payload.data);
      })
      .addCase(createPatientAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Patient
      .addCase(updatePatientAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePatientAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.patients.findIndex(
          (p) => p.id === action.payload.data.id,
        );
        if (index !== -1) {
          state.patients[index] = action.payload.data;
        }
        if (state.selectedPatient?.id === action.payload.data.id) {
          state.selectedPatient = action.payload.data;
        }
      })
      .addCase(updatePatientAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Patient
      .addCase(deletePatientAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePatientAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = state.patients.filter((p) => p.id !== action.meta.arg);
      })
      .addCase(deletePatientAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearPatientError, selectPatient } = patientSlice.actions;
export default patientSlice.reducer;
