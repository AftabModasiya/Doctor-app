import { createZodDto } from "nestjs-zod";
import { CreateUserDeviceSchema } from "./create-user-device.dto";

export const UpdateUserDeviceSchema = CreateUserDeviceSchema.partial();

export class UpdateUserDeviceDto extends createZodDto(UpdateUserDeviceSchema) { }
