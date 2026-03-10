import { BaseEntity } from "src/common/entities/base.entity";
import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
} from "typeorm";
import type { Company } from "../../company/entities/company.entity";
import type { MedicinePrescription } from "../../medicine-prescription/entities/medicine-prescription.entity";

@Entity("medicines")
export class Medicine extends BaseEntity {
	@Column()
	name!: string;

	@Index("idx_medicines_company_id")
	@Column({ name: "company_id" })
	companyId!: number;

	// ---- Relations ----
	@ManyToOne("Company", (company: Company) => company.patients)
	@JoinColumn({ name: "company_id" })
	company!: Company;

	@OneToMany("MedicinePrescription", (mp: MedicinePrescription) => mp.medicine)
	medicinePrescriptions!: MedicinePrescription[];
}
