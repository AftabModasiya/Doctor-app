import * as crypto from "node:crypto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { I18nTranslations } from "generated/i18n.generated";
import { I18nService } from "nestjs-i18n";
import { DataSource, Repository } from "typeorm";
import { User } from "../user/entities/user.entity";
import { UserService } from "../user/user.service";
import type { CreateDoctorDto } from "./dto/create-doctor.dto";
import type { UpdateDoctorDto } from "./dto/update-doctor.dto";
import { Doctor } from "./entities/doctor.entity";
// import { SpecializationService } from "../specialization/specialization.service";
// import { DegreeService } from "../degree/degree.service";

@Injectable()
export class DoctorService {
	constructor(
		@InjectRepository(Doctor)
		private readonly doctorRepository: Repository<Doctor>,
		private readonly userService: UserService,
		// private readonly specializationService: SpecializationService,
		// private readonly degreeService: DegreeService,
		private readonly dataSource: DataSource,
		private readonly i18nService: I18nService<I18nTranslations>,
	) {}

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

			return savedDoctor;
		});
	}

	async findAll() {
		const doctors = await this.doctorRepository.find({
			relations: {
				user: true,
				company: true,
				specializations: true,
				degrees: true,
			},
		});
		return {
			list: doctors,
			count: doctors.length,
		};
	}

	async findAllDoctorMetadata() {
		const [list, count] = await this.doctorRepository.findAndCount({
			select: { id: true, user: { id: true, name: true } },
			relations: { user: true },
		});
		return { list, count };
	}

	async findOne(id: number): Promise<Doctor> {
		const doctor = await this.doctorRepository.findOne({
			where: { id },
			relations: {
				user: true,
				company: true,
				specializations: true,
				degrees: true,
			},
		});
		if (!doctor)
			throw new NotFoundException(this.i18nService.t(`error.DOCTOR.NOT_FOUND`));

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
			if (dto.graduationDate !== undefined)
				doctor.graduationDate = new Date(dto.graduationDate);
			if (dto.companyId !== undefined) doctor.companyId = dto.companyId;

			// if (dto.specializationId !== undefined) {
			// 	this.specializationService.update(doctor)
			// 	doctor.specializations = [{ id: dto.specializationId } as any];
			// }
			// if (dto.degreeId !== undefined) {
			// 	doctor.degrees.push({ id: dto.degreeId });
			// }

			await manager.save(Doctor, doctor);

			return doctor;
		});
	}

	async remove(id: number) {
		const doctor = await this.findOne(id);
		await this.doctorRepository.softRemove(doctor);
		await this.userService.remove(doctor.userId);
	}

	countDoctorByCompanyId(companyId: number) {
		return this.doctorRepository.count({ where: { companyId } });
	}
}
