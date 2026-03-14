import { createSlice } from "@reduxjs/toolkit";
import { SliceNames } from "@constants/redux-constant";
import type { IMetadataItem } from "@models/metadata";
import { getDoctorMetadataAsyncThunk, getPatientMetadataAsyncThunk } from "./metadata-async-thunk";


interface MetadataState {
    patients: IMetadataItem[];
    doctors: IMetadataItem[];
    loading: boolean;
    error: string | null;
}

const initialState: MetadataState = {
    patients: [],
    doctors: [],
    loading: false,
    error: null,
};

const metadataSlice = createSlice({
    name: SliceNames.METADATA,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Patient Metadata
            .addCase(getPatientMetadataAsyncThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPatientMetadataAsyncThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.patients = action.payload?.data?.list || [];
            })
            .addCase(getPatientMetadataAsyncThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Doctor Metadata
            .addCase(getDoctorMetadataAsyncThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getDoctorMetadataAsyncThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.doctors = action.payload?.data?.list || [];
            })
            .addCase(getDoctorMetadataAsyncThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default metadataSlice.reducer;
