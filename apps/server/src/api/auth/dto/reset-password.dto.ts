import { createZodDto } from "nestjs-zod";
import { getPasswordLength } from "src/shared/constants/app.constants";
import { z } from "zod";

export const ResetPasswordSchema = z.object({
	newPassword: z
		.string()
		.min(getPasswordLength().MIN)
		.max(getPasswordLength().MAX),
});

export class ResetPasswordDto extends createZodDto(ResetPasswordSchema) {}
