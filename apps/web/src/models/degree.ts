type ICreateDegreeRequest = {
  name: string;
  companyId: number;
};

type IDegree = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdBy: string | null;
  updatedBy: string | null;
  name: string;
  companyId: number;
};

type IDegreeListResponse = {
  success: boolean;
  data: {
    count: number;
    list: IDegree[];
  };
  statusCode: number;
  message: string;
};

type ISingleDegreeResponse = {
  success: boolean;
  data: IDegree;
  statusCode: number;
  message: string;
};

export type {
  IDegree,
  IDegreeListResponse,
  ISingleDegreeResponse,
  ICreateDegreeRequest,
};
