import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import type { CreateUserDeviceDto } from "./dto/create-user-device.dto";
import type { UpdateUserDeviceDto } from "./dto/update-user-device.dto";
import { UserDevice } from "./entities/user-device.entity";

@Injectable()
export class UserDeviceService {
	constructor(
		@InjectRepository(UserDevice)
		private readonly deviceRepository: Repository<UserDevice>,
	) {}

	create(dto: CreateUserDeviceDto): Promise<UserDevice> {
		const device = this.deviceRepository.create(dto);
		return this.deviceRepository.save(device);
	}

	findAll(): Promise<UserDevice[]> {
		return this.deviceRepository.find({ relations: ["user"] });
	}

	findByUser(userId: number): Promise<UserDevice[]> {
		return this.deviceRepository.find({
			where: { userId },
			relations: ["token"],
		});
	}

	async findOne(id: number): Promise<UserDevice> {
		const device = await this.deviceRepository.findOne({
			where: { id },
			relations: ["user", "token"],
		});
		if (!device) throw new NotFoundException(`UserDevice #${id} not found`);
		return device;
	}

	async update(id: number, dto: UpdateUserDeviceDto): Promise<UserDevice> {
		const device = await this.findOne(id);
		Object.assign(device, dto);
		return this.deviceRepository.save(device);
	}

	async remove(id: number): Promise<void> {
		const device = await this.findOne(id);
		await this.deviceRepository.softRemove(device);
	}
}
