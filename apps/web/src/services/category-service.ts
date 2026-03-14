import { CategoryEndpoints } from "@endpoints/category-endpoint";
import type {
  ICreateCategoryRequest,
  ICategoryListResponse,
  ISingleCategoryResponse,
} from "@models/category";
import { DELETE, GET, PATCH, POST } from "@shared/services/api-service";

const getCategoriesApi = () =>
  GET<ICategoryListResponse>({ URL: CategoryEndpoints.getCategories });

const getCategoryByIdApi = (id: string) =>
  GET<ISingleCategoryResponse>({ URL: CategoryEndpoints.getCategoryById(id) });

const createCategoryApi = (body: ICreateCategoryRequest) =>
  POST<ICreateCategoryRequest>({ URL: CategoryEndpoints.createCategory, body });

const updateCategoryApi = (id: string, body: Partial<ICreateCategoryRequest>) =>
  PATCH<Partial<ICreateCategoryRequest>>({
    URL: CategoryEndpoints.updateCategory(id),
    body,
  });

const deleteCategoryApi = (id: string) =>
  DELETE<undefined>({ URL: CategoryEndpoints.deleteCategory(id) });

export {
  getCategoriesApi,
  getCategoryByIdApi,
  createCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
};
