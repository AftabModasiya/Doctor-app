import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { I18nTranslations } from "generated/i18n.generated";
import { I18nService } from "nestjs-i18n";
import { JWTAuthGuard } from "src/shared/guards/jwt-auth.guard";
import { CreatePrescriptionDto } from "./dto/create-prescription.dto";
import { UpdatePrescriptionDto } from "./dto/update-prescription.dto";
import { PrescriptionService } from "./prescription.service";

@UseGuards(JWTAuthGuard)
@ApiBearerAuth()
@Controller("prescription")
export class PrescriptionController {
	constructor(
		private readonly prescriptionService: PrescriptionService,
		private readonly i18nService: I18nService<I18nTranslations>,
	) {}

	@Post()
	async create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
		const data = await this.prescriptionService.create(createPrescriptionDto);
		return {
			...data,
			message: this.i18nService.t("success.PRESCRIPTION.CREATE"),
		};
	}

	@Get()
	async findAll() {
		const result = await this.prescriptionService.findAll();
		return {
			list: result,
			message: this.i18nService.t("success.PRESCRIPTION.LIST"),
		};
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		const prescription = await this.prescriptionService.findOne(+id);
		return {
			...prescription,
			message: this.i18nService.t("success.PRESCRIPTION.VIEW"),
		};
	}

	@Patch(":id")
	async update(
		@Param("id") id: string,
		@Body() updatePrescriptionDto: UpdatePrescriptionDto,
	) {
		const data = await this.prescriptionService.update(
			+id,
			updatePrescriptionDto,
		);
		return {
			...data,
			message: this.i18nService.t("success.PRESCRIPTION.UPDATE"),
		};
	}

	@Delete(":id")
	async remove(@Param("id") id: string) {
		await this.prescriptionService.remove(+id);
		return {
			message: this.i18nService.t("success.PRESCRIPTION.DELETE"),
		};
	}
}
