import { Body, Controller, Patch, UseGuards } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { CurrentUser } from "src/shared/decorators/current-user.decorator";
import { LocalAdminAuthGuard } from "src/shared/guards/local-admin-auth.guard";
import type { ICurrentUser } from "src/shared/interfaces/current-user.interface";
import { AuthService } from "./auth.service";
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
}
