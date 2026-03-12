import { Body, Controller, Delete, Patch, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { I18nTranslations } from "generated/i18n.generated";
import { I18n, I18nContext } from "nestjs-i18n";
import { CurrentUser } from "src/shared/decorators/current-user.decorator";
import { JWTAuthGuard } from "src/shared/guards/jwt-auth.guard";
import { JWTRefreshAuthGuard } from "src/shared/guards/jwt-refresh-auth.guard";
import { LocalAdminAuthGuard } from "src/shared/guards/local-admin-auth.guard";
import type { ICurrentUser } from "src/shared/interfaces/current-user.interface";
import { ITokenPayload } from "src/shared/interfaces/token.interface";
import { AuthService } from "./auth.service";
import { ChangePasswordDto } from "./dto/change-passwod.dto";
import { LoginAdminDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: "Admin Login with email and password" })
	@UseGuards(LocalAdminAuthGuard)
	@Patch("admin-login")
	async adminLogin(
		@Body() payload: LoginAdminDto,
		@CurrentUser() user: ICurrentUser,
	) {
		return await this.authService.loginAdmin(user.id, payload.email, {
			deviceToken: payload.deviceToken,
			deviceIp: payload.deviceIp,
		});
	}

	@ApiOperation({ summary: "Get a new access token using refresh token" })
	@UseGuards(JWTRefreshAuthGuard)
	@ApiBearerAuth()
	@Patch("refresh")
	async refreshToken(
		@I18n() i18n: I18nContext<I18nTranslations>,
		@CurrentUser() user: ICurrentUser,
	) {
		const tokenPayload: ITokenPayload = {
			email: user.email,
			id: user.id,
		};

		const accessToken = await this.authService.refreshUser(
			tokenPayload,
			user.id,
		);

		return {
			message: i18n.t("success.AUTH.LOGIN_SUCCESSFUL"),
			accessToken,
		};
	}

	@ApiOperation({ summary: "Change password for authenticated user" })
	@UseGuards(JWTAuthGuard)
	@ApiBearerAuth()
	@Patch("change-password")
	async changePassword(
		@I18n() i18n: I18nContext<I18nTranslations>,
		@Body() body: ChangePasswordDto,
		@CurrentUser() user: ICurrentUser,
	) {
		const { newPassword, oldPassword } = body;
		const { id } = user;

		await this.authService.processPasswordChangeRequest(
			newPassword,
			oldPassword,
			id,
		);

		return {
			message: i18n.t("success.AUTH.PASSWORD_RESET"),
		};
	}

	@ApiOperation({ summary: "Logout and invalidate tokens" })
	@UseGuards(JWTAuthGuard)
	@ApiBearerAuth()
	@Delete("logout")
	async logout(
		@I18n() i18n: I18nContext<I18nTranslations>,
		@CurrentUser() user: ICurrentUser,
	) {
		await this.authService.logout(user);

		return {
			message: i18n.t("success.AUTH.LOGGED_OUT"),
		};
	}
}
