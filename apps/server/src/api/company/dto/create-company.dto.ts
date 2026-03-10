import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const CreateCompanySchema = z.object({
	name: z.string().trim().min(1).max(255),
	address: z.string().trim().min(1),
	latitude: z.coerce.number().min(-90).max(90).optional(),
	longitude: z.coerce.number().min(-180).max(180).optional(),
	logo: z.url().optional(),
});

export class CreateCompanyDto extends createZodDto(CreateCompanySchema) { }
