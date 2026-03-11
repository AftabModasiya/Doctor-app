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
export class JwtRefreshStrategy extends PassportStrategy(
	Strategy,
	"jwt-refresh",
) {
	constructor(
		configService: ConfigService<IEnvironmentVariables>,
		private readonly JWTService: JWTService,
		private readonly authService: AuthService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.getOrThrow<string>("JWT_REFRESH_SECRET"),
			passReqToCallback: true,
			audience: getTokenAudience().REFRESH_TOKEN,
		});
	}

	validate(request: Request) {
		const bearerToken = request?.headers?.authorization;

		if (!bearerToken) return;

		const [_, refreshToken] = bearerToken.split(" ");

		const decodedTokenPayload =
			this.JWTService.verifyRefreshToken(refreshToken);

		return this.authService.validateUserToken(decodedTokenPayload, {
			token: refreshToken,
			tokenType: TokenType.REFRESH,
		});
	}
}
