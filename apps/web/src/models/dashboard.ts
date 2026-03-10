export interface IDashboardCounts {
    totalPatientCount: number;
    totalDoctorCount: number;
    prescriptionDoctorCount: number;
}

export interface IDashboardCountsResponse {
    success: boolean;
    data: IDashboardCounts;
    statusCode: number;
    message: string;
}
