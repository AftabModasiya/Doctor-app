import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, FindOneOptions, Repository } from "typeorm";
import { WebAuthnChallenge } from "./entities/web-authn-challenge.entity";

@Injectable()
export class WebAuthnChallengeService {
	constructor(
		@InjectRepository(WebAuthnChallenge)
		private readonly webAuthnChallengeRepo: Repository<WebAuthnChallenge>,
	) {}

	create(data: DeepPartial<WebAuthnChallenge>): Promise<WebAuthnChallenge> {
		const challenge = this.webAuthnChallengeRepo.create(data);
		return this.webAuthnChallengeRepo.save(challenge);
	}

	findOneByQuery(query: FindOneOptions<WebAuthnChallenge>) {
		return this.webAuthnChallengeRepo.findOne(query);
	}
}
