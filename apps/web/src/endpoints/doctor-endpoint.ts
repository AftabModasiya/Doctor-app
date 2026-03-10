const BASE_DOCTOR_ENDPOINT = "/doctor";

const DoctorEndpoints = {
  getDoctors: `${BASE_DOCTOR_ENDPOINT}`,
  getDoctorById: (id: string) => `${BASE_DOCTOR_ENDPOINT}/${id}`,
  createDoctor: `${BASE_DOCTOR_ENDPOINT}`,
  updateDoctor: (id: string) => `${BASE_DOCTOR_ENDPOINT}/${id}`,
  deleteDoctor: (id: string) => `${BASE_DOCTOR_ENDPOINT}/${id}`,
};

export { DoctorEndpoints, BASE_DOCTOR_ENDPOINT };
