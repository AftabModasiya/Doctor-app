import { Controller, Get, Query } from "@nestjs/common";
import { I18nTranslations } from "generated/i18n.generated";
import { I18nService } from "nestjs-i18n";
import { DoctorService } from "../doctor/doctor.service";
import { PatientService } from "../patient/patient.service";
import { PrescriptionService } from "../prescription/prescription.service";
import { PatientChartQueryDto } from "./dto/patient-chart-query.dto";

@Controller("dashboard")
export class DashboardController {
	constructor(
		private readonly patientService: PatientService,
		private readonly doctorService: DoctorService,
		private readonly prescriptionService: PrescriptionService,
		private readonly i18nService: I18nService<I18nTranslations>,
	) {}

	@Get("count")
	async getDashboardCounts() {
		const [totalPatientCount, totalDoctorCount, totalPrescriptionCount] =
			await Promise.all([
				this.patientService.countPatentByCompanyId(1),
				this.doctorService.countDoctorByCompanyId(1),
				this.prescriptionService.countPrescriptionByCompanyId(1),
			]);

		return {
			totalPatientCount,
			totalDoctorCount,
			totalPrescriptionCount,
			message: this.i18nService.t("success.DASHBOARD.COUNT"),
		};
	}

	@Get("patient-chart")
	async getPatientChartData(@Query() query: PatientChartQueryDto) {
		const chartData = await this.patientService.getPatientGrowthData(
			1,
			query.startDate,
			query.endDate,
		);
		return {
			...chartData,
			message: this.i18nService.t("success.DASHBOARD.PATIENT_CHART"),
		};
	}
}
