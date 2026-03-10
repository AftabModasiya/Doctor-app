import { createSlice } from "@reduxjs/toolkit";
import type { ISpecialization } from "@models/specialization";
import { getSpecializationsAsyncThunk } from "./specialization-async-thunk";
import { SliceNames } from "@constants/redux-constant";

interface SpecializationState {
  specializations: ISpecialization[];
  loading: boolean;
  error: string | null;
}

const initialState: SpecializationState = {
  specializations: [],
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
      .addCase(getSpecializationsAsyncThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSpecializationsAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        const list = action.payload?.data?.list;
        state.specializations = Array.isArray(list) ? list : [];
      })
      .addCase(getSpecializationsAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSpecializationError } = specializationSlice.actions;
export default specializationSlice.reducer;
