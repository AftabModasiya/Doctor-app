import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const CreatePrescriptionSchema = z.object({
	patientId: z.coerce.number().int().positive(),
	doctorId: z.coerce.number().int().positive(),
	companyId: z.coerce.number().int().positive(),
	diagnosis: z.string().trim().optional(),
	notes: z.string().trim().optional(),
	medicinePrescriptions: z
		.array(
			z.object({
				medicineId: z.coerce.number().int().positive(),
				quantity: z.coerce.number().int().positive(),
			}),
		)
		.min(1),
});

export class CreatePrescriptionDto extends createZodDto(
	CreatePrescriptionSchema,
) {}
