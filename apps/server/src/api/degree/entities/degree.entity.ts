import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToMany,
	ManyToOne,
} from "typeorm";
import { BaseEntity } from "../../common/entities/base.entity";
import type { Company } from "../../company/entities/company.entity";
import type { Doctor } from "../../doctor/entities/doctor.entity";

@Entity("degrees")
export class Degree extends BaseEntity {
	@Column()
	name!: string;

	@Index("idx_degrees_company_id")
	@Column({ name: "company_id" })
	companyId!: number;

	// ---- Relations ----
	@ManyToOne("Company", (company: Company) => company.doctors)
	@JoinColumn({ name: "company_id" })
	company!: Company;

	@ManyToMany("Doctor", (doctor: Doctor) => doctor.degrees)
	doctors!: Doctor[];
}
