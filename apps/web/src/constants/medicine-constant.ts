import { BASE_MEDICINE_ENDPOINT } from "@endpoints/medicine-endpoint";

const MedicineActionTypes = {
  MEDICINE_GET_ALL: `${BASE_MEDICINE_ENDPOINT}`,
  MEDICINE_GET_BY_ID: `${BASE_MEDICINE_ENDPOINT}/get-by-id`,
  MEDICINE_CREATE: `${BASE_MEDICINE_ENDPOINT}/create`,
  MEDICINE_UPDATE: `${BASE_MEDICINE_ENDPOINT}/update`,
  MEDICINE_DELETE: `${BASE_MEDICINE_ENDPOINT}/delete`,
};

export { MedicineActionTypes };
