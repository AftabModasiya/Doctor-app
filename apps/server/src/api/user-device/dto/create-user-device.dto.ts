import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const CreateUserDeviceSchema = z.object({
    deviceToken: z.string().trim().min(1),
    deviceIp: z.string().regex(/^(\d{1,3}\.){3}\d{1,3}$|^[0-9a-fA-F:]+$/).optional(),
    userId: z.coerce.number().int().positive(),
});

export class CreateUserDeviceDto extends createZodDto(CreateUserDeviceSchema) { }
