import { BaseEntity } from "src/common/entities/base.entity";
import { TokenType } from "src/shared/constants/enums.constants";
import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToOne,
} from "typeorm";
import { User } from "../../user/entities/user.entity";
import { UserDevice } from "../../user-device/entities/user-device.entity";

@Entity("tokens")
export class Token extends BaseEntity {
	@Index("idx_tokens_token")
	@Column({ unique: true, type: "text" })
	token!: string;

	@Column({
		name: "token_type",
		type: "enum",
		enum: TokenType,
		default: TokenType.ACCESS,
	})
	tokenType!: TokenType;

	@Column({ name: "expires_at", type: "timestamptz" })
	expiresAt!: Date;

	@Index("idx_tokens_user_device_id")
	@Column({ name: "user_device_id" })
	userDeviceId!: number;

	@Index("idx_tokens_user_id")
	@Column({ name: "user_id" })
	userId!: number;

	// ---- Relations ----
	@OneToOne(
		() => UserDevice,
		(device: UserDevice) => device.token,
	)
	@JoinColumn({ name: "user_device_id" })
	userDevice!: UserDevice;

	@ManyToOne(
		() => User,
		(user: User) => user.devices,
	)
	@JoinColumn({ name: "user_id" })
	user!: User;
}
