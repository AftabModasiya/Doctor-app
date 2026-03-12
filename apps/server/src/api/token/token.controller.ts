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
import { CreateTokenDto } from "./dto/create-token.dto";
import { UpdateTokenDto } from "./dto/update-token.dto";
import { TokenService } from "./token.service";

@UseGuards(JWTAuthGuard)
@ApiBearerAuth()
@Controller("token")
export class TokenController {
	constructor(
		private readonly tokenService: TokenService,
		private readonly i18nService: I18nService<I18nTranslations>,
	) {}

	@Post()
	async create(@Body() createTokenDto: CreateTokenDto) {
		const data = await this.tokenService.create(createTokenDto);
		return {
			...data,
			message: this.i18nService.t("success.TOKEN.CREATE"),
		};
	}

	@Get()
	async findAll() {
		const result = await this.tokenService.findAll();
		return {
			list: result,
			message: this.i18nService.t("success.TOKEN.LIST"),
		};
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		const token = await this.tokenService.findOne(+id);
		return {
			...token,
			message: this.i18nService.t("success.TOKEN.VIEW"),
		};
	}

	@Patch(":id")
	async update(
		@Param("id") id: string,
		@Body() updateTokenDto: UpdateTokenDto,
	) {
		const data = await this.tokenService.update(+id, updateTokenDto);
		return {
			...data,
			message: this.i18nService.t("success.TOKEN.UPDATE"),
		};
	}

	@Delete(":id")
	async remove(@Param("id") id: string) {
		await this.tokenService.remove(+id);
		return {
			message: this.i18nService.t("success.TOKEN.DELETE"),
		};
	}
}
