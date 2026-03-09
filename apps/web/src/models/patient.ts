type IPatient = {
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

type IPatientResponse = {
  data: IPatient[];
  message: string;
  status: number;
}

type ISinglePatientResponse = {
  data: IPatient;
  message: string;
  status: number;
}

type ICreatePatientRequest = {
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  address: string;
}



export type {
  IPatientResponse,
  ISinglePatientResponse,
  ICreatePatientRequest,
  IPatient
}