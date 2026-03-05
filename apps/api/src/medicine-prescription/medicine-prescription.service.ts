import { Injectable } from '@nestjs/common';
import { CreateMedicinePrescriptionDto } from './dto/create-medicine-prescription.dto';
import { UpdateMedicinePrescriptionDto } from './dto/update-medicine-prescription.dto';

@Injectable()
export class MedicinePrescriptionService {
  create(createMedicinePrescriptionDto: CreateMedicinePrescriptionDto) {
    return 'This action adds a new medicinePrescription';
  }

  findAll() {
    return `This action returns all medicinePrescription`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medicinePrescription`;
  }

  update(id: number, updateMedicinePrescriptionDto: UpdateMedicinePrescriptionDto) {
    return `This action updates a #${id} medicinePrescription`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicinePrescription`;
  }
}
