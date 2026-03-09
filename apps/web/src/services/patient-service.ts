import { PatientEndpoints } from "@endpoints/patient-endpoint";
import type {
  ICreatePatientRequest,
  IPatientResponse,
  ISinglePatientResponse,
  IUpdatePatientRequest,
} from "@models/patient";
import { DELETE, GET, POST, PUT } from "@shared/services/api-service";

export const getPatientsApi = () => {
  return GET<IPatientResponse>({
    URL: PatientEndpoints.getPatients,
  });
};

export const getPatientByIdApi = (id: string) => {
  return GET<ISinglePatientResponse>({
    URL: PatientEndpoints.getPatientById(id),
  });
};

export const createPatientApi = (body: ICreatePatientRequest) => {
  return POST<ICreatePatientRequest>({
    URL: PatientEndpoints.createPatient,
    body,
  });
};

export const updatePatientApi = (id: string, body: IUpdatePatientRequest) => {
  return PUT<IUpdatePatientRequest>({
    URL: PatientEndpoints.updatePatient(id),
    body,
  });
};

export const deletePatientApi = (id: string) => {
  return DELETE<any>({
    URL: PatientEndpoints.deletePatient(id),
  });
};
