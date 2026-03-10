import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { CreatePasskeyDto } from "./dto/create-passkey.dto";
import { UpdatePasskeyDto } from "./dto/update-passkey.dto";
import { PasskeyService } from "./passkey.service";

@Controller("passkey")
export class PasskeyController {
	constructor(private readonly passkeyService: PasskeyService) {}

	@Post()
	create(@Body() createPasskeyDto: CreatePasskeyDto) {
		return this.passkeyService.create(createPasskeyDto);
	}

	@Get()
	findAll() {
		return this.passkeyService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.passkeyService.findOne(+id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updatePasskeyDto: UpdatePasskeyDto) {
		return this.passkeyService.update(+id, updatePasskeyDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.passkeyService.remove(+id);
	}
}
