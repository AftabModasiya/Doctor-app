import { SpecializationEndpoints } from "@endpoints/specialization-endpoint";
import type { ISpecializationListResponse } from "@models/specialization";
import { GET } from "@shared/services/api-service";

const getSpecializationsApi = () => {
  return GET<ISpecializationListResponse>({
    URL: SpecializationEndpoints.getSpecializations,
  });
};

export { getSpecializationsApi };
