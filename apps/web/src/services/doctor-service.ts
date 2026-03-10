import { DoctorEndpoints } from "@endpoints/doctor-endpoint";
import type {
  ICreateDoctorRequest,
  IDoctorResponse,
  ISingleDoctorResponse,
} from "@models/doctor";
import { DELETE, GET, PATCH, POST } from "@shared/services/api-service";

const getDoctorsApi = () => {
  return GET<IDoctorResponse>({
    URL: DoctorEndpoints.getDoctors,
  });
};

const getDoctorByIdApi = (id: string) => {
  return GET<ISingleDoctorResponse>({
    URL: DoctorEndpoints.getDoctorById(id),
  });
};

const createDoctorApi = (body: ICreateDoctorRequest) => {
  return POST<ICreateDoctorRequest>({
    URL: DoctorEndpoints.createDoctor,
    body,
  });
};

const updateDoctorApi = (id: string, body: Partial<ICreateDoctorRequest>) => {
  return PATCH<Partial<ICreateDoctorRequest>>({
    URL: DoctorEndpoints.updateDoctor(id),
    body,
  });
};

const deleteDoctorApi = (id: string) => {
  return DELETE<undefined>({
    URL: DoctorEndpoints.deleteDoctor(id),
  });
};

export {
  getDoctorsApi,
  getDoctorByIdApi,
  createDoctorApi,
  updateDoctorApi,
  deleteDoctorApi,
};
