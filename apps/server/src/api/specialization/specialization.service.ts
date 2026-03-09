import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import type { CreateSpecializationDto } from "./dto/create-specialization.dto";
import type { UpdateSpecializationDto } from "./dto/update-specialization.dto";
import { Specialization } from "./entities/specialization.entity";

@Injectable()
export class SpecializationService {
	constructor(
		@InjectRepository(Specialization)
		private readonly specializationRepository: Repository<Specialization>,
	) {}

	create(dto: CreateSpecializationDto): Promise<Specialization> {
		const specialization = this.specializationRepository.create(dto);
		return this.specializationRepository.save(specialization);
	}

	findAll(): Promise<Specialization[]> {
		return this.specializationRepository.find();
	}

	findByCompany(companyId: number): Promise<Specialization[]> {
		return this.specializationRepository.find({ where: { companyId } });
	}

	async findOne(id: number): Promise<Specialization> {
		const specialization = await this.specializationRepository.findOne({
			where: { id },
		});
		if (!specialization)
			throw new NotFoundException(`Specialization #${id} not found`);
		return specialization;
	}

	async update(
		id: number,
		dto: UpdateSpecializationDto,
	): Promise<Specialization> {
		const specialization = await this.findOne(id);
		Object.assign(specialization, dto);
		return this.specializationRepository.save(specialization);
	}

	async remove(id: number): Promise<void> {
		const specialization = await this.findOne(id);
		await this.specializationRepository.softRemove(specialization);
	}
}
