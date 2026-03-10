import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { I18nTranslations } from "generated/i18n.generated";
import { I18nService } from "nestjs-i18n";
import { Repository } from "typeorm";
import type { CreateTokenDto } from "./dto/create-token.dto";
import type { UpdateTokenDto } from "./dto/update-token.dto";
import { Token } from "./entities/token.entity";

@Injectable()
export class TokenService {
	constructor(
		@InjectRepository(Token)
		private readonly tokenRepository: Repository<Token>,
		private readonly i18nService: I18nService<I18nTranslations>,
	) {}

	create(dto: CreateTokenDto): Promise<Token> {
		const token = this.tokenRepository.create(dto as unknown as Partial<Token>);
		return this.tokenRepository.save(token);
	}

	findAll(): Promise<Token[]> {
		return this.tokenRepository.find({ relations: { userDevice: true } });
	}

	findByUser(userId: number): Promise<Token[]> {
		return this.tokenRepository.find({ where: { userId } });
	}

	async findOne(id: number): Promise<Token> {
		const token = await this.tokenRepository.findOne({
			where: { id },
			relations: { userDevice: true },
		});
		if (!token)
			throw new NotFoundException(this.i18nService.t(`error.TOKEN.NOT_FOUND`));
		return token;
	}

	async findByToken(token: string): Promise<Token | null> {
		return this.tokenRepository.findOne({ where: { token } });
	}

	async update(id: number, dto: UpdateTokenDto): Promise<Token> {
		const token = await this.findOne(id);
		Object.assign(token, dto);
		return this.tokenRepository.save(token);
	}

	async remove(id: number): Promise<void> {
		const token = await this.findOne(id);
		await this.tokenRepository.softRemove(token);
	}
}
