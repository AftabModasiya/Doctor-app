import { BASE_DOCTOR_ENDPOINT } from "@endpoints/doctor-endpoint";

const DoctorActionTypes = {
  DOCTOR_GET_ALL: `${BASE_DOCTOR_ENDPOINT}`,
  DOCTOR_GET_BY_ID: `${BASE_DOCTOR_ENDPOINT}/get-by-id`,
  DOCTOR_CREATE: `${BASE_DOCTOR_ENDPOINT}/create`,
  DOCTOR_UPDATE: `${BASE_DOCTOR_ENDPOINT}/update`,
  DOCTOR_DELETE: `${BASE_DOCTOR_ENDPOINT}/delete`,
};

export { DoctorActionTypes };
