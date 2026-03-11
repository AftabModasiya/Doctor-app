import { BaseEntity } from "src/common/entities/base.entity";
import { TokenType } from "src/shared/constants/enums.constants";
import type { Relation } from "typeorm";
import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
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

	@Column({ type: "timestamptz", nullable: true })
	expiresAt!: Date | null;

	@Index("idx_tokens_user_device_id")
	@Column()
	userDeviceId!: number;

	@Index("idx_tokens_user_id")
	@Column()
	userId!: number;

	// ---- Relations ----
	@ManyToOne(
		() => UserDevice,
		(device: UserDevice) => device.token,
	)
	@JoinColumn()
	userDevice!: Relation<UserDevice>;

	@ManyToOne(
		() => User,
		(user: User) => user.devices,
	)
	@JoinColumn()
	user!: Relation<User>;
}
