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
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";

@UseGuards(JWTAuthGuard)
@ApiBearerAuth()
@Controller("user")
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly i18nService: I18nService<I18nTranslations>,
	) {}

	@Post()
	async create(@Body() createUserDto: CreateUserDto) {
		const data = await this.userService.create(createUserDto);
		return {
			...data,
			message: this.i18nService.t("success.USER.CREATE"),
		};
	}

	@Get()
	async findAll() {
		const result = await this.userService.findAll();
		return {
			list: result,
			message: this.i18nService.t("success.USER.LIST"),
		};
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		const user = await this.userService.findOne(+id);
		return {
			...user,
			message: this.i18nService.t("success.USER.VIEW"),
		};
	}

	@Patch(":id")
	async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
		const data = await this.userService.update(+id, updateUserDto);
		return {
			...data,
			message: this.i18nService.t("success.USER.UPDATE"),
		};
	}

	@Delete(":id")
	async remove(@Param("id") id: string) {
		await this.userService.remove(+id);
		return {
			message: this.i18nService.t("success.USER.DELETE"),
		};
	}
}
