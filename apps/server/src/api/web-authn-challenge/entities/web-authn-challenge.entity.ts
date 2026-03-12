import { User } from "src/api/user/entities/user.entity";
import { BaseEntity } from "src/common/entities/base.entity";
import { WebAuthnChallengeType } from "src/shared/constants/enums.constants";
import type { Relation } from "typeorm";
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from "typeorm";

@Entity("web_authn_challenges")
export class WebAuthnChallenge extends BaseEntity {
	@Column({ type: "text" })
	challenge!: string;

	@Column({ type: "enum", enum: WebAuthnChallengeType })
	type!: WebAuthnChallengeType;

	@Column({ type: "timestamp" })
	expiresAt!: Date;

	@ManyToOne(
		() => User,
		(user: User) => user.webAuthnChallenges,
	)
	@JoinColumn()
	user!: Relation<User>;

	@RelationId((challenge: WebAuthnChallenge) => challenge.user)
	userId!: number;
}
