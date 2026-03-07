import { createZodDto } from "nestjs-zod";
import { CreateSpecializationSchema } from "./create-specialization.dto";

export const UpdateSpecializationSchema = CreateSpecializationSchema.partial();

export class UpdateSpecializationDto extends createZodDto(UpdateSpecializationSchema) { }
