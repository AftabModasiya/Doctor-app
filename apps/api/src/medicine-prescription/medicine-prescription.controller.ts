import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import type { CreateMedicinePrescriptionDto } from "./dto/create-medicine-prescription.dto";
import type { UpdateMedicinePrescriptionDto } from "./dto/update-medicine-prescription.dto";
import { MedicinePrescriptionService } from "./medicine-prescription.service";

@Controller("medicine-prescription")
export class MedicinePrescriptionController {
	constructor(
		private readonly medicinePrescriptionService: MedicinePrescriptionService,
	) { }

	@Post()
	create(@Body() createMedicinePrescriptionDto: CreateMedicinePrescriptionDto) {
		return this.medicinePrescriptionService.create(
			createMedicinePrescriptionDto,
		);
	}

	@Get()
	findAll() {
		return this.medicinePrescriptionService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.medicinePrescriptionService.findOne(+id);
	}

	@Patch(":id")
	update(
		@Param("id") id: string,
		@Body() updateMedicinePrescriptionDto: UpdateMedicinePrescriptionDto,
	) {
		return this.medicinePrescriptionService.update(
			+id,
			updateMedicinePrescriptionDto,
		);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.medicinePrescriptionService.remove(+id);
	}
}
