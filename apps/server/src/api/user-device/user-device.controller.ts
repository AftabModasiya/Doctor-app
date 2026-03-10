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
import { CreateUserDeviceDto } from "./dto/create-user-device.dto";
import { UpdateUserDeviceDto } from "./dto/update-user-device.dto";
import { UserDeviceService } from "./user-device.service";

@Controller("user-device")
export class UserDeviceController {
	constructor(
		private readonly userDeviceService: UserDeviceService,
		private readonly i18nService: I18nService<I18nTranslations>,
	) {}

	@Post()
	async create(@Body() createUserDeviceDto: CreateUserDeviceDto) {
		const data = await this.userDeviceService.create(createUserDeviceDto);
		return {
			...data,
			message: this.i18nService.t("success.USER_DEVICE.CREATE"),
		};
	}

	@Get()
	async findAll() {
		const result = await this.userDeviceService.findAll();
		return {
			list: result,
			message: this.i18nService.t("success.USER_DEVICE.LIST"),
		};
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		const device = await this.userDeviceService.findOne(+id);
		return {
			...device,
			message: this.i18nService.t("success.USER_DEVICE.VIEW"),
		};
	}

	@Patch(":id")
	async update(
		@Param("id") id: string,
		@Body() updateUserDeviceDto: UpdateUserDeviceDto,
	) {
		const data = await this.userDeviceService.update(+id, updateUserDeviceDto);
		return {
			...data,
			message: this.i18nService.t("success.USER_DEVICE.UPDATE"),
		};
	}

	@Delete(":id")
	async remove(@Param("id") id: string) {
		await this.userDeviceService.remove(+id);
		return {
			message: this.i18nService.t("success.USER_DEVICE.DELETE"),
		};
	}
}
