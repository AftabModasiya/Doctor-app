import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { getTokenAudience } from "src/shared/constants/app.constants";
import { TokenType } from "src/shared/constants/enums.constants";
import { ICurrentUser } from "src/shared/interfaces/current-user.interface";
import { IEnvironmentVariables } from "src/shared/interfaces/env.interface";
import { ITokenPayload } from "src/shared/interfaces/token.interface";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		readonly configService: ConfigService<IEnvironmentVariables>,
		private readonly authService: AuthService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.getOrThrow<string>("JWT_ACCESS_SECRET"),
			passReqToCallback: true,
			audience: getTokenAudience().ACCESS_TOKEN,
		});
	}

	async validate(
		request: Request,
		payload: ITokenPayload,
	): Promise<ICurrentUser> {
		const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

		if (!accessToken) {
			throw new UnauthorizedException("Invalid token");
		}

		return this.authService.validateUserToken(payload, {
			token: accessToken,
			tokenType: TokenType.ACCESS,
		});
	}
}
