import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { User } from '../user/entities/user.entity';
import type { CreatePatientDto } from './dto/create-patient.dto';
import type { UpdatePatientDto } from './dto/update-patient.dto';
import * as crypto from 'crypto';
import { Gender } from 'src/shared/constants/enums.constants';

@Injectable()
export class PatientService {
	constructor(
		@InjectRepository(Patient)
		private readonly patientRepository: Repository<Patient>,
		private readonly dataSource: DataSource,
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) { }

	async create(dto: CreatePatientDto): Promise<Patient> {
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

			// 2. Create Patient
			const patient = manager.create(Patient, {
				userId: savedUser.id,
				companyId: dto.companyId,
				address: dto.address,
				bloodGroup: dto.bloodGroup,
				status: dto.status,
			});
			const savedPatient = await manager.save(patient);

			return this.findOne(savedPatient.id, manager);
		});
	}

	async findAll() {
		const patients = await this.patientRepository.find({ relations: ['user', 'company'] });
		return {
			patients,
			message: 'Patients retrieved successfully',
			count: patients.length,
		};
	}

	async findOne(id: number, manager?: any): Promise<Patient> {
		const repo = manager ? manager.getRepository(Patient) : this.patientRepository;
		const patient = await repo.findOne({
			where: { id },
			relations: ['user', 'company'],
		});
		if (!patient) throw new NotFoundException(`Patient #${id} not found`);

		return patient;
	}

	async update(id: number, dto: UpdatePatientDto): Promise<Patient> {
		const patient = await this.findOne(id);

		return this.dataSource.transaction(async (manager) => {
			// Update User if user fields are present
			if (dto.name || dto.email || dto.mobile || dto.age || dto.gender) {
				const userUpdate: Partial<User> = {};
				if (dto.name) userUpdate.name = dto.name;
				if (dto.email) userUpdate.email = dto.email;
				if (dto.mobile) userUpdate.mobile = dto.mobile;
				if (dto.age) userUpdate.age = dto.age;
				if (dto.gender) userUpdate.gender = dto.gender;

				await manager.update(User, patient.userId, userUpdate);
			}

			// Update Patient if patient fields are present
			const patientUpdate: Partial<Patient> = {};
			if (dto.address !== undefined) patientUpdate.address = dto.address;
			if (dto.bloodGroup !== undefined) patientUpdate.bloodGroup = dto.bloodGroup;
			if (dto.status !== undefined) patientUpdate.status = dto.status;

			if (Object.keys(patientUpdate).length > 0) {
				await manager.update(Patient, id, patientUpdate);
			}

			return this.findOne(id, manager);
		});
	}

	async remove(id: number) {
		const patient = await this.findOne(id);
		await this.patientRepository.softRemove(patient);
		await this.userRepository.softDelete(patient.userId);
		return {
			message: 'Patient deleted successfully',
		};
	}
}
