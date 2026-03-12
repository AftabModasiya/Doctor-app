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
import { DegreeService } from "./degree.service";
import { CreateDegreeDto } from "./dto/create-degree.dto";
import { UpdateDegreeDto } from "./dto/update-degree.dto";

@UseGuards(JWTAuthGuard)
@ApiBearerAuth()
@Controller("degree")
export class DegreeController {
	constructor(
		private readonly degreeService: DegreeService,
		private readonly i18nService: I18nService<I18nTranslations>,
	) {}

	@Post()
	async create(@Body() createDegreeDto: CreateDegreeDto) {
		const data = await this.degreeService.create(createDegreeDto);
		return {
			...data,
			message: this.i18nService.t("success.DEGREE.CREATE"),
		};
	}

	@Get()
	async findAll() {
		const [list, count] = await this.degreeService.findAll();
		return {
			list,
			count,
			message: this.i18nService.t("success.DEGREE.LIST"),
		};
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		const degree = await this.degreeService.findOne(+id);
		return {
			...degree,
			message: this.i18nService.t("success.DEGREE.VIEW"),
		};
	}

	@Patch(":id")
	async update(
		@Param("id") id: string,
		@Body() updateDegreeDto: UpdateDegreeDto,
	) {
		const data = await this.degreeService.update(+id, updateDegreeDto);
		return {
			...data,
			message: this.i18nService.t("success.DEGREE.UPDATE"),
		};
	}

	@Delete(":id")
	async remove(@Param("id") id: string) {
		await this.degreeService.remove(+id);
		return {
			message: this.i18nService.t("success.DEGREE.DELETE"),
		};
	}
}
