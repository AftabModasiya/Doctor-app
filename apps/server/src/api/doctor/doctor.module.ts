import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DoctorController } from "./doctor.controller";
import { DoctorService } from "./doctor.service";
import { Doctor } from "./entities/doctor.entity";

import { User } from '../user/entities/user.entity';
import { Specialization } from '../specialization/entities/specialization.entity';
import { Degree } from '../degree/entities/degree.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Doctor, User, Specialization, Degree])],
	controllers: [DoctorController],
	providers: [DoctorService],
	exports: [DoctorService, TypeOrmModule],
})
export class DoctorModule {}
