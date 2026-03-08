import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const CreateCompanySettingSchema = z.object({
	companyId: z.coerce.number().int().positive(),
	key: z.string().trim().min(1).max(255),
	value: z.string().optional(),
	label: z.string().trim().min(1).max(255).optional(),
});

export class CreateCompanySettingDto extends createZodDto(
	CreateCompanySettingSchema,
) {}
