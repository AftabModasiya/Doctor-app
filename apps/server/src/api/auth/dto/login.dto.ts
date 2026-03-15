import { createZodDto } from "nestjs-zod";
import { getPasswordLength } from "src/shared/constants/app.constants";
import { z } from "zod";

export const LoginAdminSchema = z.object({
	email: z.email(),
	password: z
		.string()
		.min(getPasswordLength().MIN)
		.max(getPasswordLength().MAX),
	deviceIp: z.string().optional(),
	deviceToken: z.string().optional(),
});

export class LoginAdminDto extends createZodDto(LoginAdminSchema) {}
