import { createSlice } from "@reduxjs/toolkit";
import type { IDegree } from "@models/degree";
import { SliceNames } from "@constants/redux-constant";
import {
  getDegreesAsyncThunk,
  createDegreeAsyncThunk,
  updateDegreeAsyncThunk,
  deleteDegreeAsyncThunk,
} from "./degree-async-thunk";

interface DegreeState {
  degrees: IDegree[];
  isFetching: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: DegreeState = {
  degrees: [],
  isFetching: false,
  loading: false,
  error: null,
};

const degreeSlice = createSlice({
  name: SliceNames.DEGREE,
  initialState,
  reducers: {
    clearDegreeError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ── Get All
      .addCase(getDegreesAsyncThunk.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(getDegreesAsyncThunk.fulfilled, (state, action) => {
        state.isFetching = false;
        const list = action.payload?.data?.list;
        state.degrees = Array.isArray(list) ? list : [];
      })
      .addCase(getDegreesAsyncThunk.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload as string;
      })
      // ── Create
      .addCase(createDegreeAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDegreeAsyncThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createDegreeAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // ── Update
      .addCase(updateDegreeAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDegreeAsyncThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateDegreeAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // ── Delete
      .addCase(deleteDegreeAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDegreeAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = Number(action.meta.arg);
        state.degrees = state.degrees.filter((d) => Number(d.id) !== deletedId);
      })
      .addCase(deleteDegreeAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearDegreeError } = degreeSlice.actions;
export default degreeSlice.reducer;
