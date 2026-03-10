import { DASHBOARD_ENDPOINTS } from "@endpoints/dashboard-endpoint";
import type { IDashboardCountsResponse } from "@models/dashboard";
import { GET } from "@shared/services/api-service";

const getDashboardCountsApi = async () => {
    return await GET<IDashboardCountsResponse>({ URL: DASHBOARD_ENDPOINTS.COUNTS });
};

export { getDashboardCountsApi };
