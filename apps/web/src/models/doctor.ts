import type { ISpecialization } from "@models/specialization";
import type { IDegree } from "@models/degree";

type IDoctor = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdBy: string | null;
  updatedBy: string | null;
  userId: number;
  companyId: number;
  experience: number;
  graduationDate: string;
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
    countryCode?: string | null;
  };
  company: {
    id: number;
    name: string;
    address: string;
    logo: string;
  };
  /** The API returns arrays of nested objects, not flat IDs */
  specializations: ISpecialization[];
  degrees: IDegree[];
};

type IDoctorResponse = {
  success: boolean;
  data: {
    list: IDoctor[];
    count: number;
  };
  statusCode: number;
  message: string;
};

type ISingleDoctorResponse = {
  success: boolean;
  data: IDoctor;
  statusCode: number;
  message: string;
};

/** What the POST /api/doctor and PATCH /api/doctor/:id body expects */
type ICreateDoctorRequest = {
  name: string;
  email: string;
  mobile: string;
  gender: "male" | "female" | "other";
  age: number;
  companyId: number;
  experience: number;
  graduationDate: string;
  specializationId: number;
  degreeId: number;
};

export type {
  IDoctor,
  IDoctorResponse,
  ISingleDoctorResponse,
  ICreateDoctorRequest,
};
