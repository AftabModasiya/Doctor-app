import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const CreateMedicinePrescriptionSchema = z.object({
    medicineId: z.coerce.number().int().positive(),
    prescriptionId: z.coerce.number().int().positive(),
});

export class CreateMedicinePrescriptionDto extends createZodDto(CreateMedicinePrescriptionSchema) { }
