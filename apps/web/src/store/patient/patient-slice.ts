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
  isFetching: boolean; // true only during GET /patients list — drives full-page Loader
  loading: boolean; // true during create / update / delete — drives button spinners
  error: string | null;
}

const initialState: PatientState = {
  patients: [],
  selectedPatient: null,
  isFetching: false,
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
      // ── Get All Patients (uses isFetching for full-page loader)
      .addCase(getPatientsAsyncThunk.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(getPatientsAsyncThunk.fulfilled, (state, action) => {
        state.isFetching = false;
        const data = action.payload?.data;
        state.patients = Array.isArray(data?.patients)
          ? data.patients
          : Array.isArray(data)
            ? data
            : [];
      })
      .addCase(getPatientsAsyncThunk.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload as string;
      })
      // ── Get Patient By Id
      .addCase(getPatientByIdAsyncThunk.fulfilled, (state, action) => {
        state.selectedPatient =
          action.payload?.data?.patient || action.payload?.data || null;
      })
      .addCase(getPatientByIdAsyncThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // ── Create Patient
      .addCase(createPatientAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPatientAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        const newPatient =
          action.payload?.data?.patient || action.payload?.data;
        if (newPatient) {
          state.patients.unshift(newPatient);
        }
      })
      .addCase(createPatientAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // ── Update Patient
      .addCase(updatePatientAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePatientAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPatient =
          action.payload?.data?.patient || action.payload?.data;
        if (updatedPatient) {
          const index = state.patients.findIndex(
            (p) => p.id === updatedPatient.id,
          );
          if (index !== -1) state.patients[index] = updatedPatient;
          if (state.selectedPatient?.id === updatedPatient.id) {
            state.selectedPatient = updatedPatient;
          }
        }
      })
      .addCase(updatePatientAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // ── Delete Patient
      .addCase(deletePatientAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePatientAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = Number(action.meta.arg);
        state.patients = state.patients.filter(
          (p) => Number(p.id) !== deletedId,
        );
        if (state.selectedPatient?.id === deletedId) {
          state.selectedPatient = null;
        }
      })
      .addCase(deletePatientAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearPatientError, selectPatient } = patientSlice.actions;
export default patientSlice.reducer;
