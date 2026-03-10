import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { I18nTranslations } from "generated/i18n.generated";
import { I18nService } from "nestjs-i18n";
import { Repository } from "typeorm";
import type { CreateMedicinePrescriptionDto } from "./dto/create-medicine-prescription.dto";
import type { UpdateMedicinePrescriptionDto } from "./dto/update-medicine-prescription.dto";
import { MedicinePrescription } from "./entities/medicine-prescription.entity";

@Injectable()
export class MedicinePrescriptionService {
	constructor(
		@InjectRepository(MedicinePrescription)
		private readonly mpRepository: Repository<MedicinePrescription>,
		private readonly i18nService: I18nService<I18nTranslations>,
	) {}

	create(dto: CreateMedicinePrescriptionDto): Promise<MedicinePrescription> {
		const mp = this.mpRepository.create(dto);
		return this.mpRepository.save(mp);
	}

	findAll(): Promise<MedicinePrescription[]> {
		return this.mpRepository.find({
			relations: { medicine: true, prescription: true },
		});
	}

	findByPrescription(prescriptionId: number): Promise<MedicinePrescription[]> {
		return this.mpRepository.find({
			where: { prescriptionId },
			relations: { medicine: true },
		});
	}

	async findOne(id: number): Promise<MedicinePrescription> {
		const mp = await this.mpRepository.findOne({
			where: { id },
			relations: { medicine: true, prescription: true },
		});
		if (!mp)
			throw new NotFoundException(
				this.i18nService.t(`error.MEDICINE_PRESCRIPTION.NOT_FOUND`),
			);
		return mp;
	}

	async update(
		id: number,
		dto: UpdateMedicinePrescriptionDto,
	): Promise<MedicinePrescription> {
		const mp = await this.findOne(id);
		Object.assign(mp, dto);
		return this.mpRepository.save(mp);
	}

	async remove(id: number): Promise<void> {
		const mp = await this.findOne(id);
		await this.mpRepository.softRemove(mp);
	}
}
