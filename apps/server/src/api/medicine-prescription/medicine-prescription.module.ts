import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicinePrescriptionController } from './medicine-prescription.controller';
import { MedicinePrescriptionService } from './medicine-prescription.service';
import { MedicinePrescription } from './entities/medicine-prescription.entity';

@Module({
	imports: [TypeOrmModule.forFeature([MedicinePrescription])],
	controllers: [MedicinePrescriptionController],
	providers: [MedicinePrescriptionService],
	exports: [MedicinePrescriptionService],
})
export class MedicinePrescriptionModule { }
