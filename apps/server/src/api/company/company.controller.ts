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
import { CompanyService } from "./company.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";

@UseGuards(JWTAuthGuard)
@ApiBearerAuth()
@Controller("company")
export class CompanyController {
	constructor(
		private readonly companyService: CompanyService,
		private readonly i18nService: I18nService<I18nTranslations>,
	) {}

	@Post()
	async create(@Body() createCompanyDto: CreateCompanyDto) {
		const data = await this.companyService.create(createCompanyDto);
		return {
			...data,
			message: this.i18nService.t("success.COMPANY.CREATE"),
		};
	}

	@Get()
	async findAll() {
		const result = await this.companyService.findAll();
		return {
			list: result,
			message: this.i18nService.t("success.COMPANY.LIST"),
		};
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		const company = await this.companyService.findOne(+id);
		return {
			...company,
			message: this.i18nService.t("success.COMPANY.VIEW"),
		};
	}

	@Patch(":id")
	async update(
		@Param("id") id: number,
		@Body() updateCompanyDto: UpdateCompanyDto,
	) {
		const data = await this.companyService.update(id, updateCompanyDto);
		return {
			...data,
			message: this.i18nService.t("success.COMPANY.UPDATE"),
		};
	}

	@Delete(":id")
	async remove(@Param("id") id: number) {
		await this.companyService.remove(id);
		return {
			message: this.i18nService.t("success.COMPANY.DELETE"),
		};
	}
}
