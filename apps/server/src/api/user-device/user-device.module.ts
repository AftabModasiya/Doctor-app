import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserDevice } from "./entities/user-device.entity";
import { UserDeviceController } from "./user-device.controller";
import { UserDeviceService } from "./user-device.service";

@Module({
	imports: [TypeOrmModule.forFeature([UserDevice])],
	controllers: [UserDeviceController],
	providers: [UserDeviceService],
	exports: [UserDeviceService],
})
export class UserDeviceModule {}
