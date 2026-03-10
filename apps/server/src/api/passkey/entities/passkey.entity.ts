import { User } from "src/api/user/entities/user.entity";
import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from "typeorm";

@Entity("passkeys")
export class Passkey extends BaseEntity {
	@Column({ type: "text", unique: true })
	credentialId!: string;

	@Column({ type: "bytea" })
	publicKey!: Buffer;

	@Column({ type: "text" })
	webauthnUserId!: string;

	@Column({ type: "bigint", default: 0 })
	counter!: number;

	@Column({ type: "text", nullable: true })
	deviceType!: string | null;

	@Column({ type: "boolean", default: false })
	backedUp!: boolean;

	@Column({ type: "text", array: true, nullable: true })
	transports!: string[] | null;

	@Column({ type: "timestamp", nullable: true })
	lastUsedAt!: Date | null;

	@ManyToOne(
		() => User,
		(user) => user.passkey,
	)
	@JoinColumn()
	user!: User;

	@RelationId((passkey: Passkey) => passkey.user)
	userId!: number;
}
