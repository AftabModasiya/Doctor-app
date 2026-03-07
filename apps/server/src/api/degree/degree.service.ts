import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Degree } from './entities/degree.entity';
import type { CreateDegreeDto } from './dto/create-degree.dto';
import type { UpdateDegreeDto } from './dto/update-degree.dto';

@Injectable()
export class DegreeService {
	constructor(
		@InjectRepository(Degree)
		private readonly degreeRepository: Repository<Degree>,
	) { }

	create(dto: CreateDegreeDto): Promise<Degree> {
		const degree = this.degreeRepository.create(dto);
		return this.degreeRepository.save(degree);
	}

	findAll(): Promise<Degree[]> {
		return this.degreeRepository.find();
	}

	findByCompany(companyId: number): Promise<Degree[]> {
		return this.degreeRepository.find({ where: { companyId } });
	}

	async findOne(id: number): Promise<Degree> {
		const degree = await this.degreeRepository.findOne({ where: { id } });
		if (!degree) throw new NotFoundException(`Degree #${id} not found`);
		return degree;
	}

	async update(id: number, dto: UpdateDegreeDto): Promise<Degree> {
		const degree = await this.findOne(id);
		Object.assign(degree, dto);
		return this.degreeRepository.save(degree);
	}

	async remove(id: number): Promise<void> {
		const degree = await this.findOne(id);
		await this.degreeRepository.softRemove(degree);
	}
}
