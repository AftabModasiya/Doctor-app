import { BASE_PATIENT_ENDPOINT } from "./patient-endpoint";
import { BASE_DOCTOR_ENDPOINT } from "./doctor-endpoint";

const MetadataEndpoints = {
    getPatientMetadata: `${BASE_PATIENT_ENDPOINT}/metadata`,
    getDoctorMetadata: `${BASE_DOCTOR_ENDPOINT}/metadata`,
};

export { MetadataEndpoints };
