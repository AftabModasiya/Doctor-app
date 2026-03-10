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
import { CreateMedicinePrescriptionDto } from "./dto/create-medicine-prescription.dto";
import { UpdateMedicinePrescriptionDto } from "./dto/update-medicine-prescription.dto";
import { MedicinePrescriptionService } from "./medicine-prescription.service";

@Controller("medicine-prescription")
export class MedicinePrescriptionController {
	constructor(
		private readonly medicinePrescriptionService: MedicinePrescriptionService,
		private readonly i18nService: I18nService<I18nTranslations>,
	) {}

	@Post()
	async create(
		@Body() createMedicinePrescriptionDto: CreateMedicinePrescriptionDto,
	) {
		const data = await this.medicinePrescriptionService.create(
			createMedicinePrescriptionDto,
		);
		return {
			...data,
			message: this.i18nService.t("success.MEDICINE_PRESCRIPTION.CREATE"),
		};
	}

	@Get()
	async findAll() {
		const result = await this.medicinePrescriptionService.findAll();
		return {
			list: result,
			message: this.i18nService.t("success.MEDICINE_PRESCRIPTION.LIST"),
		};
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		const mp = await this.medicinePrescriptionService.findOne(+id);
		return {
			...mp,
			message: this.i18nService.t("success.MEDICINE_PRESCRIPTION.VIEW"),
		};
	}

	@Patch(":id")
	async update(
		@Param("id") id: string,
		@Body() updateMedicinePrescriptionDto: UpdateMedicinePrescriptionDto,
	) {
		const data = await this.medicinePrescriptionService.update(
			+id,
			updateMedicinePrescriptionDto,
		);
		return {
			...data,
			message: this.i18nService.t("success.MEDICINE_PRESCRIPTION.UPDATE"),
		};
	}

	@Delete(":id")
	async remove(@Param("id") id: string) {
		await this.medicinePrescriptionService.remove(+id);
		return {
			message: this.i18nService.t("success.MEDICINE_PRESCRIPTION.DELETE"),
		};
	}
}
