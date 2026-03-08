import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medicine } from './entities/medicine.entity';
import type { CreateMedicineDto } from './dto/create-medicine.dto';
import type { UpdateMedicineDto } from './dto/update-medicine.dto';

@Injectable()
export class MedicineService {
	constructor(
		@InjectRepository(Medicine)
		private readonly medicineRepository: Repository<Medicine>,
	) { }

	create(dto: CreateMedicineDto): Promise<Medicine> {
		const medicine = this.medicineRepository.create(dto);
		return this.medicineRepository.save(medicine);
	}

	findAll(): Promise<Medicine[]> {
		return this.medicineRepository.find();
	}

	findByCompany(companyId: number): Promise<Medicine[]> {
		return this.medicineRepository.find({ where: { companyId } });
	}

	async findOne(id: number): Promise<Medicine> {
		const medicine = await this.medicineRepository.findOne({ where: { id } });
		if (!medicine) throw new NotFoundException(`Medicine #${id} not found`);
		return medicine;
	}

	async update(id: number, dto: UpdateMedicineDto): Promise<Medicine> {
		const medicine = await this.findOne(id);
		Object.assign(medicine, dto);
		return this.medicineRepository.save(medicine);
	}

	async remove(id: number): Promise<void> {
		const medicine = await this.findOne(id);
		await this.medicineRepository.softRemove(medicine);
	}
}
