import { Injectable } from "@nestjs/common";
import { CreatePasskeyDto } from "./dto/create-passkey.dto";
import { UpdatePasskeyDto } from "./dto/update-passkey.dto";

@Injectable()
export class PasskeyService {
	create(createPasskeyDto: CreatePasskeyDto) {
		return "This action adds a new passkey";
	}

	findAll() {
		return `This action returns all passkey`;
	}

	findOne(id: number) {
		return `This action returns a #${id} passkey`;
	}

	update(id: number, updatePasskeyDto: UpdatePasskeyDto) {
		return `This action updates a #${id} passkey`;
	}

	remove(id: number) {
		return `This action removes a #${id} passkey`;
	}
}
