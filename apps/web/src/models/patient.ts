type IPatient = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdBy: string | null;
  updatedBy: string | null;
  userId: number;
  companyId: number;
  address: string;
  bloodGroup: string;
  status: "active" | "inactive";
  user: {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    createdBy: string | null;
    updatedBy: string | null;
    name: string;
    gender: "male" | "female" | "other";
    age: number;
    email: string;
    mobile: string;
  };
  company: {
    id: number;
    name: string;
    address: string;
    logo: string;
  };
}

type IPatientResponse = {
  success: boolean;
  data: {
    list: IPatient[];
  };
  statusCode: number;
}

type ISinglePatientResponse = {
  success: boolean;
  data: IPatient;
  statusCode: number;
}

type ICreatePatientRequest = {
  name: string;
  email: string;
  mobile: string;
  age: number;
  gender: "male" | "female" | "other";
  address: string;
  bloodGroup: string;
  status: "active" | "inactive";
  companyId: number;
}

export type {
  IPatientResponse,
  ISinglePatientResponse,
  ICreatePatientRequest,
  IPatient
};