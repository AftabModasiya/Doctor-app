import { createZodDto } from "nestjs-zod";
import { BloodGroup, Gender, PatientStatus } from "src/shared/constants/enums.constants";
import { z } from "zod";

export const CreatePatientSchema = z.object({
    // User fields
    name: z.string().trim().min(1).max(255),
    email: z.string().email().toLowerCase(),
    mobile: z.string().trim().min(1).max(20).optional(),
    age: z.coerce.number().int().min(0).max(150).optional(),
    gender: z.nativeEnum(Gender).optional(),

    // Patient fields
    companyId: z.coerce.number().int().positive(),
    address: z.string().trim().min(1).optional(),
    bloodGroup: z.nativeEnum(BloodGroup).optional(),
    status: z.nativeEnum(PatientStatus).default(PatientStatus.ACTIVE),
});

export class CreatePatientDto extends createZodDto(CreatePatientSchema) { }
