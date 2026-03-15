import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { I18nTranslations } from "generated/i18n.generated";
import { I18nService } from "nestjs-i18n";
import { DataSource, Repository } from "typeorm";
import { MedicinePrescription } from "../medicine-prescription/entities/medicine-prescription.entity";
import type { CreatePrescriptionDto } from "./dto/create-prescription.dto";
import type { UpdatePrescriptionDto } from "./dto/update-prescription.dto";
import { Prescription } from "./entities/prescription.entity";

@Injectable()
export class PrescriptionService {
	constructor(
		@InjectRepository(Prescription)
		private readonly prescriptionRepository: Repository<Prescription>,
		private readonly i18nService: I18nService<I18nTranslations>,
		private readonly dataSource: DataSource,
	) {}

	async create(dto: CreatePrescriptionDto) {
		return this.dataSource.transaction(async (manager) => {
			const prescription = manager.create(Prescription, {
				patientId: dto.patientId,
				doctorId: dto.doctorId,
				companyId: dto.companyId,
				diagnosis: dto.diagnosis,
				notes: dto.notes,
			});
			const savedPrescription = await manager.save(prescription);

			const medPrescriptions = dto.medicinePrescriptions.map((mp) =>
				manager.create(MedicinePrescription, {
					prescriptionId: savedPrescription.id,
					medicineId: mp.medicineId,
					quantity: mp.quantity, // note: we will need to ensure quantity exists on the entity
				}),
			);

			await manager.save(medPrescriptions);

			const newPrescription = await manager.findOne(Prescription, {
				where: { id: savedPrescription.id },
				relations: [
					"patient",
					"doctor",
					"medicinePrescriptions",
					"medicinePrescriptions.medicine",
				],
			});

			return {
				message: this.i18nService.t("success.PRESCRIPTION.CREATE"),
				data: {
					prescriptionId: newPrescription?.id,
				},
			};
		});
	}

	async findAll() {
		return {
			count: await this.prescriptionRepository.count(),
			list: await this.prescriptionRepository.find({
				relations: {
					patient: { user: true },
					doctor: { user: true },
					medicinePrescriptions: { medicine: true },
				},
			}),
			message: this.i18nService.t("success.PRESCRIPTION.LIST"),
		};
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

	async findByPatient(patientId: number) {
		const list = await this.prescriptionRepository.find({
			where: { patientId },
			relations: {
				doctor: true,
				medicinePrescriptions: { medicine: true },
			},
		});
		return {
			count: list.length,
			list,
			message: this.i18nService.t("success.PRESCRIPTION.LIST"),
		};
	}

	async findByDoctor(doctorId: number) {
		const list = await this.prescriptionRepository.find({
			where: { doctorId },
			relations: {
				patient: true,
				medicinePrescriptions: { medicine: true },
				doctor: true,
			},
		});
		return {
			count: list.length,
			list,
			message: this.i18nService.t("success.PRESCRIPTION.LIST"),
		};
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
