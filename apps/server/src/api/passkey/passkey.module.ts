import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WebAuthnChallengeModule } from "../web-authn-challenge/web-authn-challenge.module";
import { Passkey } from "./entities/passkey.entity";
import { PasskeyController } from "./passkey.controller";
import { PasskeyService } from "./passkey.service";

@Module({
	imports: [TypeOrmModule.forFeature([Passkey]), WebAuthnChallengeModule],
	controllers: [PasskeyController],
	providers: [PasskeyService],
})
export class PasskeyModule {}
