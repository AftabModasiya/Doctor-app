import { createSlice } from "@reduxjs/toolkit";
import type { ICategory } from "@models/category";
import { SliceNames } from "@constants/redux-constant";
import {
  getCategoriesAsyncThunk,
  createCategoryAsyncThunk,
  updateCategoryAsyncThunk,
  deleteCategoryAsyncThunk,
} from "./category-async-thunk";

interface CategoryState {
  categories: ICategory[];
  isFetching: boolean; // only during GET list — drives full-page Loader
  loading: boolean; // during create / update / delete — drives button spinners
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  isFetching: false,
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: SliceNames.CATEGORY,
  initialState,
  reducers: {
    clearCategoryError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ── Get All
      .addCase(getCategoriesAsyncThunk.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(getCategoriesAsyncThunk.fulfilled, (state, action) => {
        state.isFetching = false;
        const list = action.payload?.data?.list;
        state.categories = Array.isArray(list) ? list : [];
      })
      .addCase(getCategoriesAsyncThunk.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload as string;
      })
      // ── Create
      .addCase(createCategoryAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategoryAsyncThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createCategoryAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // ── Update
      .addCase(updateCategoryAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategoryAsyncThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateCategoryAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // ── Delete
      .addCase(deleteCategoryAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategoryAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = Number(action.meta.arg);
        state.categories = state.categories.filter(
          (c) => Number(c.id) !== deletedId,
        );
      })
      .addCase(deleteCategoryAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCategoryError } = categorySlice.actions;
export default categorySlice.reducer;
