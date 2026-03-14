type ICreateSpecializationRequest = {
  name: string;
  companyId: number;
};

type ISpecialization = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdBy: string | null;
  updatedBy: string | null;
  name: string;
  companyId: number;
};

type ISpecializationListResponse = {
  success: boolean;
  data: {
    count: number;
    list: ISpecialization[];
  };
  statusCode: number;
  message: string;
};

type ISingleSpecializationResponse = {
  success: boolean;
  data: ISpecialization;
  statusCode: number;
  message: string;
};

export type {
  ISpecialization,
  ISpecializationListResponse,
  ISingleSpecializationResponse,
  ICreateSpecializationRequest,
};
