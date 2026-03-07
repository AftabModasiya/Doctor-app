import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const CreatePrescriptionSchema = z.object({
    patientId: z.coerce.number().int().positive(),
    doctorId: z.coerce.number().int().positive(),
    companyId: z.coerce.number().int().positive(),
});

export class CreatePrescriptionDto extends createZodDto(CreatePrescriptionSchema) { }
