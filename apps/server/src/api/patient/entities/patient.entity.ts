import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
} from "typeorm";
import { BaseEntity } from "../../common/entities/base.entity";
import type { User } from "../../user/entities/user.entity";
import type { Company } from "../../company/entities/company.entity";
import type { Prescription } from "../../prescription/entities/prescription.entity";

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
