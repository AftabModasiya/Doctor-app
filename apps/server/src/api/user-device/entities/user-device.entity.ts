import { BaseEntity } from "src/common/entities/base.entity";
import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToOne,
} from "typeorm";
import type { Token } from "../../token/entities/token.entity";
import type { User } from "../../user/entities/user.entity";

@Entity("user_devices")
export class UserDevice extends BaseEntity {
	@Column({ name: "device_token", type: "text" })
	deviceToken!: string;

	@Column({ name: "device_ip", type: "varchar", nullable: true })
	deviceIp!: string | null;

	@Index("idx_user_devices_user_id")
	@Column({ name: "user_id" })
	userId!: number;

	// ---- Relations ----
	@ManyToOne("User", (user: User) => user.devices)
	@JoinColumn({ name: "user_id" })
	user!: User;

	@OneToOne("Token", (token: Token) => token.userDevice, {
		cascade: ["insert", "soft-remove"],
	})
	token!: Token;
}
