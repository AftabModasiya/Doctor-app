import { PrescriptionEndpoints } from "@endpoints/prescription-endpoint";
import type {
    ICreatePrescriptionRequest,
    IPrescriptionResponse,
    IPrescription,
} from "@models/prescription";
import { DELETE, GET, PATCH, POST } from "@shared/services/api-service";

const getPrescriptionsApi = () => {
    return GET<IPrescriptionResponse>({
        URL: PrescriptionEndpoints.getPrescriptions,
    });
};

const getPrescriptionByIdApi = (id: number) => {
    return GET<IPrescription>({
        URL: PrescriptionEndpoints.getPrescriptionById(id),
    });
};

const createPrescriptionApi = (body: ICreatePrescriptionRequest) => {
    return POST<ICreatePrescriptionRequest>({
        URL: PrescriptionEndpoints.createPrescription,
        body,
    });
};

const updatePrescriptionApi = (
    id: number,
    body: Partial<ICreatePrescriptionRequest>,
) => {
    return PATCH<Partial<ICreatePrescriptionRequest>>({
        URL: PrescriptionEndpoints.updatePrescription(id),
        body,
    });
};

const deletePrescriptionApi = (id: number) => {
    return DELETE<undefined>({
        URL: PrescriptionEndpoints.deletePrescription(id),
    });
};

export {
    getPrescriptionsApi,
    getPrescriptionByIdApi,
    createPrescriptionApi,
    updatePrescriptionApi,
    deletePrescriptionApi,
};
