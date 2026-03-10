import { createSlice } from "@reduxjs/toolkit";
import type { IDegree } from "@models/degree";
import { getDegreesAsyncThunk } from "./degree-async-thunk";
import { SliceNames } from "@constants/redux-constant";

interface DegreeState {
  degrees: IDegree[];
  loading: boolean;
  error: string | null;
}

const initialState: DegreeState = {
  degrees: [],
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
      .addCase(getDegreesAsyncThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDegreesAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        const list = action.payload?.data?.list;
        state.degrees = Array.isArray(list) ? list : [];
      })
      .addCase(getDegreesAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearDegreeError } = degreeSlice.actions;
export default degreeSlice.reducer;
