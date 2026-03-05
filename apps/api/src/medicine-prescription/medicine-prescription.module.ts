import { Module } from '@nestjs/common';
import { MedicinePrescriptionService } from './medicine-prescription.service';
import { MedicinePrescriptionController } from './medicine-prescription.controller';

@Module({
  controllers: [MedicinePrescriptionController],
  providers: [MedicinePrescriptionService],
})
export class MedicinePrescriptionModule {}
