import { createZodDto } from "nestjs-zod";
import { CreateCompanySchema } from "./create-company.dto";

export const UpdateCompanySchema = CreateCompanySchema.partial();

export class UpdateCompanyDto extends createZodDto(UpdateCompanySchema) {}
