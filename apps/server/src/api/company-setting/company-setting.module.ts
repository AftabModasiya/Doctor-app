import { Module } from "@nestjs/common";
import { CompanySettingController } from "./company-setting.controller";
import { CompanySettingService } from "./company-setting.service";

@Module({
	controllers: [CompanySettingController],
	providers: [CompanySettingService],
})
export class CompanySettingModule {}
