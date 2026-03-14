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
import { CompanySettingService } from "./company-setting.service";
import { CreateCompanySettingDto } from "./dto/create-company-setting.dto";
import { UpdateCompanySettingDto } from "./dto/update-company-setting.dto";

@UseGuards(JWTAuthGuard)
@ApiBearerAuth()
@Controller("company-setting")
export class CompanySettingController {
	constructor(
		private readonly companySettingService: CompanySettingService,
		private readonly i18nService: I18nService<I18nTranslations>,
	) {}

	@Post()
	async create(@Body() createCompanySettingDto: CreateCompanySettingDto) {
		const data = await this.companySettingService.create(
			createCompanySettingDto,
		);
		return {
			...data,
			message: this.i18nService.t("success.COMPANY_SETTING.CREATE"),
		};
	}

	@Get()
	async findAll() {
		const result = await this.companySettingService.findAll();
		return {
			list: result,
			message: this.i18nService.t("success.COMPANY_SETTING.LIST"),
		};
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		const setting = await this.companySettingService.findOne(+id);
		return {
			...setting,
			message: this.i18nService.t("success.COMPANY_SETTING.VIEW"),
		};
	}

	@Patch(":id")
	async update(
		@Param("id") id: string,
		@Body() updateCompanySettingDto: UpdateCompanySettingDto,
	) {
		const data = await this.companySettingService.update(
			+id,
			updateCompanySettingDto,
		);
		return {
			...data,
			message: this.i18nService.t("success.COMPANY_SETTING.UPDATE"),
		};
	}

	@Delete(":id")
	async remove(@Param("id") id: string) {
		await this.companySettingService.remove(+id);
		return {
			message: this.i18nService.t("success.COMPANY_SETTING.DELETE"),
		};
	}
}
