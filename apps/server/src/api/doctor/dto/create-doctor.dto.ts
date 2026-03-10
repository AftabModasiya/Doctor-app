import { createZodDto } from "nestjs-zod";
import { z } from "zod";
import { Gender } from "src/shared/constants/enums.constants";

export const CreateDoctorSchema = z.object({
    // User fields
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    mobile: z.string().optional(),
    gender: z.nativeEnum(Gender).optional(),
    age: z.coerce.number().int().positive().optional(),

    // Doctor fields
    companyId: z.coerce.number().int().positive(),
    experience: z.coerce.number().int().nonnegative().optional(),
    graduationDate: z.iso.datetime().optional(),

    // Relation IDs
    specializationId: z.coerce.number().int().positive(),
    degreeId: z.coerce.number().int().positive(),
});

export class CreateDoctorDto extends createZodDto(CreateDoctorSchema) {}
