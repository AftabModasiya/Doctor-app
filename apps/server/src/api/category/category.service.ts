import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { I18nTranslations } from "generated/i18n.generated";
import { I18nService } from "nestjs-i18n";
import { Repository } from "typeorm";
import type { CreateCategoryDto } from "./dto/create-category.dto";
import type { UpdateCategoryDto } from "./dto/update-category.dto";
import { Category } from "./entities/category.entity";

@Injectable()
export class CategoryService {
	constructor(
		@InjectRepository(Category)
		private readonly categoryRepository: Repository<Category>,
		private readonly i18nService: I18nService<I18nTranslations>,
	) {}

	create(dto: CreateCategoryDto): Promise<Category> {
		const category = this.categoryRepository.create(dto);
		return this.categoryRepository.save(category);
	}

	async findAll() {
		return {
			count: await this.categoryRepository.count(),
			list: await this.categoryRepository.find(),
			message: this.i18nService.t("success.CATEGORY.LIST"),
		};
	}

	findByCompany(companyId: number): Promise<Category[]> {
		return this.categoryRepository.find({ where: { companyId } });
	}

	async findOne(id: number): Promise<Category> {
		const category = await this.categoryRepository.findOne({ where: { id } });
		if (!category)
			throw new NotFoundException(
				this.i18nService.t("error.CATEGORY.NOT_FOUND"),
			);
		return category;
	}

	async update(id: number, dto: UpdateCategoryDto): Promise<Category> {
		const category = await this.findOne(id);
		Object.assign(category, dto);
		return this.categoryRepository.save(category);
	}

	async remove(id: number): Promise<void> {
		const category = await this.findOne(id);
		await this.categoryRepository.softRemove(category);
	}
}
