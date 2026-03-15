import {
	ConflictException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { I18nTranslations } from "generated/i18n.generated";
import { I18nService } from "nestjs-i18n";
import { DeepPartial, FindOneOptions, Repository } from "typeorm";
import type { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		private readonly i18nService: I18nService<I18nTranslations>,
	) {}

	async create(dto: CreateUserDto): Promise<User> {
		if (dto.email) {
			const existingUser = await this.userRepository.findOne({
				where: { email: dto.email as string },
			});
			if (existingUser) {
				throw new ConflictException(
					this.i18nService.t("error.VALIDATION.EMAIL_EXISTS"),
				);
			}
		}

		const user = this.userRepository.create(dto as unknown as Partial<User>);
		return this.userRepository.save(user);
	}

	findAll(): Promise<User[]> {
		return this.userRepository.find();
	}

	async findOne(id: number): Promise<User> {
		const user = await this.userRepository.findOne({ where: { id } });
		if (!user)
			throw new NotFoundException(this.i18nService.t(`error.USER.NOT_FOUND`));
		return user;
	}

	async findOneByQuery(query: FindOneOptions<User>): Promise<User> {
		const user = await this.userRepository.findOne(query);
		if (!user)
			throw new NotFoundException(this.i18nService.t(`error.USER.NOT_FOUND`));
		return user;
	}

	async update(id: number, dto: DeepPartial<User>): Promise<User> {
		const user = await this.findOne(id);

		if (dto.email && dto.email !== user.email) {
			const existingUser = await this.userRepository.findOne({
				where: { email: dto.email as string },
			});
			if (existingUser) {
				throw new ConflictException(
					this.i18nService.t("error.VALIDATION.EMAIL_EXISTS"),
				);
			}
		}

		Object.assign(user, dto);
		return this.userRepository.save(user);
	}

	async remove(id: number): Promise<void> {
		const user = await this.findOne(id);
		await this.userRepository.softRemove(user);
	}
}
