import { createZodDto } from "nestjs-zod";
import { CreateCompanySettingSchema } from "./create-company-setting.dto";

export const UpdateCompanySettingSchema = CreateCompanySettingSchema.partial();

export class UpdateCompanySettingDto extends createZodDto(UpdateCompanySettingSchema) { }
