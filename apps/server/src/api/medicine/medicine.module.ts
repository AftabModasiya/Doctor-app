import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Medicine } from "./entities/medicine.entity";
import { MedicineController } from "./medicine.controller";
import { MedicineService } from "./medicine.service";

@Module({
	imports: [TypeOrmModule.forFeature([Medicine])],
	controllers: [MedicineController],
	providers: [MedicineService],
	exports: [MedicineService],
})
export class MedicineModule {}
