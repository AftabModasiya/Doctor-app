import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import { User } from '../user/entities/user.entity';
import type { CreateDoctorDto } from './dto/create-doctor.dto';
import type { UpdateDoctorDto } from './dto/update-doctor.dto';
import * as crypto from 'crypto';

@Injectable()
export class DoctorService {
	constructor(
		@InjectRepository(Doctor)
		private readonly doctorRepository: Repository<Doctor>,
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		private readonly dataSource: DataSource,
	) { }

	async create(dto: CreateDoctorDto): Promise<Doctor> {
		return this.dataSource.transaction(async (manager) => {
			// 1. Create User
			const user = manager.create(User, {
				name: dto.name,
				email: dto.email,
				mobile: dto.mobile,
				age: dto.age,
				gender: dto.gender,
				password: crypto.randomUUID(), // Placeholder password
			});
			const savedUser = await manager.save(user);

			// 2. Create Doctor
			const doctor = manager.create(Doctor, {
				userId: savedUser.id,
				companyId: dto.companyId,
				experience: dto.experience,
				graduationDate: dto.graduationDate,
				specializations: [{ id: dto.specializationId }],
				degrees: [{ id: dto.degreeId }],
			});
			const savedDoctor = await manager.save(doctor);

			return this.findOne(savedDoctor.id, manager);
		});
	}

	async findAll() {
		const doctors = await this.doctorRepository.find({
			relations: ['user', 'company', 'specializations', 'degrees'],
		});
		return {
			doctors,
			message: 'Doctors retrieved successfully',
			count: doctors.length,
		};
	}

	async findOne(id: number, manager?: any): Promise<Doctor> {
		const repo = manager ? manager.getRepository(Doctor) : this.doctorRepository;
		const doctor = await repo.findOne({
			where: { id },
			relations: ['user', 'company', 'specializations', 'degrees'],
		});
		if (!doctor) throw new NotFoundException(`Doctor #${id} not found`);

		return doctor;
	}

	async update(id: number, dto: UpdateDoctorDto): Promise<Doctor> {
		const doctor = await this.findOne(id);

		return this.dataSource.transaction(async (manager) => {
			// Update User if user fields are present
			if (dto.name || dto.email || dto.mobile || dto.age || dto.gender) {
				const userUpdate: Partial<User> = {};
				if (dto.name) userUpdate.name = dto.name;
				if (dto.email) userUpdate.email = dto.email;
				if (dto.mobile) userUpdate.mobile = dto.mobile;
				if (dto.age) userUpdate.age = dto.age;
				if (dto.gender) userUpdate.gender = dto.gender;

				await manager.update(User, doctor.userId, userUpdate);
			}

			// Save the doctor side relational changes via .save() so many-to-many handles correctly
			if (dto.experience !== undefined) doctor.experience = dto.experience;
			if (dto.graduationDate !== undefined) doctor.graduationDate = new Date(dto.graduationDate);
			if (dto.companyId !== undefined) doctor.companyId = dto.companyId;

			if (dto.specializationId !== undefined) {
				doctor.specializations = [{ id: dto.specializationId } as any];
			}
			if (dto.degreeId !== undefined) {
				doctor.degrees = [{ id: dto.degreeId } as any];
			}

			await manager.save(Doctor, doctor);

			return this.findOne(id, manager);
		});
	}

	async remove(id: number) {
		const doctor = await this.findOne(id);
		await this.doctorRepository.softRemove(doctor);
		await this.userRepository.softDelete(doctor.userId);
		return {
			message: 'Doctor deleted successfully',
		};
	}
}
