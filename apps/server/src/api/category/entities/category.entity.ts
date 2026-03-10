import { BaseEntity } from "src/common/entities/base.entity";
import type { Relation } from "typeorm";
import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
} from "typeorm";
import type { Company } from "../../company/entities/company.entity";
import type { Medicine } from "../../medicine/entities/medicine.entity";

@Entity("categories")
export class Category extends BaseEntity {
	@Column()
	name!: string;

	@Index("idx_categories_company_id")
	@Column({ name: "company_id" })
	companyId!: number;

	// ---- Relations ----
	@ManyToOne("Company", (company: Company) => company.patients)
	@JoinColumn({ name: "company_id" })
	company!: Relation<Company>;

	@OneToMany("Medicine", (medicine: Medicine) => medicine.category)
	medicines!: Medicine[];
}
