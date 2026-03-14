import { createZodDto } from "nestjs-zod";
import { TokenType } from "src/shared/constants/enums.constants";
import { z } from "zod";

export const CreateTokenSchema = z.object({
	token: z.string().min(1),
	tokenType: z.enum(TokenType),
	expiresAt: z.iso.datetime(),
	userDeviceId: z.coerce.number().int().positive(),
	userId: z.coerce.number().int().positive(),
});

export class CreateTokenDto extends createZodDto(CreateTokenSchema) {}
