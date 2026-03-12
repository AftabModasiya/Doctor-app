import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { I18nTranslations } from "generated/i18n.generated";
import { I18nService } from "nestjs-i18n";
import { DeepPartial, FindOptionsWhere, Repository } from "typeorm";
import type { UpdateUserDeviceDto } from "./dto/update-user-device.dto";
import { UserDevice } from "./entities/user-device.entity";

@Injectable()
export class UserDeviceService {
	constructor(
		@InjectRepository(UserDevice)
		private readonly deviceRepository: Repository<UserDevice>,
		private readonly i18nService: I18nService<I18nTranslations>,
	) {}

	create(dto: DeepPartial<UserDevice>): Promise<UserDevice> {
		const device = this.deviceRepository.create(dto);
		return this.deviceRepository.save(device);
	}

	findAll(): Promise<UserDevice[]> {
		return this.deviceRepository.find({ relations: { user: true } });
	}

	findByUser(userId: number): Promise<UserDevice[]> {
		return this.deviceRepository.find({
			where: { userId },
			relations: { token: true },
		});
	}

	async findOne(id: number): Promise<UserDevice> {
		const device = await this.deviceRepository.findOne({
			where: { id },
			relations: { user: true, token: true },
		});
		if (!device)
			throw new NotFoundException(
				this.i18nService.t(`error.USER_DEVICE.NOT_FOUND`),
			);
		return device;
	}

	async findOneByWhere(where: FindOptionsWhere<UserDevice>) {
		const device = await this.deviceRepository.findOneBy(where);
		if (!device)
			throw new NotFoundException(
				this.i18nService.t(`error.USER_DEVICE.NOT_FOUND`),
			);
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

	hardDeleteByQuery(query: FindOptionsWhere<UserDevice>) {
		return this.deviceRepository.delete(query);
	}
}
