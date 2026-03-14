import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

export abstract class BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn({ nullable: true })
	updatedAt!: Date;

	@DeleteDateColumn({ nullable: true })
	deletedAt!: Date | null;

	@Column({ type: "int", nullable: true })
	createdBy!: number | null;

	@Column({ type: "int", nullable: true })
	updatedBy!: number | null;
}
