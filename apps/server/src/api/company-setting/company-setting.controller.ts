import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { CompanySettingService } from "./company-setting.service";

@Controller("company-setting")
export class CompanySettingController {
	constructor(private readonly companySettingService: CompanySettingService) {}

	@Post()
	create() {
		return this.companySettingService.create();
	}

	@Get()
	findAll() {
		return this.companySettingService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.companySettingService.findOne(+id);
	}

	@Patch(":id")
	update(@Param("id") id: string) {
		return this.companySettingService.update(+id);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.companySettingService.remove(+id);
	}
}
