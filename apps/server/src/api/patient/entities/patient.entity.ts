import { BaseEntity } from "src/common/entities/base.entity";
import {
	BloodGroup,
	PatientStatus,
} from "src/shared/constants/enums.constants";
import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
} from "typeorm";
import type { Company } from "../../company/entities/company.entity";
import type { Prescription } from "../../prescription/entities/prescription.entity";
import type { User } from "../../user/entities/user.entity";

@Entity("patients")
export class Patient extends BaseEntity {
	@Index("idx_patients_user_id")
	@Column({ name: "user_id" })
	userId!: number;

	@Index("idx_patients_company_id")
	@Column({ name: "company_id" })
	companyId!: number;

	@Column({ type: "text", nullable: true })
	address!: string | null;

	@Column({
		type: "enum",
		enum: BloodGroup,
		name: "blood_group",
		nullable: true,
	})
	bloodGroup!: BloodGroup | null;

	@Column({
		type: "enum",
		enum: PatientStatus,
		default: PatientStatus.ACTIVE,
	})
	status!: PatientStatus;

	// ---- Relations ----
	@OneToOne("User", (user: User) => user.patient)
	@JoinColumn({ name: "user_id" })
	user!: User;

	@ManyToOne("Company", (company: Company) => company.patients)
	@JoinColumn({ name: "company_id" })
	company!: Company;

	@OneToMany(
		"Prescription",
		(prescription: Prescription) => prescription.patient,
	)
	prescriptions!: Prescription[];
}
