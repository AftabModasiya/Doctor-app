import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Token } from "./entities/token.entity";
import type { CreateTokenDto } from "./dto/create-token.dto";
import type { UpdateTokenDto } from "./dto/update-token.dto";

@Injectable()
export class TokenService {
	constructor(
		@InjectRepository(Token)
		private readonly tokenRepository: Repository<Token>,
	) {}

	create(dto: CreateTokenDto): Promise<Token> {
		const token = this.tokenRepository.create(dto as unknown as Partial<Token>);
		return this.tokenRepository.save(token);
	}

	findAll(): Promise<Token[]> {
		return this.tokenRepository.find({ relations: ["userDevice"] });
	}

	findByUser(userId: number): Promise<Token[]> {
		return this.tokenRepository.find({ where: { userId } });
	}

	async findOne(id: number): Promise<Token> {
		const token = await this.tokenRepository.findOne({
			where: { id },
			relations: ["userDevice"],
		});
		if (!token) throw new NotFoundException(`Token #${id} not found`);
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
