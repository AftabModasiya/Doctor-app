import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IDoctor } from "@models/doctor";
import {
  createDoctorAsyncThunk,
  deleteDoctorAsyncThunk,
  getDoctorByIdAsyncThunk,
  getDoctorsAsyncThunk,
  updateDoctorAsyncThunk,
} from "./doctor-async-thunk";
import { SliceNames } from "@constants/redux-constant";

interface DoctorState {
  doctors: IDoctor[];
  selectedDoctor: IDoctor | null;
  isFetching: boolean; // true only during GET /doctor list — drives full-page Loader
  loading: boolean; // true during create / update / delete — drives button spinners
  error: string | null;
}

const initialState: DoctorState = {
  doctors: [],
  selectedDoctor: null,
  isFetching: false,
  loading: false,
  error: null,
};

const doctorSlice = createSlice({
  name: SliceNames.DOCTOR,
  initialState,
  reducers: {
    clearDoctorError: (state) => {
      state.error = null;
    },
    selectDoctor: (state, action: PayloadAction<IDoctor | null>) => {
      state.selectedDoctor = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ── Get All Doctors (uses isFetching for full-page loader)
      .addCase(getDoctorsAsyncThunk.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(getDoctorsAsyncThunk.fulfilled, (state, action) => {
        state.isFetching = false;
        const data = action.payload?.data;
        // Handle both list and doctors for robustness
        state.doctors = Array.isArray(data?.list)
          ? data.list
          : Array.isArray(data?.doctors)
            ? data.doctors
            : Array.isArray(data)
              ? data
              : [];
      })
      .addCase(getDoctorsAsyncThunk.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload as string;
      })
      // ── Get Doctor By Id
      .addCase(getDoctorByIdAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDoctorByIdAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDoctor =
          action.payload?.data?.doctor || action.payload?.data || null;
      })
      .addCase(getDoctorByIdAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // ── Create Doctor
      .addCase(createDoctorAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDoctorAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        const newDoctor = action.payload?.data?.doctor || action.payload?.data;
        if (newDoctor) state.doctors.unshift(newDoctor);
      })
      .addCase(createDoctorAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // ── Update Doctor
      .addCase(updateDoctorAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDoctorAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        const updatedDoctor =
          action.payload?.data?.doctor || action.payload?.data;
        if (updatedDoctor) {
          const index = state.doctors.findIndex(
            (d) => d.id === updatedDoctor.id,
          );
          if (index !== -1) state.doctors[index] = updatedDoctor;
          if (state.selectedDoctor?.id === updatedDoctor.id) {
            state.selectedDoctor = updatedDoctor;
          }
        }
      })
      .addCase(updateDoctorAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // ── Delete Doctor
      .addCase(deleteDoctorAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDoctorAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = Number(action.meta.arg);
        state.doctors = state.doctors.filter((d) => Number(d.id) !== deletedId);
        if (state.selectedDoctor?.id === deletedId) {
          state.selectedDoctor = null;
        }
      })
      .addCase(deleteDoctorAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearDoctorError, selectDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;
