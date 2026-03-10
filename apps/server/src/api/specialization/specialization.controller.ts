import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { I18nTranslations } from "generated/i18n.generated";
import { I18nService } from "nestjs-i18n";
import { CreateSpecializationDto } from "./dto/create-specialization.dto";
import { UpdateSpecializationDto } from "./dto/update-specialization.dto";
import { SpecializationService } from "./specialization.service";

@Controller("specialization")
export class SpecializationController {
	constructor(
		private readonly specializationService: SpecializationService,
		private readonly i18nService: I18nService<I18nTranslations>,
	) {}

	@Post()
	async create(@Body() createSpecializationDto: CreateSpecializationDto) {
		const data = await this.specializationService.create(
			createSpecializationDto,
		);
		return {
			...data,
			message: this.i18nService.t("success.SPECIALIZATION.CREATE"),
		};
	}

	@Get()
	async findAll() {
		const result = await this.specializationService.findAll();
		return {
			list: result,
			message: this.i18nService.t("success.SPECIALIZATION.LIST"),
		};
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		const specialization = await this.specializationService.findOne(+id);
		return {
			...specialization,
			message: this.i18nService.t("success.SPECIALIZATION.VIEW"),
		};
	}

	@Patch(":id")
	async update(
		@Param("id") id: string,
		@Body() updateSpecializationDto: UpdateSpecializationDto,
	) {
		const data = await this.specializationService.update(
			+id,
			updateSpecializationDto,
		);
		return {
			...data,
			message: this.i18nService.t("success.SPECIALIZATION.UPDATE"),
		};
	}

	@Delete(":id")
	async remove(@Param("id") id: string) {
		await this.specializationService.remove(+id);
		return {
			message: this.i18nService.t("success.SPECIALIZATION.DELETE"),
		};
	}
}
