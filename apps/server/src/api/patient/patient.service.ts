import * as crypto from "node:crypto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { I18nTranslations } from "generated/i18n.generated";
import { I18nService } from "nestjs-i18n";
import { DataSource, Repository } from "typeorm";
import { User } from "../user/entities/user.entity";
import { UserService } from "../user/user.service";
import type { CreatePatientDto } from "./dto/create-patient.dto";
import type { UpdatePatientDto } from "./dto/update-patient.dto";
import { Patient } from "./entities/patient.entity";

@Injectable()
export class PatientService {
	constructor(
		@InjectRepository(Patient)
		private readonly patientRepository: Repository<Patient>,
		private readonly dataSource: DataSource,
		private readonly userService: UserService,
		private readonly i18nService: I18nService<I18nTranslations>,
	) {}

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

			return savedPatient;
		});
	}

	async findAll() {
		const patients = await this.patientRepository.find({
			relations: { user: true, company: true },
		});
		return {
			list: patients,
			count: patients.length,
		};
	}

	async findOne(id: number): Promise<Patient> {
		const patient = await this.patientRepository.findOne({
			where: { id },
			relations: { user: true, company: true },
		});
		if (!patient)
			throw new NotFoundException(
				this.i18nService.t(`error.PATIENT.NOT_FOUND`),
			);

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
			if (dto.bloodGroup !== undefined)
				patientUpdate.bloodGroup = dto.bloodGroup;
			if (dto.status !== undefined) patientUpdate.status = dto.status;

			if (Object.keys(patientUpdate).length > 0) {
				await manager.update(Patient, id, patientUpdate);
			}

			return patient;
		});
	}

	async remove(id: number) {
		const patient = await this.findOne(id);
		await this.patientRepository.softRemove(patient);
		await this.userService.remove(patient.userId);
	}

	countPatentByCompanyId(companyId: number) {
		return this.patientRepository.count({ where: { companyId } });
	}

	async getPatientGrowthData(
		companyId: number,
		startDate?: string,
		endDate?: string,
	) {
		// If no dates provided, use 12 months (6 months back + current month + 5 months forward)
		const today = new Date();

		const parsedStartDate = startDate ? new Date(startDate) : undefined;
		const parsedEndDate = endDate ? new Date(endDate) : undefined;

		const finalStartDate =
			parsedStartDate || new Date(today.getFullYear(), today.getMonth() - 6, 1);

		const finalEndDate =
			parsedEndDate || new Date(today.getFullYear(), today.getMonth() + 6, 0);

		// Fetch all patients for the company
		const patients = await this.patientRepository
			.createQueryBuilder("patient")
			.select("patient.createdAt")
			.where("patient.companyId = :companyId", { companyId })
			.andWhere("patient.createdAt BETWEEN :start AND :end", {
				start: finalStartDate,
				end: finalEndDate,
			})
			.getMany();

		// Generate all months in the date range
		const monthsData = this.generateMonthsInRange(finalStartDate, finalEndDate);
		const monthlyData = new Map<string, { label: string; count: number }>();

		// Initialize all months with 0
		monthsData.forEach(({ label }) => {
			monthlyData.set(label, { label, count: 0 });
		});

		// Count patients by month
		patients.forEach((patient) => {
			const monthLabel = this.getMonthLabelWithYear(patient.createdAt);
			if (monthlyData.has(monthLabel)) {
				const data = monthlyData.get(monthLabel);
				if (data) {
					data.count += 1;
				}
			}
		});

		// Build response in order
		const labels = monthsData.map(({ label }) => label);
		const data = monthsData.map(
			({ label }) => monthlyData.get(label)?.count ?? 0,
		);

		return {
			labels,
			data,
		};
	}

	private generateMonthsInRange(
		startDate: Date,
		endDate: Date,
	): Array<{ label: string; date: Date }> {
		const result: Array<{ label: string; date: Date }> = [];
		const monthNames = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		];

		const current = new Date(startDate.getFullYear(), startDate.getMonth(), 1);

		while (current <= endDate) {
			const label = monthNames[current.getMonth()];

			result.push({
				label,
				date: new Date(current),
			});

			current.setMonth(current.getMonth() + 1);
		}

		return result;
	}

	private getMonthLabelWithYear(date: Date): string {
		const monthNames = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		];
		return monthNames[date.getMonth()];
	}
}
