import { DegreeEndpoints } from "@endpoints/degree-endpoint";
import type { IDegreeListResponse } from "@models/degree";
import { GET } from "@shared/services/api-service";

const getDegreesApi = () => {
  return GET<IDegreeListResponse>({
    URL: DegreeEndpoints.getDegrees,
  });
};

export { getDegreesApi };
