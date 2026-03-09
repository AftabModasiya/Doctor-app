import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Prescription } from "./entities/prescription.entity";
import { PrescriptionController } from "./prescription.controller";
import { PrescriptionService } from "./prescription.service";

@Module({
	imports: [TypeOrmModule.forFeature([Prescription])],
	controllers: [PrescriptionController],
	providers: [PrescriptionService],
	exports: [PrescriptionService, TypeOrmModule],
})
export class PrescriptionModule {}
