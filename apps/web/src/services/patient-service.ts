import { PatientEndpoints } from "@endpoints/patient-endpoint";
import type {
  ICreatePatientRequest,
  IPatientResponse,
  ISinglePatientResponse,
} from "@models/patient";
import { DELETE, GET, POST, PUT } from "@shared/services/api-service";

const getPatientsApi = () => {
  return GET<IPatientResponse>({
    URL: PatientEndpoints.getPatients,
  });
};

const getPatientByIdApi = (id: string) => {
  return GET<ISinglePatientResponse>({
    URL: PatientEndpoints.getPatientById(id),
  });
};

const createPatientApi = (body: ICreatePatientRequest) => {
  return POST<ICreatePatientRequest>({
    URL: PatientEndpoints.createPatient,
    body,
  });
};

const updatePatientApi = (id: string, body: ICreatePatientRequest) => {
  return PUT<ICreatePatientRequest>({
    URL: PatientEndpoints.updatePatient(id),
    body,
  });
};

const deletePatientApi = (id: string) => {
  return DELETE<any>({
    URL: PatientEndpoints.deletePatient(id),
  });
};

export {
  getPatientsApi,
  getPatientByIdApi,
  createPatientApi,
  updatePatientApi,
  deletePatientApi,
};

