import { Module } from "@nestjs/common";
import { MedicinePrescriptionController } from "./medicine-prescription.controller";
import { MedicinePrescriptionService } from "./medicine-prescription.service";

@Module({
	controllers: [MedicinePrescriptionController],
	providers: [MedicinePrescriptionService],
})
export class MedicinePrescriptionModule {}
