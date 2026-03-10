import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { I18nTranslations } from "generated/i18n.generated";
import { I18nService } from "nestjs-i18n";
import { Repository } from "typeorm";
import type { CreateMedicineDto } from "./dto/create-medicine.dto";
import type { UpdateMedicineDto } from "./dto/update-medicine.dto";
import { Medicine } from "./entities/medicine.entity";

@Injectable()
export class MedicineService {
	constructor(
		@InjectRepository(Medicine)
		private readonly medicineRepository: Repository<Medicine>,
		private readonly i18nService: I18nService<I18nTranslations>,
	) {}

	create(dto: CreateMedicineDto): Promise<Medicine> {
		const medicine = this.medicineRepository.create(dto);
		return this.medicineRepository.save(medicine);
	}

	async findAll() {
		return {
			count: await this.medicineRepository.count(),
			list: await this.medicineRepository.find({ relations: ["category"] }),
			message: this.i18nService.t("success.MEDICINE.LIST"),
		};
	}

	findByCompany(companyId: number): Promise<Medicine[]> {
		return this.medicineRepository.find({ where: { companyId } });
	}

	async findOne(id: number): Promise<Medicine> {
		const medicine = await this.medicineRepository.findOne({ where: { id } });
		if (!medicine)
			throw new NotFoundException(
				this.i18nService.t(`error.MEDICINE.NOT_FOUND`),
			);
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
