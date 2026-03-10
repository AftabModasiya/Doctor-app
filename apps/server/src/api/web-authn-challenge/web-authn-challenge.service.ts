import { Injectable } from "@nestjs/common";
import { CreateWebAuthnChallengeDto } from "./dto/create-web-authn-challenge.dto";
import { UpdateWebAuthnChallengeDto } from "./dto/update-web-authn-challenge.dto";

@Injectable()
export class WebAuthnChallengeService {
	create(createWebAuthnChallengeDto: CreateWebAuthnChallengeDto) {
		return "This action adds a new webAuthnChallenge";
	}

	findAll() {
		return `This action returns all webAuthnChallenge`;
	}

	findOne(id: number) {
		return `This action returns a #${id} webAuthnChallenge`;
	}

	update(id: number, updateWebAuthnChallengeDto: UpdateWebAuthnChallengeDto) {
		return `This action updates a #${id} webAuthnChallenge`;
	}

	remove(id: number) {
		return `This action removes a #${id} webAuthnChallenge`;
	}
}
