import { createZodDto } from "nestjs-zod";
import { z } from "zod";
import { ResetPasswordSchema } from "./reset-password.dto";

export const ChangePasswordSchema = ResetPasswordSchema.extend({
	oldPassword: z.string().min(1),
});

export class ChangePasswordDto extends createZodDto(ChangePasswordSchema) {}
