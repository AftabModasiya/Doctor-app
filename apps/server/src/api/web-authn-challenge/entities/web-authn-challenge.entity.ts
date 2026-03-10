import { User } from "src/api/user/entities/user.entity";
import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity("web_authn_challenges")
export class WebAuthnChallenge extends BaseEntity {
	@Column({ type: "text" })
	challenge!: string;

	@Column({ type: "text" })
	type!: "registration" | "authentication";

	@Column({ type: "timestamp" })
	expiresAt!: Date;

	@ManyToOne(() => User)
	@JoinColumn()
	user!: User;
}
