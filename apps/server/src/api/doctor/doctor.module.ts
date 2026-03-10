import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DegreeModule } from "../degree/degree.module";
import { SpecializationModule } from "../specialization/specialization.module";
import { UserModule } from "../user/user.module";
import { DoctorController } from "./doctor.controller";
import { DoctorService } from "./doctor.service";
import { Doctor } from "./entities/doctor.entity";

@Module({
	imports: [
		TypeOrmModule.forFeature([Doctor]),
		UserModule,
		SpecializationModule,
		DegreeModule,
	],
	controllers: [DoctorController],
	providers: [DoctorService],
	exports: [DoctorService, TypeOrmModule],
})
export class DoctorModule {}
