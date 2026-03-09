import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import type { CreateDoctorDto } from "./dto/create-doctor.dto";
import type { UpdateDoctorDto } from "./dto/update-doctor.dto";
import { Doctor } from "./entities/doctor.entity";

@Injectable()
export class DoctorService {
	constructor(
		@InjectRepository(Doctor)
		private readonly doctorRepository: Repository<Doctor>,
	) {}

	create(dto: CreateDoctorDto): Promise<Doctor> {
		const doctor = this.doctorRepository.create(dto);
		return this.doctorRepository.save(doctor);
	}

	findAll(): Promise<Doctor[]> {
		return this.doctorRepository.find({
			relations: ["user", "company", "specializations", "degrees"],
		});
	}

	async findOne(id: number): Promise<Doctor> {
		const doctor = await this.doctorRepository.findOne({
			where: { id },
			relations: ["user", "company", "specializations", "degrees"],
		});
		if (!doctor) throw new NotFoundException(`Doctor #${id} not found`);
		return doctor;
	}

	async update(id: number, dto: UpdateDoctorDto): Promise<Doctor> {
		const doctor = await this.findOne(id);
		Object.assign(doctor, dto);
		return this.doctorRepository.save(doctor);
	}

	async remove(id: number): Promise<void> {
		const doctor = await this.findOne(id);
		await this.doctorRepository.softRemove(doctor);
	}
}
