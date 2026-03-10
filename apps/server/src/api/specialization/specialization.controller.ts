import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { CreateSpecializationDto } from "./dto/create-specialization.dto";
import { UpdateSpecializationDto } from "./dto/update-specialization.dto";
import { SpecializationService } from "./specialization.service";

@Controller("specialization")
export class SpecializationController {
	constructor(private readonly specializationService: SpecializationService) {}

	@Post()
	create(@Body() createSpecializationDto: CreateSpecializationDto) {
		return this.specializationService.create(createSpecializationDto);
	}

	@Get()
	findAll() {
		return this.specializationService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.specializationService.findOne(+id);
	}

	@Patch(":id")
	update(
		@Param("id") id: string,
		@Body() updateSpecializationDto: UpdateSpecializationDto,
	) {
		return this.specializationService.update(+id, updateSpecializationDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.specializationService.remove(+id);
	}
}
