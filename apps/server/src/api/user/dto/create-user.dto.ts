import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const CreateUserSchema = z.object({
	name: z.string().trim().min(1).max(255),
	gender: z.enum(["male", "female", "other"]).optional(),
	age: z.coerce.number().int().min(0).max(150).optional(),
	email: z.string().trim().email().toLowerCase(),
	password: z.string().min(8).max(128),
	countryCode: z.string().trim().min(1).max(10).optional(),
	mobile: z.string().trim().min(1).max(20).optional(),
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
