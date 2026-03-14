import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { getTokenAudience } from "src/shared/constants/app.constants";
import { TokenType } from "src/shared/constants/enums.constants";
import { IEnvironmentVariables } from "src/shared/interfaces/env.interface";
import { JWTService } from "src/shared/services/jwt.service";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtForgotStrategy extends PassportStrategy(
	Strategy,
	"jwt-forgot",
) {
	constructor(
		readonly configService: ConfigService<IEnvironmentVariables>,
		private readonly JWTService: JWTService,
		private readonly authService: AuthService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.getOrThrow<string>(
				"JWT_FORGOT_PASSWORD_SECRET",
			),
			passReqToCallback: true,
			audience: getTokenAudience().FORGOT_PASSWORD_TOKEN,
		});
	}

	validate(request: Request) {
		const bearerToken = request?.headers?.authorization;

		if (!bearerToken) return;

		const [_, forgotPasswordToken] = bearerToken.split(" ");

		const decodedTokenPayload =
			this.JWTService.verifyForgotPasswordToken(forgotPasswordToken);

		return this.authService.validateUserToken(decodedTokenPayload, {
			token: forgotPasswordToken,
			tokenType: TokenType.RESET_PASSWORD,
		});
	}
}
