import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const CreateDoctorSchema = z.object({
	userId: z.coerce.number().int().positive(),
	companyId: z.coerce.number().int().positive(),
	graduationDate: z.coerce.date().optional(),
});

export class CreateDoctorDto extends createZodDto(CreateDoctorSchema) {}
