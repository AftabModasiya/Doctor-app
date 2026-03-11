import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WebAuthnChallenge } from "./entities/web-authn-challenge.entity";
import { WebAuthnChallengeController } from "./web-authn-challenge.controller";
import { WebAuthnChallengeService } from "./web-authn-challenge.service";

@Module({
	imports: [TypeOrmModule.forFeature([WebAuthnChallenge])],
	controllers: [WebAuthnChallengeController],
	providers: [WebAuthnChallengeService],
	exports: [WebAuthnChallengeService],
})
export class WebAuthnChallengeModule {}
