import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

export abstract class BaseEntity {
	@PrimaryGeneratedColumn("increment")
	id!: string;

	@CreateDateColumn({
		type: "timestamptz",
		default: () => "CURRENT_TIMESTAMP",
	})
	createdAt!: Date;

	@UpdateDateColumn({
		type: "timestamptz",
		default: () => "CURRENT_TIMESTAMP",
	})
	updatedAt!: Date;

	@DeleteDateColumn({
		type: "timestamptz",
		nullable: true,
	})
	deletedAt?: Date;

	@Column({ type: "int", nullable: true })
	createdBy?: string;

	@Column({ type: "int", nullable: true })
	updatedBy?: string;
}
