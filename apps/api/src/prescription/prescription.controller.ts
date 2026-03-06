import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import type { CreatePrescriptionDto } from "./dto/create-prescription.dto";
import type { UpdatePrescriptionDto } from "./dto/update-prescription.dto";
import { PrescriptionService } from "./prescription.service";

@Controller("prescription")
export class PrescriptionController {
	constructor(private readonly prescriptionService: PrescriptionService) {}

	@Post()
	create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
		return this.prescriptionService.create(createPrescriptionDto);
	}

	@Get()
	findAll() {
		return this.prescriptionService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.prescriptionService.findOne(+id);
	}

	@Patch(":id")
	update(
		@Param("id") id: string,
		@Body() updatePrescriptionDto: UpdatePrescriptionDto,
	) {
		return this.prescriptionService.update(+id, updatePrescriptionDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.prescriptionService.remove(+id);
	}
}
