import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { CreateWebAuthnChallengeDto } from "./dto/create-web-authn-challenge.dto";
import { UpdateWebAuthnChallengeDto } from "./dto/update-web-authn-challenge.dto";
import { WebAuthnChallengeService } from "./web-authn-challenge.service";

@Controller("web-authn-challenge")
export class WebAuthnChallengeController {
	constructor(
		private readonly webAuthnChallengeService: WebAuthnChallengeService,
	) {}

	@Post()
	create(@Body() createWebAuthnChallengeDto: CreateWebAuthnChallengeDto) {
		return this.webAuthnChallengeService.create(createWebAuthnChallengeDto);
	}

	@Get()
	findAll() {
		return this.webAuthnChallengeService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.webAuthnChallengeService.findOne(+id);
	}

	@Patch(":id")
	update(
		@Param("id") id: string,
		@Body() updateWebAuthnChallengeDto: UpdateWebAuthnChallengeDto,
	) {
		return this.webAuthnChallengeService.update(
			+id,
			updateWebAuthnChallengeDto,
		);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.webAuthnChallengeService.remove(+id);
	}
}
