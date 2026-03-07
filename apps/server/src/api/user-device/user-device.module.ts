import { Module } from "@nestjs/common";
import { UserDeviceController } from "./user-device.controller";
import { UserDeviceService } from "./user-device.service";

@Module({
	controllers: [UserDeviceController],
	providers: [UserDeviceService],
})
export class UserDeviceModule {}
