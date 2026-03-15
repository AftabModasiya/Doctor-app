import { BASE_PATIENT_ENDPOINT } from "./patient-endpoint";
import { BASE_DOCTOR_ENDPOINT } from "./doctor-endpoint";
import { BASE_MEDICINE_ENDPOINT } from "./medicine-endpoint";

const MetadataEndpoints = {
    getPatientMetadata: `${BASE_PATIENT_ENDPOINT}/metadata`,
    getDoctorMetadata: `${BASE_DOCTOR_ENDPOINT}/metadata`,
    getMedicineMetadata: `${BASE_MEDICINE_ENDPOINT}/metadata`,
};

export { MetadataEndpoints };
