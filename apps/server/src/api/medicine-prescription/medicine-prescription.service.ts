import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicinePrescription } from './entities/medicine-prescription.entity';
import type { CreateMedicinePrescriptionDto } from './dto/create-medicine-prescription.dto';
import type { UpdateMedicinePrescriptionDto } from './dto/update-medicine-prescription.dto';

@Injectable()
export class MedicinePrescriptionService {
	constructor(
		@InjectRepository(MedicinePrescription)
		private readonly mpRepository: Repository<MedicinePrescription>,
	) { }

	create(dto: CreateMedicinePrescriptionDto): Promise<MedicinePrescription> {
		const mp = this.mpRepository.create(dto);
		return this.mpRepository.save(mp);
	}

	findAll(): Promise<MedicinePrescription[]> {
		return this.mpRepository.find({ relations: ['medicine', 'prescription'] });
	}

	findByPrescription(prescriptionId: number): Promise<MedicinePrescription[]> {
		return this.mpRepository.find({
			where: { prescriptionId },
			relations: ['medicine'],
		});
	}

	async findOne(id: number): Promise<MedicinePrescription> {
		const mp = await this.mpRepository.findOne({
			where: { id },
			relations: ['medicine', 'prescription'],
		});
		if (!mp) throw new NotFoundException(`MedicinePrescription #${id} not found`);
		return mp;
	}

	async update(id: number, dto: UpdateMedicinePrescriptionDto): Promise<MedicinePrescription> {
		const mp = await this.findOne(id);
		Object.assign(mp, dto);
		return this.mpRepository.save(mp);
	}

	async remove(id: number): Promise<void> {
		const mp = await this.findOne(id);
		await this.mpRepository.softRemove(mp);
	}
}
