type IDashboardCounts = {
    totalPatientCount: number;
    totalDoctorCount: number;
    prescriptionDoctorCount: number;
}

type IDashboardCountsResponse = {
    success: boolean;
    data: IDashboardCounts;
    statusCode: number;
    message: string;
}

type IChartData = {
    labels: string[];
    data: number[];
}

type IPatientChartResponse = {
    success: boolean;
    data: IChartData;
    statusCode: number;
    message: string;
}

export type { IDashboardCounts, IDashboardCountsResponse, IChartData, IPatientChartResponse };
