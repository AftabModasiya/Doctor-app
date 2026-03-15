import { Controller, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JWTAuthGuard } from "src/shared/guards/jwt-auth.guard";

@UseGuards(JWTAuthGuard)
@ApiBearerAuth()
@Controller("web-authn-challenge")
export class WebAuthnChallengeController {}
