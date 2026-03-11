import { MetadataEndpoints } from "@endpoints/metadata-endpoint";
import type { IMetadataResponse, IMetadtaMedicineResponse } from "@models/metadata";
import { GET } from "@shared/services/api-service";

const getPatientMetadataApi = () => {
    return GET<IMetadataResponse>({
        URL: MetadataEndpoints.getPatientMetadata,
    });
};

const getDoctorMetadataApi = () => {
    return GET<IMetadataResponse>({
        URL: MetadataEndpoints.getDoctorMetadata,
    });
};

const getMedicineMetadataApi = () => {
    return GET<IMetadtaMedicineResponse>({
        URL: MetadataEndpoints.getMedicineMetadata,
    });
};

export { getPatientMetadataApi, getDoctorMetadataApi, getMedicineMetadataApi };
