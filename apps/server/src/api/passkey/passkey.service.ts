import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import {
	generateRegistrationOptions,
	verifyRegistrationResponse,
	// generateAuthenticationOptions,
	// verifyAuthenticationResponse,
} from "@simplewebauthn/server";
import { WebAuthnChallengeType } from "src/shared/constants/enums.constants";
import { FIVE_MINUTES } from "src/shared/constants/variable.constants";
// import { UserService } from "../user/user.service";
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
		// private readonly userService: UserService,
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
			userId: user.id,
			challenge: options.challenge,
			type: WebAuthnChallengeType.REGISTER,
			expiresAt: new Date(Date.now() + FIVE_MINUTES),
		});

		return options;
	}

	async verifyRegistration(user: ICurrentUser, body: any) {
		const challenge = await this.webAuthnChallengeService.findOneByQuery({
			where: { userId: user.id, type: WebAuthnChallengeType.REGISTER },
			order: { createdAt: "DESC" },
		});

		if (!challenge) {
			throw new Error("No registration challenge found");
		}

		const verification = await verifyRegistrationResponse({
			response: body,
			expectedChallenge: challenge.challenge,
			expectedOrigin: this.configService.getOrThrow<string>("BASE_URL"),
			expectedRPID: this.configService.getOrThrow<string>("RP_ID"),
		});

		if (!verification.verified) {
			throw new Error("Passkey registration failed");
		}

		const { credential, credentialDeviceType, credentialBackedUp } =
			verification.registrationInfo;

		await this.passkeyRepo.save({
			userId: user.id,
			credentialId: credential.id,
			publicKey: credential.publicKey,
			counter: credential.counter,
			deviceType: credentialDeviceType,
			backedUp: credentialBackedUp,
			transports: credential.transports,
			webAuthnUserId: String(user.id),
		});

		return { success: true };
	}

	// async generateAuthenticationOptions(user: User) {
	// 	const passkeys = await this.passkeyRepo.find({
	// 		where: { userId: user.id },
	// 	});

	// 	const options = await generateAuthenticationOptions({
	// 		rpID,
	// 		allowCredentials: passkeys.map((p) => ({
	// 			id: p.credentialId,
	// 			transports: p.transports ?? undefined,
	// 		})),
	// 		userVerification: "preferred",
	// 	});

	// 	await this.challengeRepo.save({
	// 		userId: user.id,
	// 		challenge: options.challenge,
	// 		type: "authentication",
	// 		expiresAt: new Date(Date.now() + 5 * 60 * 1000),
	// 	});

	// 	return options;
	// }

	// async verifyAuthentication(user: User, body: any) {
	// 	const challenge = await this.challengeRepo.findOne({
	// 		where: { userId: user.id, type: "authentication" },
	// 		order: { createdAt: "DESC" },
	// 	});

	// 	const passkey = await this.passkeyRepo.findOne({
	// 		where: { credentialId: body.id },
	// 	});

	// 	const verification = await verifyAuthenticationResponse({
	// 		response: body,
	// 		expectedChallenge: challenge!.challenge,
	// 		expectedOrigin: origin,
	// 		expectedRPID: rpID,
	// 		authenticator: {
	// 			credentialID: passkey!.credentialId,
	// 			credentialPublicKey: passkey!.publicKey,
	// 			counter: passkey!.counter,
	// 		},
	// 	});

	// 	if (!verification.verified) {
	// 		throw new Error("Authentication failed");
	// 	}

	// 	passkey!.counter = verification.authenticationInfo.newCounter;
	// 	passkey!.lastUsedAt = new Date();

	// 	await this.passkeyRepo.save(passkey!);

	// 	return { success: true };
	// }
}
