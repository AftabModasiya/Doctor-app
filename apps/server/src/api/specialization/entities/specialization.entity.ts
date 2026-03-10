import { BaseEntity } from "src/common/entities/base.entity";
import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToMany,
	ManyToOne,
} from "typeorm";
import { Company } from "../../company/entities/company.entity";
import { Doctor } from "../../doctor/entities/doctor.entity";

@Entity("specializations")
export class Specialization extends BaseEntity {
	@Column()
	name!: string;

	@Index("idx_specializations_company_id")
	@Column({ name: "company_id" })
	companyId!: number;

	// ---- Relations ----
	@ManyToOne(
		() => Company,
		(company: Company) => company.doctors,
	)
	@JoinColumn({ name: "company_id" })
	company!: Company;

	@ManyToMany(
		() => Doctor,
		(doctor: Doctor) => doctor.specializations,
	)
	doctors!: Doctor[];
}
