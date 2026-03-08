import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanySettingController } from './company-setting.controller';
import { CompanySettingService } from './company-setting.service';
import { CompanySetting } from './entities/company-setting.entity';

@Module({
	imports: [TypeOrmModule.forFeature([CompanySetting])],
	controllers: [CompanySettingController],
	providers: [CompanySettingService],
	exports: [CompanySettingService],
})
export class CompanySettingModule { }
