import { createSlice } from "@reduxjs/toolkit";
import { SliceNames } from "@constants/redux-constant";
import type { IPrescription } from "@models/prescription";
import {
    createPrescriptionAsyncThunk,
    deletePrescriptionAsyncThunk,
    getPrescriptionByIdAsyncThunk,
    getPrescriptionsAsyncThunk,
    updatePrescriptionAsyncThunk,
} from "./prescription-async-thunk";

interface PrescriptionState {
    prescriptions: IPrescription[];
    currentPrescription: IPrescription | null;
    isFetching: boolean;
    loading: boolean;
    error: string | null;
    count: number;
}

const initialState: PrescriptionState = {
    prescriptions: [],
    currentPrescription: null,
    isFetching: false,
    loading: false,
    error: null,
    count: 0,
};

const prescriptionSlice = createSlice({
    name: SliceNames.PRESCRIPTION,
    initialState,
    reducers: {
        resetPrescriptionState: (state) => {
            state.currentPrescription = null;
            state.error = null;
        },
        clearPrescriptionError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // ── Get All
            .addCase(getPrescriptionsAsyncThunk.pending, (state) => {
                state.isFetching = true;
                state.error = null;
            })
            .addCase(getPrescriptionsAsyncThunk.fulfilled, (state, action) => {
                state.isFetching = false;
                const data = action.payload?.data?.list;
                state.prescriptions = Array.isArray(data?.list) ? data.list : [];
                state.count = data?.count || 0;
            })
            .addCase(getPrescriptionsAsyncThunk.rejected, (state, action) => {
                state.isFetching = false;
                state.error = action.payload as string;
            })
            // ── Get By Id
            .addCase(getPrescriptionByIdAsyncThunk.pending, (state) => {
                state.isFetching = true;
                state.error = null;
            })
            .addCase(getPrescriptionByIdAsyncThunk.fulfilled, (state, action) => {
                state.isFetching = false;
                state.currentPrescription = action.payload as any; // Adjust if payload structure differs
            })
            .addCase(getPrescriptionByIdAsyncThunk.rejected, (state, action) => {
                state.isFetching = false;
                state.error = action.payload as string;
            })
            // ── Create
            .addCase(createPrescriptionAsyncThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPrescriptionAsyncThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createPrescriptionAsyncThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // ── Update
            .addCase(updatePrescriptionAsyncThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePrescriptionAsyncThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updatePrescriptionAsyncThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // ── Delete
            .addCase(deletePrescriptionAsyncThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePrescriptionAsyncThunk.fulfilled, (state, action) => {
                state.loading = false;
                const deletedId = Number(action.meta.arg);
                state.prescriptions = state.prescriptions.filter(
                    (p) => Number(p.id) !== deletedId,
                );
                state.count -= 1;
            })
            .addCase(deletePrescriptionAsyncThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetPrescriptionState, clearPrescriptionError } = prescriptionSlice.actions;
export default prescriptionSlice.reducer;
