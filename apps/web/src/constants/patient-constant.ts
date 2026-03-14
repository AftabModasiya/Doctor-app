import { BASE_PATIENT_ENDPOINT } from "@endpoints/patient-endpoint";

const PatientActionTypes = {
  PATIENT_GET_ALL: `${BASE_PATIENT_ENDPOINT}`,
  PATIENT_GET_BY_ID: `${BASE_PATIENT_ENDPOINT}/get-by-id`,
  PATIENT_CREATE: `${BASE_PATIENT_ENDPOINT}/create`,
  PATIENT_UPDATE: `${BASE_PATIENT_ENDPOINT}/update`,
  PATIENT_DELETE: `${BASE_PATIENT_ENDPOINT}/delete`,
};

export { PatientActionTypes };
