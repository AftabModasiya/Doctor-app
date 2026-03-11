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
import { Token } from "../../token/entities/token.entity";
import { User } from "../../user/entities/user.entity";

@Entity("user_devices")
export class UserDevice extends BaseEntity {
	@Column({ type: "text", nullable: true })
	deviceToken!: string | null;

	@Column({ type: "varchar", nullable: true })
	deviceIp!: string | null;

	@Index("idx_user_devices_user_id")
	@Column()
	userId!: number;

	// ---- Relations ----
	@ManyToOne(
		() => User,
		(user: User) => user.devices,
	)
	@JoinColumn()
	user!: Relation<User>;

	@OneToMany(
		() => Token,
		(tokens: Token) => tokens.userDevice,
	)
	token!: Relation<Token[]>;
}
