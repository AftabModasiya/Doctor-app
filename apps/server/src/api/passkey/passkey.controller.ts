import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { CurrentUser } from "src/shared/decorators/current-user.decorator";
import { JWTAuthGuard } from "src/shared/guards/jwt-auth.guard";
import type { ICurrentUser } from "src/shared/interfaces/current-user.interface";
import { PasskeyService } from "./passkey.service";

@ApiBearerAuth()
@UseGuards(JWTAuthGuard)
@Controller("passkey")
export class PasskeyController {
	constructor(private readonly passkeyService: PasskeyService) {}

	@Post("register/options")
	generateRegisterOptions(@CurrentUser() user: ICurrentUser) {
		return this.passkeyService.generateRegistrationOptions(user);
	}

	@Post("register/verify")
	verifyRegister(@CurrentUser() user: ICurrentUser, @Body() body: any) {
		return this.passkeyService.verifyRegistration(user, body);
	}

	@Post("login/options")
	generateLoginOptions(@CurrentUser() user: ICurrentUser) {
		return this.passkeyService.generateAuthenticationOptions(user);
	}

	@Post("login/verify")
	verifyLogin(@CurrentUser() user: ICurrentUser, @Body() body: any) {
		return this.passkeyService.verifyAuthentication(user, body);
	}
}
