import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import {
	generateAuthenticationOptions,
	generateRegistrationOptions,
	verifyAuthenticationResponse,
	verifyRegistrationResponse,
} from "@simplewebauthn/server";
import { I18nTranslations } from "generated/i18n.generated";
import { I18nService } from "nestjs-i18n";
import { getQuerySortOrder } from "src/shared/constants/app.constants";
import { WebAuthnChallengeType } from "src/shared/constants/enums.constants";
import { FIVE_MINUTES } from "src/shared/constants/variable.constants";
import { ICurrentUser } from "src/shared/interfaces/current-user.interface";
import { IEnvironmentVariables } from "src/shared/interfaces/env.interface";
import { Repository } from "typeorm";
import { WebAuthnChallengeService } from "../web-authn-challenge/web-authn-challenge.service";
import { Passkey } from "./entities/passkey.entity";

@Injectable()
export class PasskeyService {
	constructor(
		@InjectRepository(Passkey)
		private readonly passkeyRepo: Repository<Passkey>,
		private readonly webAuthnChallengeService: WebAuthnChallengeService,
		private readonly configService: ConfigService<IEnvironmentVariables>,
		private readonly i18nService: I18nService<I18nTranslations>,
	) {}

	async generateRegistrationOptions(user: ICurrentUser) {
		const options = await generateRegistrationOptions({
			rpName: this.configService.getOrThrow<string>("APP_NAME"),
			rpID: this.configService.getOrThrow<string>("RP_ID"),
			userID: new TextEncoder().encode(String(user.id)),
			userDisplayName: user.name,
			userName: user.email,
			authenticatorSelection: {
				residentKey: "required",
				userVerification: "preferred",
			},
		});

		await this.webAuthnChallengeService.create({
			user: { id: user.id },
			challenge: options.challenge,
			type: WebAuthnChallengeType.REGISTER,
			expiresAt: new Date(Date.now() + FIVE_MINUTES),
		});

		return options;
	}

	async verifyRegistration(user: ICurrentUser, body: any) {
		const challenge = await this.webAuthnChallengeService.findOneByQuery({
			where: { userId: user.id, type: WebAuthnChallengeType.REGISTER },
			order: { createdAt: getQuerySortOrder().DESC },
		});

		if (!challenge)
			throw new NotFoundException(
				this.i18nService.t("error.WEBAUTHNCHALLANGE.NOT_FOUND"),
			);

		const expectedOrigins = JSON.parse(
			this.configService.getOrThrow<string>("RP_ORIGINS") || "[]",
		) as string[];

		const verification = await verifyRegistrationResponse({
			response: body,
			expectedChallenge: challenge.challenge,
			expectedOrigin: expectedOrigins,
			expectedRPID: this.configService.getOrThrow<string>("RP_ID"),
		});

		if (!verification.verified)
			throw new BadRequestException(
				this.i18nService.t("error.PASS_KEY.REGISTRATION_FAILED"),
			);

		const { credential, credentialDeviceType, credentialBackedUp } =
			verification.registrationInfo;

		await this.passkeyRepo.save({
			user: { id: user.id },
			credentialId: credential.id,
			publicKey: credential.publicKey,
			counter: credential.counter,
			deviceType: credentialDeviceType,
			backedUp: credentialBackedUp,
			transports: credential.transports,
		});

		return { verificationSuccess: true };
	}

	async generateAuthenticationOptions(user: ICurrentUser) {
		const passkeys = await this.passkeyRepo.find({
			where: { userId: user.id },
		});

		const options = await generateAuthenticationOptions({
			rpID: this.configService.getOrThrow<string>("RP_ID"),
			allowCredentials: passkeys.map((p) => ({
				id: p.credentialId,
				transports: p.transports ?? undefined,
			})),
			userVerification: "preferred",
		});

		await this.webAuthnChallengeService.create({
			user: { id: user.id },
			challenge: options.challenge,
			type: WebAuthnChallengeType.AUTHENTICATE,
			expiresAt: new Date(Date.now() + FIVE_MINUTES),
		});

		return options;
	}

	async verifyAuthentication(user: ICurrentUser, body: any) {
		const challenge = await this.webAuthnChallengeService.findOneByQuery({
			where: { userId: user.id, type: WebAuthnChallengeType.AUTHENTICATE },
			order: { createdAt: getQuerySortOrder().DESC },
		});

		if (!challenge)
			throw new NotFoundException(
				this.i18nService.t("error.WEBAUTHNCHALLANGE.NOT_FOUND"),
			);

		const passkey = await this.passkeyRepo.findOne({
			where: { credentialId: body.id },
		});

		if (!passkey)
			throw new NotFoundException(
				this.i18nService.t("error.PASS_KEY.NOT_FOUND"),
			);

		const expectedOrigins = JSON.parse(
			this.configService.getOrThrow<string>("RP_ORIGINS") || "[]",
		) as string[];

		const verification = await verifyAuthenticationResponse({
			response: body,
			expectedChallenge: challenge.challenge,
			expectedOrigin: expectedOrigins,
			expectedRPID: this.configService.getOrThrow<string>("RP_ID"),
			credential: {
				id: passkey.credentialId,
				publicKey: new Uint8Array(passkey.publicKey),
				counter: passkey.counter,
			},
		});

		if (!verification.verified)
			throw new BadRequestException(
				this.i18nService.t("error.PASS_KEY.AUTHENTICATION_FAILED"),
			);

		passkey.counter = verification.authenticationInfo.newCounter;
		passkey.lastUsedAt = new Date();

		await this.passkeyRepo.save(passkey);

		return { success: true };
	}
}
