const BASE_PRESCRIPTION_ENDPOINT = "/prescription";

const PrescriptionEndpoints = {
    getPrescriptions: `${BASE_PRESCRIPTION_ENDPOINT}`,
    getPrescriptionById: (id: number) => `${BASE_PRESCRIPTION_ENDPOINT}/${id}`,
    createPrescription: `${BASE_PRESCRIPTION_ENDPOINT}`,
    updatePrescription: (id: number) => `${BASE_PRESCRIPTION_ENDPOINT}/${id}`,
    deletePrescription: (id: number) => `${BASE_PRESCRIPTION_ENDPOINT}/${id}`,
};

export { PrescriptionEndpoints, BASE_PRESCRIPTION_ENDPOINT };
