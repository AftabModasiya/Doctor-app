import { createSlice } from "@reduxjs/toolkit";
import type { ISpecialization } from "@models/specialization";
import { SliceNames } from "@constants/redux-constant";
import {
  getSpecializationsAsyncThunk,
  createSpecializationAsyncThunk,
  updateSpecializationAsyncThunk,
  deleteSpecializationAsyncThunk,
} from "./specialization-async-thunk";

interface SpecializationState {
  specializations: ISpecialization[];
  isFetching: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: SpecializationState = {
  specializations: [],
  isFetching: false,
  loading: false,
  error: null,
};

const specializationSlice = createSlice({
  name: SliceNames.SPECIALIZATION,
  initialState,
  reducers: {
    clearSpecializationError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ── Get All
      .addCase(getSpecializationsAsyncThunk.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(getSpecializationsAsyncThunk.fulfilled, (state, action) => {
        state.isFetching = false;
        const list = action.payload?.data?.list;
        state.specializations = Array.isArray(list) ? list : [];
      })
      .addCase(getSpecializationsAsyncThunk.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload as string;
      })
      // ── Create
      .addCase(createSpecializationAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSpecializationAsyncThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createSpecializationAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // ── Update
      .addCase(updateSpecializationAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSpecializationAsyncThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateSpecializationAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // ── Delete
      .addCase(deleteSpecializationAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSpecializationAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = Number(action.meta.arg);
        state.specializations = state.specializations.filter(
          (s) => Number(s.id) !== deletedId,
        );
      })
      .addCase(deleteSpecializationAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSpecializationError } = specializationSlice.actions;
export default specializationSlice.reducer;
