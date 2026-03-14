import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const CreateCategorySchema = z.object({
	name: z.string().trim().min(1).max(255),
	companyId: z.coerce.number().int().positive(),
});

export class CreateCategoryDto extends createZodDto(CreateCategorySchema) {}
