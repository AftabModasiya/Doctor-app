import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDeviceController } from './user-device.controller';
import { UserDeviceService } from './user-device.service';
import { UserDevice } from './entities/user-device.entity';

@Module({
	imports: [TypeOrmModule.forFeature([UserDevice])],
	controllers: [UserDeviceController],
	providers: [UserDeviceService],
	exports: [UserDeviceService, TypeOrmModule],
})
export class UserDeviceModule { }
