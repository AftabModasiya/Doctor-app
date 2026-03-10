import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { Patient } from "./entities/patient.entity";
import { PatientController } from "./patient.controller";
import { PatientService } from "./patient.service";

@Module({
	imports: [TypeOrmModule.forFeature([Patient, User])],
	controllers: [PatientController],
	providers: [PatientService],
	exports: [PatientService, TypeOrmModule],
})
export class PatientModule {}
