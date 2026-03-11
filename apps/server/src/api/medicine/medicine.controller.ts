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
import { CreateMedicineDto } from "./dto/create-medicine.dto";
import { UpdateMedicineDto } from "./dto/update-medicine.dto";
import { MedicineService } from "./medicine.service";

@Controller("medicine")
export class MedicineController {
	constructor(
		private readonly medicineService: MedicineService,
		private readonly i18nService: I18nService<I18nTranslations>,
	) {}

	@Post()
	async create(@Body() createMedicineDto: CreateMedicineDto) {
		const data = await this.medicineService.create(createMedicineDto);
		return {
			...data,
			message: this.i18nService.t("success.MEDICINE.CREATE"),
		};
	}

	@Get()
	async findAll() {
		const [list, count] = await this.medicineService.findAll();
		return {
			list,
			count,
			message: this.i18nService.t("success.MEDICINE.LIST"),
		};
	}

	@Get("metadata")
	async metadata() {
		const [list, count] = await this.medicineService.metadata();
		return {
			list,
			count,
			message: this.i18nService.t("success.MEDICINE.LIST"),
		};
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		const medicine = await this.medicineService.findOne(+id);
		return {
			...medicine,
			message: this.i18nService.t("success.MEDICINE.VIEW"),
		};
	}

	@Patch(":id")
	async update(
		@Param("id") id: string,
		@Body() updateMedicineDto: UpdateMedicineDto,
	) {
		const data = await this.medicineService.update(+id, updateMedicineDto);
		return {
			...data,
			message: this.i18nService.t("success.MEDICINE.UPDATE"),
		};
	}

	@Delete(":id")
	async remove(@Param("id") id: string) {
		await this.medicineService.remove(+id);
		return {
			message: this.i18nService.t("success.MEDICINE.DELETE"),
		};
	}
}
