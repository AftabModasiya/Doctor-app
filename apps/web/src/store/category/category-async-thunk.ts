import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import {
  getCategoriesApi,
  getCategoryByIdApi,
  createCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
} from "@services/category-service";
import type { ICreateCategoryRequest } from "@models/category";
import {
  enqueueErrorToast,
  successToast,
} from "@shared/services/toast-service";
import { CategoryActionTypes } from "@constants/category-constant";

const getErrorMessage = (
  error: unknown,
  fallback = "Something went wrong",
): string => {
  const axiosError = error as AxiosError<{ message?: string }>;
  return axiosError?.response?.data?.message || axiosError?.message || fallback;
};

const getCategoriesAsyncThunk = createAsyncThunk(
  CategoryActionTypes.CATEGORY_GET_ALL,
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCategoriesApi();
      return response.data;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

const getCategoryByIdAsyncThunk = createAsyncThunk(
  CategoryActionTypes.CATEGORY_GET_BY_ID,
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getCategoryByIdApi(id);
      return response.data;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

const createCategoryAsyncThunk = createAsyncThunk(
  CategoryActionTypes.CATEGORY_CREATE,
  async (body: ICreateCategoryRequest, { rejectWithValue }) => {
    try {
      const response = await createCategoryApi(body);
      successToast("Category created successfully");
      return response.data;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

const updateCategoryAsyncThunk = createAsyncThunk(
  CategoryActionTypes.CATEGORY_UPDATE,
  async (
    { id, body }: { id: string; body: Partial<ICreateCategoryRequest> },
    { rejectWithValue },
  ) => {
    try {
      const response = await updateCategoryApi(id, body);
      successToast("Category updated successfully");
      return response.data;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

const deleteCategoryAsyncThunk = createAsyncThunk(
  CategoryActionTypes.CATEGORY_DELETE,
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await deleteCategoryApi(id);
      successToast("Category deleted successfully");
      return response.data;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      enqueueErrorToast(message);
      return rejectWithValue(message);
    }
  },
);

export {
  getCategoriesAsyncThunk,
  getCategoryByIdAsyncThunk,
  createCategoryAsyncThunk,
  updateCategoryAsyncThunk,
  deleteCategoryAsyncThunk,
};
