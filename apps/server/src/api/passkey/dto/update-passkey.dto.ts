import { PartialType } from "@nestjs/swagger";
import { CreatePasskeyDto } from "./create-passkey.dto";

export class UpdatePasskeyDto extends PartialType(CreatePasskeyDto) {}
