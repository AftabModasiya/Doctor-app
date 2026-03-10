const BASE_SPECIALIZATION_ENDPOINT = "/specialization";

const SpecializationEndpoints = {
  getSpecializations: `${BASE_SPECIALIZATION_ENDPOINT}`,
  getSpecializationById: (id: string) =>
    `${BASE_SPECIALIZATION_ENDPOINT}/${id}`,
  createSpecialization: `${BASE_SPECIALIZATION_ENDPOINT}`,
  updateSpecialization: (id: string) => `${BASE_SPECIALIZATION_ENDPOINT}/${id}`,
  deleteSpecialization: (id: string) => `${BASE_SPECIALIZATION_ENDPOINT}/${id}`,
};

export { SpecializationEndpoints, BASE_SPECIALIZATION_ENDPOINT };
