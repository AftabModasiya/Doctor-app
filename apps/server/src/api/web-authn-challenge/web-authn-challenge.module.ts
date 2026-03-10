import { Module } from "@nestjs/common";
import { WebAuthnChallengeController } from "./web-authn-challenge.controller";
import { WebAuthnChallengeService } from "./web-authn-challenge.service";

@Module({
	controllers: [WebAuthnChallengeController],
	providers: [WebAuthnChallengeService],
})
export class WebAuthnChallengeModule {}
