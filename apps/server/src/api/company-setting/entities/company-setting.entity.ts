import { BaseEntity } from "src/common/entities/base.entity";
import type { Relation } from "typeorm";
import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Company } from "../../company/entities/company.entity";

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
	@ManyToOne(
		() => Company,
		(company: Company) => company.settings,
	)
	@JoinColumn({ name: "company_id" })
	company!: Relation<Company>;
}
