import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalAdminStrategy extends PassportStrategy(
	Strategy,
	"local-admin",
) {
	constructor(private readonly authService: AuthService) {
		super({ usernameField: "email", passwordField: "password" });
	}

	validate(email: string, password: string) {
		return this.authService.verifyUserCredentialsForAdmin(email, password);
	}
}
