import type { ICategory } from "./category";

type IMedicine = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdBy: string | null;
  updatedBy: string | null;
  name: string;
  companyId: number;
  categoryId: number;
  category?: ICategory;
};

type IMedicineListResponse = {
  success: boolean;
  data: {
    count: number;
    list: IMedicine[];
  };
  statusCode: number;
  message: string;
};

type ISingleMedicineResponse = {
  success: boolean;
  data: IMedicine;
  statusCode: number;
  message: string;
};

type ICreateMedicineRequest = {
  name: string;
  categoryId: number;
  companyId: number;
};

export type {
  IMedicine,
  IMedicineListResponse,
  ISingleMedicineResponse,
  ICreateMedicineRequest,
};
