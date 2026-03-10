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
        const data = action.payload?.data;
        state.patients = Array.isArray(data?.patients) ? data.patients : (Array.isArray(data) ? data : []);
      })
      .addCase(getPatientsAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get Patient By Id
      .addCase(getPatientByIdAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPatient = action.payload?.data?.patient || action.payload?.data || null;
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
        const newPatient = action.payload?.data?.patient || action.payload?.data;
        if (newPatient) {
          state.patients.unshift(newPatient);
        }
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
        const updatedPatient = action.payload?.data?.patient || action.payload?.data;
        if (updatedPatient) {
          const index = state.patients.findIndex(
            (p) => p.id === updatedPatient.id,
          );
          if (index !== -1) {
            state.patients[index] = updatedPatient;
          }
          if (state.selectedPatient?.id === updatedPatient.id) {
            state.selectedPatient = updatedPatient;
          }
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
        // The delete thunk returns the response which for delete might not contain the id in data
        // We use the meta.arg which is the id passed to the thunk
        const deletedId = Number(action.meta.arg);
        state.patients = state.patients.filter((p) => Number(p.id) !== deletedId);
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
