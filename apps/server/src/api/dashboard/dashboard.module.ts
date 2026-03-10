import { Module } from "@nestjs/common";
import { DoctorModule } from "../doctor/doctor.module";
import { PatientModule } from "../patient/patient.module";
import { PrescriptionModule } from "../prescription/prescription.module";
import { DashboardController } from "./dashboard.controller";

@Module({
	imports: [PatientModule, PrescriptionModule, DoctorModule],
	controllers: [DashboardController],
})
export class DashboardModule {}
