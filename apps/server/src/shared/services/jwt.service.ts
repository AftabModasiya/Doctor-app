import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import type { StringValue } from "ms";
import { getTokenAudience } from "../constants/app.constants";
import { IEnvironmentVariables } from "../interfaces/env.interface";
import { ITokenPayload } from "../interfaces/token.interface";

@Injectable()
export class JWTService {
	constructor(
		private readonly configService: ConfigService<IEnvironmentVariables>,
		private readonly jwtService: JwtService,
	) {}

	generateAccessToken(payload: ITokenPayload) {
		return this.jwtService.sign(payload, {
			secret: this.configService.getOrThrow<string>("JWT_ACCESS_SECRET"),
			expiresIn:
				this.configService.getOrThrow<StringValue>("JWT_ACCESS_EXPIRY"),
			audience: getTokenAudience().ACCESS_TOKEN,
		});
	}

	verifyAccessToken(accessToken: string) {
		return this.jwtService.verify<ITokenPayload & { exp: number }>(
			accessToken,
			{
				secret: this.configService.getOrThrow<string>("JWT_ACCESS_SECRET"),
				audience: getTokenAudience().ACCESS_TOKEN,
			},
		);
	}

	generateRefreshToken(payload: ITokenPayload) {
		return this.jwtService.sign(payload, {
			secret: this.configService.getOrThrow<string>("JWT_REFRESH_SECRET"),
			expiresIn:
				this.configService.getOrThrow<StringValue>("JWT_REFRESH_EXPIRY"),
			audience: getTokenAudience().REFRESH_TOKEN,
		});
	}

	verifyRefreshToken(refreshToken: string) {
		return this.jwtService.verify<ITokenPayload>(refreshToken, {
			secret: this.configService.getOrThrow<string>("JWT_REFRESH_SECRET"),
			audience: getTokenAudience().REFRESH_TOKEN,
		});
	}

	generateForgotPasswordToken(payload: ITokenPayload) {
		return this.jwtService.sign(payload, {
			secret: this.configService.getOrThrow<string>(
				"JWT_FORGOT_PASSWORD_SECRET",
			),
			expiresIn: this.configService.getOrThrow<StringValue>(
				"JWT_FORGOT_PASSWORD_EXPIRY",
			),
			audience: getTokenAudience().FORGOT_PASSWORD_TOKEN,
		});
	}

	verifyForgotPasswordToken(forgotPasswordToken: string) {
		return this.jwtService.verify<ITokenPayload>(forgotPasswordToken, {
			secret: this.configService.getOrThrow<string>(
				"JWT_FORGOT_PASSWORD_SECRET",
			),
			audience: getTokenAudience().FORGOT_PASSWORD_TOKEN,
		});
	}
}
