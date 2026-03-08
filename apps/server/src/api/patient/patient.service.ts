import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Patient } from "./entities/patient.entity";
import type { CreatePatientDto } from "./dto/create-patient.dto";
import type { UpdatePatientDto } from "./dto/update-patient.dto";

@Injectable()
export class PatientService {
	constructor(
		@InjectRepository(Patient)
		private readonly patientRepository: Repository<Patient>,
	) {}

	create(dto: CreatePatientDto): Promise<Patient> {
		const patient = this.patientRepository.create(dto);
		return this.patientRepository.save(patient);
	}

	findAll(): Promise<Patient[]> {
		return this.patientRepository.find({ relations: ["user", "company"] });
	}

	async findOne(id: number): Promise<Patient> {
		const patient = await this.patientRepository.findOne({
			where: { id },
			relations: ["user", "company"],
		});
		if (!patient) throw new NotFoundException(`Patient #${id} not found`);
		return patient;
	}

	async update(id: number, dto: UpdatePatientDto): Promise<Patient> {
		const patient = await this.findOne(id);
		Object.assign(patient, dto);
		return this.patientRepository.save(patient);
	}

	async remove(id: number): Promise<void> {
		const patient = await this.findOne(id);
		await this.patientRepository.softRemove(patient);
	}
}
