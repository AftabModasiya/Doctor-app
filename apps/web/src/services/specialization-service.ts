import { SpecializationEndpoints } from "@endpoints/specialization-endpoint";
import type {
  ICreateSpecializationRequest,
  ISpecializationListResponse,
  ISingleSpecializationResponse,
} from "@models/specialization";
import { DELETE, GET, PATCH, POST } from "@shared/services/api-service";

const getSpecializationsApi = () =>
  GET<ISpecializationListResponse>({
    URL: SpecializationEndpoints.getSpecializations,
  });

const getSpecializationByIdApi = (id: string) =>
  GET<ISingleSpecializationResponse>({
    URL: SpecializationEndpoints.getSpecializationById(id),
  });

const createSpecializationApi = (body: ICreateSpecializationRequest) =>
  POST<ICreateSpecializationRequest>({
    URL: SpecializationEndpoints.createSpecialization,
    body,
  });

const updateSpecializationApi = (
  id: string,
  body: Partial<ICreateSpecializationRequest>,
) =>
  PATCH<Partial<ICreateSpecializationRequest>>({
    URL: SpecializationEndpoints.updateSpecialization(id),
    body,
  });

const deleteSpecializationApi = (id: string) =>
  DELETE<undefined>({ URL: SpecializationEndpoints.deleteSpecialization(id) });

export {
  getSpecializationsApi,
  getSpecializationByIdApi,
  createSpecializationApi,
  updateSpecializationApi,
  deleteSpecializationApi,
};
