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
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { PatientService } from "./patient.service";

@Controller("patient")
export class PatientController {
	constructor(
		private readonly patientService: PatientService,
		private readonly i18nService: I18nService<I18nTranslations>,
	) {}

	@Post()
	async create(@Body() createPatientDto: CreatePatientDto) {
		const data = await this.patientService.create(createPatientDto);
		return {
			...data,
			message: this.i18nService.t("success.PATIENT.CREATE"),
		};
	}

	@Get()
	async findAll() {
		const { list, count } = await this.patientService.findAll();
		return {
			list,
			count,
			message: this.i18nService.t("success.PATIENT.LIST"),
		};
	}

	@Get("/metadata")
	async getPatientList() {
		const { list, count } = await this.patientService.findAllPatientMetadata();
		return {
			list,
			count,
			message: this.i18nService.t("success.PATIENT.LIST"),
		};
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		const patient = await this.patientService.findOne(+id);
		return {
			...patient,
			message: this.i18nService.t("success.PATIENT.VIEW"),
		};
	}

	@Patch(":id")
	async update(
		@Param("id") id: string,
		@Body() updatePatientDto: UpdatePatientDto,
	) {
		const data = await this.patientService.update(+id, updatePatientDto);
		return {
			...data,
			message: this.i18nService.t("success.PATIENT.UPDATE"),
		};
	}

	@Delete(":id")
	async remove(@Param("id") id: string) {
		await this.patientService.remove(+id);
		return {
			message: this.i18nService.t("success.PATIENT.DELETE"),
		};
	}
}
