import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicineController } from './medicine.controller';
import { MedicineService } from './medicine.service';
import { Medicine } from './entities/medicine.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Medicine])],
	controllers: [MedicineController],
	providers: [MedicineService],
	exports: [MedicineService],
})
export class MedicineModule { }
