const BASE_PATIENT_ENDPOINT = "/patients";

const PatientEndpoints = {
  getPatients: `${BASE_PATIENT_ENDPOINT}`,
  getPatientById: (id: string) => `${BASE_PATIENT_ENDPOINT}/${id}`,
  createPatient: `${BASE_PATIENT_ENDPOINT}`,
  updatePatient: (id: string) => `${BASE_PATIENT_ENDPOINT}/${id}`,
  deletePatient: (id: string) => `${BASE_PATIENT_ENDPOINT}/${id}`,
};

export { PatientEndpoints, BASE_PATIENT_ENDPOINT };
