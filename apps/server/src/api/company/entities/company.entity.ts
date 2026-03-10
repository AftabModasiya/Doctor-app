import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { CompanySetting } from "../../company-setting/entities/company-setting.entity";
import { Doctor } from "../../doctor/entities/doctor.entity";
import { Patient } from "../../patient/entities/patient.entity";

@Entity("companies")
export class Company extends BaseEntity {
	@Column({ type: "varchar", length: 255, nullable: true })
	name!: string;

	@Column({ type: "text", nullable: true })
	address!: string;

	@Column({
		type: "numeric",
		precision: 10,
		scale: 7,
		nullable: true,
	})
	latitude?: number;

	@Column({
		type: "numeric",
		precision: 10,
		scale: 7,
		nullable: true,
	})
	longitude?: number;

	@Column({
		type: "varchar",
		length: 500,
		nullable: true,
	})
	logo?: string;

	// ---- Relations ----
	@OneToMany(
		() => Patient,
		(patient: Patient) => patient.company,
	)
	patients!: Patient[];

	@OneToMany(
		() => Doctor,
		(doctor: Doctor) => doctor.company,
	)
	doctors!: Doctor[];

	@OneToMany(
		() => CompanySetting,
		(setting: CompanySetting) => setting.company,
	)
	settings!: CompanySetting[];

	@OneToMany(
		() => Doctor,
		(doctor: Doctor) => doctor.company,
	)
	prescriptions!: Doctor[];
}
