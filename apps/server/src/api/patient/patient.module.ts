import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user/user.module";
import { Patient } from "./entities/patient.entity";
import { PatientController } from "./patient.controller";
import { PatientService } from "./patient.service";

@Module({
	imports: [TypeOrmModule.forFeature([Patient]), UserModule],
	controllers: [PatientController],
	providers: [PatientService],
	exports: [PatientService],
})
export class PatientModule {}
