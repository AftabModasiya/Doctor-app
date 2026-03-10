import { MetadataEndpoints } from "@endpoints/metadata-endpoint";
import type { IMetadataResponse } from "@models/metadata";
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

export { getPatientMetadataApi, getDoctorMetadataApi };
