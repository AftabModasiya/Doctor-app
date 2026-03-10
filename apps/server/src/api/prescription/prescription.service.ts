import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import type { CreatePrescriptionDto } from "./dto/create-prescription.dto";
import type { UpdatePrescriptionDto } from "./dto/update-prescription.dto";
import { Prescription } from "./entities/prescription.entity";

@Injectable()
export class PrescriptionService {
	constructor(
		@InjectRepository(Prescription)
		private readonly prescriptionRepository: Repository<Prescription>,
	) {}

	create(dto: CreatePrescriptionDto): Promise<Prescription> {
		const prescription = this.prescriptionRepository.create(dto);
		return this.prescriptionRepository.save(prescription);
	}

	findAll(): Promise<Prescription[]> {
		return this.prescriptionRepository.find({
			relations: [
				"patient",
				"doctor",
				"medicinePrescriptions",
				"medicinePrescriptions.medicine",
			],
		});
	}

	async findOne(id: number): Promise<Prescription> {
		const prescription = await this.prescriptionRepository.findOne({
			where: { id },
			relations: [
				"patient",
				"doctor",
				"medicinePrescriptions",
				"medicinePrescriptions.medicine",
			],
		});
		if (!prescription)
			throw new NotFoundException(`Prescription #${id} not found`);
		return prescription;
	}

	findByPatient(patientId: number): Promise<Prescription[]> {
		return this.prescriptionRepository.find({
			where: { patientId },
			relations: [
				"doctor",
				"medicinePrescriptions",
				"medicinePrescriptions.medicine",
			],
		});
	}

	findByDoctor(doctorId: number): Promise<Prescription[]> {
		return this.prescriptionRepository.find({
			where: { doctorId },
			relations: [
				"patient",
				"medicinePrescriptions",
				"medicinePrescriptions.medicine",
			],
		});
	}

	async update(id: number, dto: UpdatePrescriptionDto): Promise<Prescription> {
		const prescription = await this.findOne(id);
		Object.assign(prescription, dto);
		return this.prescriptionRepository.save(prescription);
	}

	async remove(id: number): Promise<void> {
		const prescription = await this.findOne(id);
		await this.prescriptionRepository.softRemove(prescription);
	}

	countPrescriptionByCompanyId(companyId: number) {
		return this.prescriptionRepository.count({ where: { companyId } });
	}
}
