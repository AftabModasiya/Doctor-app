import { Column, Entity, Index, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "../../common/entities/base.entity";
import type { Company } from "../../company/entities/company.entity";

@Index("idx_company_setting_company_key", ["companyId", "key"])
@Entity("company_settings")
export class CompanySetting extends BaseEntity {
	@Column({ name: "company_id" })
	companyId!: number;

	@Column()
	key!: string;

	@Column({ type: "text", nullable: true })
	value!: string | null;

	@Column({ type: "varchar", nullable: true })
	label!: string | null;

	// ---- Relations ----
	@ManyToOne("Company", (company: Company) => company.settings)
	@JoinColumn({ name: "company_id" })
	company!: Company;
}
