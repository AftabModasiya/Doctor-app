import { PartialType } from "@nestjs/swagger";
import { CreateWebAuthnChallengeDto } from "./create-web-authn-challenge.dto";

export class UpdateWebAuthnChallengeDto extends PartialType(
	CreateWebAuthnChallengeDto,
) {}
