import { MedicineEndpoints } from "@endpoints/medicine-endpoint";
import type {
  IMedicineListResponse,
  ISingleMedicineResponse,
  ICreateMedicineRequest,
} from "@models/medicine";
import { DELETE, GET, PATCH, POST } from "@shared/services/api-service";

const getAllMedicinesApi = () =>
  GET<IMedicineListResponse>({ URL: MedicineEndpoints.getMedicines });

const getMedicineByIdApi = (id: number) =>
  GET<ISingleMedicineResponse>({ URL: MedicineEndpoints.getMedicineById(id) });

const createMedicineApi = (body: ICreateMedicineRequest) =>
  POST<ICreateMedicineRequest>({ URL: MedicineEndpoints.createMedicine, body });

const updateMedicineApi = (id: number, body: Partial<ICreateMedicineRequest>) =>
  PATCH<Partial<ICreateMedicineRequest>>({
    URL: MedicineEndpoints.updateMedicine(id),
    body,
  });

const deleteMedicineApi = (id: number) =>
  DELETE<undefined>({ URL: MedicineEndpoints.deleteMedicine(id) });

export {
  getAllMedicinesApi,
  getMedicineByIdApi,
  createMedicineApi,
  updateMedicineApi,
  deleteMedicineApi,
};
