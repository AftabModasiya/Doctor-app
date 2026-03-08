import { createZodDto } from "nestjs-zod";
import { CreateMedicinePrescriptionSchema } from "./create-medicine-prescription.dto";

export const UpdateMedicinePrescriptionSchema =
	CreateMedicinePrescriptionSchema.partial();

export class UpdateMedicinePrescriptionDto extends createZodDto(
	UpdateMedicinePrescriptionSchema,
) {}
