import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { I18nTranslations } from "generated/i18n.generated";
import { I18nService } from "nestjs-i18n";
import { Repository } from "typeorm";
import type { CreatePrescriptionDto } from "./dto/create-prescription.dto";
import type { UpdatePrescriptionDto } from "./dto/update-prescription.dto";
import { Prescription } from "./entities/prescription.entity";

@Injectable()
export class PrescriptionService {
	constructor(
		@InjectRepository(Prescription)
		private readonly prescriptionRepository: Repository<Prescription>,
		private readonly i18nService: I18nService<I18nTranslations>,
	) {}

	create(dto: CreatePrescriptionDto): Promise<Prescription> {
		const prescription = this.prescriptionRepository.create(dto);
		return this.prescriptionRepository.save(prescription);
	}

	findAll(): Promise<Prescription[]> {
		return this.prescriptionRepository.find({
			relations: {
				patient: true,
				doctor: true,
				medicinePrescriptions: { medicine: true },
			},
		});
	}

	async findOne(id: number): Promise<Prescription> {
		const prescription = await this.prescriptionRepository.findOne({
			where: { id },
			relations: {
				patient: true,
				doctor: true,
				medicinePrescriptions: { medicine: true },
			},
		});
		if (!prescription)
			throw new NotFoundException(
				this.i18nService.t(`error.PRESCRIPTION.NOT_FOUND`),
			);
		return prescription;
	}

	findByPatient(patientId: number): Promise<Prescription[]> {
		return this.prescriptionRepository.find({
			where: { patientId },
			relations: {
				doctor: true,
				medicinePrescriptions: { medicine: true },
			},
		});
	}

	findByDoctor(doctorId: number): Promise<Prescription[]> {
		return this.prescriptionRepository.find({
			where: { doctorId },
			relations: {
				patient: true,
				medicinePrescriptions: { medicine: true },
				doctor: true,
			},
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
