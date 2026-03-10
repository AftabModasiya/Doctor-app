import { createSlice } from "@reduxjs/toolkit";
import { SliceNames } from "@constants/redux-constant";
import {
  getAllMedicinesAsyncThunk,
  getMedicineByIdAsyncThunk,
  createMedicineAsyncThunk,
  updateMedicineAsyncThunk,
  deleteMedicineAsyncThunk,
} from "./medicine-async-thunk";
import type { IMedicine } from "@models/medicine";

interface MedicineState {
  medicines: IMedicine[];
  currentMedicine: IMedicine | null;
  isFetching: boolean;
  loading: boolean;
  error: string | null;
  count: number;
}

const initialState: MedicineState = {
  medicines: [],
  currentMedicine: null,
  isFetching: false,
  loading: false,
  error: null,
  count: 0,
};

const medicineSlice = createSlice({
  name: SliceNames.MEDICINE,
  initialState,
  reducers: {
    resetMedicineState: (state) => {
      state.currentMedicine = null;
      state.error = null;
    },
    clearMedicineError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ── Get All
      .addCase(getAllMedicinesAsyncThunk.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(getAllMedicinesAsyncThunk.fulfilled, (state, action) => {
        state.isFetching = false;
        const list = action.payload?.data?.list;
        state.medicines = Array.isArray(list) ? list : [];
        state.count = action.payload?.data?.count || 0;
      })
      .addCase(getAllMedicinesAsyncThunk.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload as string;
      })
      // ── Get By Id
      .addCase(getMedicineByIdAsyncThunk.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(getMedicineByIdAsyncThunk.fulfilled, (state, action) => {
        state.isFetching = false;
        state.currentMedicine = action.payload;
      })
      .addCase(getMedicineByIdAsyncThunk.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload as string;
      })
      // ── Create
      .addCase(createMedicineAsyncThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMedicineAsyncThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createMedicineAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // ── Update
      .addCase(updateMedicineAsyncThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMedicineAsyncThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateMedicineAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // ── Delete
      .addCase(deleteMedicineAsyncThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMedicineAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = Number(action.meta.arg);
        state.medicines = state.medicines.filter(
          (m) => Number(m.id) !== deletedId,
        );
        state.count -= 1;
      })
      .addCase(deleteMedicineAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetMedicineState, clearMedicineError } = medicineSlice.actions;
export default medicineSlice.reducer;
