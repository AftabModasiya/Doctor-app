const BASE_MEDICINE_ENDPOINT = "/medicine";

const MedicineEndpoints = {
  getMedicines: `${BASE_MEDICINE_ENDPOINT}`,
  getMedicineById: (id: number) => `${BASE_MEDICINE_ENDPOINT}/${id}`,
  createMedicine: `${BASE_MEDICINE_ENDPOINT}`,
  updateMedicine: (id: number) => `${BASE_MEDICINE_ENDPOINT}/${id}`,
  deleteMedicine: (id: number) => `${BASE_MEDICINE_ENDPOINT}/${id}`,
};

export { MedicineEndpoints, BASE_MEDICINE_ENDPOINT };
