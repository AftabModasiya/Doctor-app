import { createZodDto } from "nestjs-zod";
import { CreateTokenSchema } from "./create-token.dto";

export const UpdateTokenSchema = CreateTokenSchema.partial();

export class UpdateTokenDto extends createZodDto(UpdateTokenSchema) {}
