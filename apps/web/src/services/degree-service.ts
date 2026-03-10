import { DegreeEndpoints } from "@endpoints/degree-endpoint";
import type {
  ICreateDegreeRequest,
  IDegreeListResponse,
  ISingleDegreeResponse,
} from "@models/degree";
import { DELETE, GET, PATCH, POST } from "@shared/services/api-service";

const getDegreesApi = () =>
  GET<IDegreeListResponse>({ URL: DegreeEndpoints.getDegrees });

const getDegreeByIdApi = (id: string) =>
  GET<ISingleDegreeResponse>({ URL: DegreeEndpoints.getDegreeById(id) });

const createDegreeApi = (body: ICreateDegreeRequest) =>
  POST<ICreateDegreeRequest>({ URL: DegreeEndpoints.createDegree, body });

const updateDegreeApi = (id: string, body: Partial<ICreateDegreeRequest>) =>
  PATCH<Partial<ICreateDegreeRequest>>({
    URL: DegreeEndpoints.updateDegree(id),
    body,
  });

const deleteDegreeApi = (id: string) =>
  DELETE<undefined>({ URL: DegreeEndpoints.deleteDegree(id) });

export {
  getDegreesApi,
  getDegreeByIdApi,
  createDegreeApi,
  updateDegreeApi,
  deleteDegreeApi,
};
