import { createZodDto } from "nestjs-zod";
import { z } from "zod";
import { Gender } from "src/shared/constants/enums.constants";

export const CreateUserSchema = z.object({
    name: z.string().trim().min(1).max(255),
    gender: z.nativeEnum(Gender).optional(),
    age: z.coerce.number().int().min(0).max(150).optional(),
    email: z.email().toLowerCase(),
    password: z.string().min(8).max(128),
    countryCode: z.string().trim().min(1).max(10).optional(),
    mobile: z.string().trim().min(1).max(20).optional(),
});

export class CreateUserDto extends createZodDto(CreateUserSchema) { }
