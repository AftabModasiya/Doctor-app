import { BaseEntity } from "src/database/entities/base.entity";
import { Entity, Column } from "typeorm";

@Entity("companies")
export class CompanyEntity extends BaseEntity {
	@Column({ type: "varchar", length: 255, nullable: true })
	name!: string;

	@Column({ type: "text", nullable: true })
	address!: string;

	@Column({
		type: "numeric",
		precision: 10,
		scale: 7,
		nullable: true,
	})
	latitude?: number;

	@Column({
		type: "numeric",
		precision: 10,
		scale: 7,
		nullable: true,
	})
	longitude?: number;

	@Column({
		type: "varchar",
		length: 500,
		nullable: true,
	})
	logo?: string;
}
