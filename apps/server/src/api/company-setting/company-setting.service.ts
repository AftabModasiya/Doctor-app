import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import type { CreateCompanySettingDto } from "./dto/create-company-setting.dto";
import type { UpdateCompanySettingDto } from "./dto/update-company-setting.dto";
import { CompanySetting } from "./entities/company-setting.entity";

@Injectable()
export class CompanySettingService {
	constructor(
		@InjectRepository(CompanySetting)
		private readonly settingRepository: Repository<CompanySetting>,
	) {}

	create(dto: CreateCompanySettingDto): Promise<CompanySetting> {
		const setting = this.settingRepository.create(dto);
		return this.settingRepository.save(setting);
	}

	findAll(): Promise<CompanySetting[]> {
		return this.settingRepository.find();
	}

	findByCompany(companyId: number): Promise<CompanySetting[]> {
		return this.settingRepository.find({ where: { companyId } });
	}

	async findOne(id: number): Promise<CompanySetting> {
		const setting = await this.settingRepository.findOne({ where: { id } });
		if (!setting)
			throw new NotFoundException(`CompanySetting #${id} not found`);
		return setting;
	}

	async update(
		id: number,
		dto: UpdateCompanySettingDto,
	): Promise<CompanySetting> {
		const setting = await this.findOne(id);
		Object.assign(setting, dto);
		return this.settingRepository.save(setting);
	}

	async remove(id: number): Promise<void> {
		const setting = await this.findOne(id);
		await this.settingRepository.softRemove(setting);
	}
}
