import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { I18nTranslations } from "generated/i18n.generated";
import { I18nService } from "nestjs-i18n";
import { Repository } from "typeorm";
import type { CreateDegreeDto } from "./dto/create-degree.dto";
import type { UpdateDegreeDto } from "./dto/update-degree.dto";
import { Degree } from "./entities/degree.entity";

@Injectable()
export class DegreeService {
	constructor(
		@InjectRepository(Degree)
		private readonly degreeRepository: Repository<Degree>,
		private readonly i18nService: I18nService<I18nTranslations>,
	) {}

	create(dto: CreateDegreeDto): Promise<Degree> {
		const degree = this.degreeRepository.create(dto);
		return this.degreeRepository.save(degree);
	}

	async findAll() {
		return {
			count: await this.degreeRepository.count(),
			list: await this.degreeRepository.find(),
			message: this.i18nService.t("success.DEGREE.LIST"),
		};
	}

	findByCompany(companyId: number): Promise<Degree[]> {
		return this.degreeRepository.find({ where: { companyId } });
	}

	async findOne(id: number): Promise<Degree> {
		const degree = await this.degreeRepository.findOne({ where: { id } });
		if (!degree)
			throw new NotFoundException(this.i18nService.t(`error.DEGREE.NOT_FOUND`));
		return degree;
	}

	async update(id: number, dto: UpdateDegreeDto): Promise<Degree> {
		const degree = await this.findOne(id);
		Object.assign(degree, dto);
		return this.degreeRepository.save(degree);
	}

	async remove(id: number): Promise<void> {
		const degree = await this.findOne(id);
		await this.degreeRepository.softRemove(degree);
	}
}
