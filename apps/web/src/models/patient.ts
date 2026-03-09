export interface IPatient {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  address: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IPatientResponse {
  data: IPatient[];
  message: string;
  status: number;
}

export interface ISinglePatientResponse {
  data: IPatient;
  message: string;
  status: number;
}

export interface ICreatePatientRequest extends Omit<
  IPatient,
  "id" | "createdAt" | "updatedAt"
> {}
export interface IUpdatePatientRequest extends Partial<ICreatePatientRequest> {}
