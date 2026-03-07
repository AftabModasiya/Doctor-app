import { Injectable } from "@nestjs/common";

@Injectable()
export class CompanySettingService {
	create() {
		return "This action adds a new companySetting";
	}

	findAll() {
		return `This action returns all companySetting`;
	}

	findOne(id: number) {
		return `This action returns a #${id} companySetting`;
	}

	update(id: number) {
		return `This action updates a #${id} companySetting`;
	}

	remove(id: number) {
		return `This action removes a #${id} companySetting`;
	}
}
