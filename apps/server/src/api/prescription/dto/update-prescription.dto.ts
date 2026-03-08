import { createZodDto } from "nestjs-zod";
import { CreatePrescriptionSchema } from "./create-prescription.dto";

export const UpdatePrescriptionSchema = CreatePrescriptionSchema.partial();

export class UpdatePrescriptionDto extends createZodDto(
	UpdatePrescriptionSchema,
) {}
