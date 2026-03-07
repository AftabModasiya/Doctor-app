import { createZodDto } from "nestjs-zod";
import { CreateMedicineSchema } from "./create-medicine.dto";

export const UpdateMedicineSchema = CreateMedicineSchema.partial();

export class UpdateMedicineDto extends createZodDto(UpdateMedicineSchema) { }
