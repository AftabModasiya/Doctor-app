import { createZodDto } from "nestjs-zod";
import { CreateDegreeSchema } from "./create-degree.dto";

export const UpdateDegreeSchema = CreateDegreeSchema.partial();

export class UpdateDegreeDto extends createZodDto(UpdateDegreeSchema) {}
