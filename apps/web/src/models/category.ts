type ICategory = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdBy: string | null;
  updatedBy: string | null;
  name: string;
  companyId: number;
};

type ICategoryListResponse = {
  success: boolean;
  data: {
    count: number;
    list: ICategory[];
  };
  statusCode: number;
  message: string;
};

type ISingleCategoryResponse = {
  success: boolean;
  data: ICategory;
  statusCode: number;
  message: string;
};

type ICreateCategoryRequest = {
  name: string;
  companyId: number;
};

export type {
  ICategory,
  ICategoryListResponse,
  ISingleCategoryResponse,
  ICreateCategoryRequest,
};
