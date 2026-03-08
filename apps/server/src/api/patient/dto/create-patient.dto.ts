import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const CreatePatientSchema = z.object({
    userId: z.coerce.number().int().positive(),
    companyId: z.coerce.number().int().positive(),
    address: z.string().trim().min(1).optional(),
});

export class CreatePatientDto extends createZodDto(CreatePatientSchema) { }
