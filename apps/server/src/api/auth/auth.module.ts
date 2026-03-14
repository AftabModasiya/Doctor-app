import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JWTService } from "src/shared/services/jwt.service";
import { TokenModule } from "../token/token.module";
import { UserModule } from "../user/user.module";
import { UserDeviceModule } from "../user-device/user-device.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { JwtForgotStrategy } from "./strategies/jwt-forgot.strategy";
import { JwtRefreshStrategy } from "./strategies/jwt-refresh.strategy";
import { LocalAdminStrategy } from "./strategies/local-admin.strategy";

@Module({
	imports: [
		TokenModule,
		UserModule,
		UserDeviceModule,
		PassportModule,
		JwtModule,
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		JWTService,
		LocalAdminStrategy,
		JwtStrategy,
		JwtRefreshStrategy,
		JwtForgotStrategy,
	],
})
export class AuthModule {}
