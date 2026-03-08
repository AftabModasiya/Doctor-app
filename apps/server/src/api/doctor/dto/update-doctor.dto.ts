import { createZodDto } from "nestjs-zod";
import { CreateDoctorSchema } from "./create-doctor.dto";

export const UpdateDoctorSchema = CreateDoctorSchema.partial();

export class UpdateDoctorDto extends createZodDto(UpdateDoctorSchema) {}
