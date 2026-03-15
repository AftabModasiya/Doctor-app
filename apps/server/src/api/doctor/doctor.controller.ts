import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { I18nTranslations } from "generated/i18n.generated";
import { I18nService } from "nestjs-i18n";
import { CommonListFiltersDto } from "src/common/dto/query.dto";
import { JWTAuthGuard } from "src/shared/guards/jwt-auth.guard";
import { DoctorService } from "./doctor.service";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";

@UseGuards(JWTAuthGuard)
@ApiBearerAuth()
@Controller("doctor")
export class DoctorController {
	constructor(
		private readonly doctorService: DoctorService,
		private readonly i18nService: I18nService<I18nTranslations>,
	) {}

	@Post()
	async create(@Body() createDoctorDto: CreateDoctorDto) {
		const data = await this.doctorService.create(createDoctorDto);
		return {
			...data,
			message: this.i18nService.t("success.DOCTOR.CREATE"),
		};
	}

	@Get()
	async findAll(@Query() query: CommonListFiltersDto) {
		const [list, count] = await this.doctorService.findAll(query);
		return {
			list,
			count,
			message: this.i18nService.t("success.DOCTOR.LIST"),
		};
	}

	@Get("/metadata")
	async getDoctorList() {
		const { list, count } = await this.doctorService.findAllDoctorMetadata();
		return {
			list,
			count,
			message: this.i18nService.t("success.DOCTOR.LIST"),
		};
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		const doctor = await this.doctorService.findOne(+id);
		return {
			...doctor,
			message: this.i18nService.t("success.DOCTOR.VIEW"),
		};
	}

	@Patch(":id")
	async update(
		@Param("id") id: string,
		@Body() updateDoctorDto: UpdateDoctorDto,
	) {
		const data = await this.doctorService.update(+id, updateDoctorDto);
		return {
			...data,
			message: this.i18nService.t("success.DOCTOR.UPDATE"),
		};
	}

	@Delete(":id")
	async remove(@Param("id") id: string) {
		await this.doctorService.remove(+id);
		return {
			message: this.i18nService.t("success.DOCTOR.DELETE"),
		};
	}
}
