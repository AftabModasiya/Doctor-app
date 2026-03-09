import { Column, Entity, Index, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../../common/entities/base.entity";
import type { Doctor } from "../../doctor/entities/doctor.entity";
import type { Patient } from "../../patient/entities/patient.entity";
import type { UserDevice } from "../../user-device/entities/user-device.entity";

export enum Gender {
	MALE = "male",
	FEMALE = "female",
	OTHER = "other",
}

@Entity("user")
export class User extends BaseEntity {
	@Column()
	name!: string;

	@Column({ type: "enum", enum: Gender, nullable: true })
	gender!: Gender | null;

	@Column({ type: "int", nullable: true })
	age!: number | null;

	@Index("idx_user_email")
	@Column({ unique: true })
	email!: string;

	@Column()
	password!: string;

	@Column({ name: "country_code", type: "varchar", length: 10, nullable: true })
	countryCode!: string | null;

	@Index("idx_user_mobile")
	@Column({ type: "varchar", nullable: true })
	mobile!: string | null;

	// ---- Relations ----
	@OneToOne("Patient", (patient: Patient) => patient.user)
	patient!: Patient;

	@OneToOne("Doctor", (doctor: Doctor) => doctor.user)
	doctor!: Doctor;

	@OneToMany("UserDevice", (device: UserDevice) => device.user)
	devices!: UserDevice[];
}
