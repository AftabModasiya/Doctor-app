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
import { Category } from "../../category/entities/category.entity";
import { Company } from "../../company/entities/company.entity";
import { MedicinePrescription } from "../../medicine-prescription/entities/medicine-prescription.entity";

@Entity("medicines")
export class Medicine extends BaseEntity {
	@Column()
	name!: string;

	@Index("idx_medicines_company_id")
	@Column({ name: "company_id" })
	companyId!: number;

	@Index("idx_medicines_category_id")
	@Column({ name: "category_id" })
	categoryId!: number;

	// ---- Relations ----
	@ManyToOne(
		() => Company,
		(company: Company) => company.patients,
	)
	@JoinColumn({ name: "company_id" })
	company!: Relation<Company>;

	@ManyToOne(
		() => Category,
		(category: Category) => category.medicines,
	)
	@JoinColumn({ name: "category_id" })
	category!: Relation<Category>;

	@OneToMany(
		() => MedicinePrescription,
		(mp: MedicinePrescription) => mp.medicine,
	)
	medicinePrescriptions!: Relation<MedicinePrescription[]>;
}
