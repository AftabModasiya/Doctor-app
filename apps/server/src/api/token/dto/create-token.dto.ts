import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const CreateTokenSchema = z.object({
	token: z.string().min(1),
	tokenType: z.enum(["access", "refresh", "reset_password", "verify_email"]),
	expiresAt: z.coerce.date(),
	userDeviceId: z.coerce.number().int().positive(),
	userId: z.coerce.number().int().positive(),
});

export class CreateTokenDto extends createZodDto(CreateTokenSchema) {}
