import { DASHBOARD_ENDPOINTS } from "@endpoints/dashboard-endpoint";
import type { IDashboardCountsResponse, IPatientChartResponse } from "@models/dashboard";
import { GET } from "@shared/services/api-service";

const getDashboardCountsApi = async () => {
    return await GET<IDashboardCountsResponse>({ URL: DASHBOARD_ENDPOINTS.COUNTS });
};

const getPatientChartApi = async (startDate: string, endDate: string) => {
    return await GET<IPatientChartResponse>({
        URL: DASHBOARD_ENDPOINTS.PATIENT_CHART,
        params: { startDate, endDate },
    });
};

export { getDashboardCountsApi, getPatientChartApi };
