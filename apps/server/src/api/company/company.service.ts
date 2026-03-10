import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { I18nTranslations } from "generated/i18n.generated";
import { I18nService } from "nestjs-i18n";
import { Repository } from "typeorm";
import type { CreateCompanyDto } from "./dto/create-company.dto";
import type { UpdateCompanyDto } from "./dto/update-company.dto";
import { Company } from "./entities/company.entity";

@Injectable()
export class CompanyService {
	constructor(
		@InjectRepository(Company)
		private readonly companyRepository: Repository<Company>,
		private readonly i18nService: I18nService<I18nTranslations>,
	) {}

	create(dto: CreateCompanyDto): Promise<Company> {
		const company = this.companyRepository.create(dto);
		return this.companyRepository.save(company);
	}

	findAll(): Promise<Company[]> {
		return this.companyRepository.find();
	}

	async findOne(id: number): Promise<Company> {
		const company = await this.companyRepository.findOne({ where: { id } });
		if (!company)
			throw new NotFoundException(
				this.i18nService.t(`error.COMPANY.NOT_FOUND`),
			);
		return company;
	}

	async update(id: number, dto: UpdateCompanyDto): Promise<Company> {
		const company = await this.findOne(id);
		Object.assign(company, dto);
		return this.companyRepository.save(company);
	}

	async remove(id: number): Promise<void> {
		const company = await this.findOne(id);
		await this.companyRepository.softRemove(company);
	}
}
