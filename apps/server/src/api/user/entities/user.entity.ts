import { Passkey } from "src/api/passkey/entities/passkey.entity";
import { WebAuthnChallenge } from "src/api/web-authn-challenge/entities/web-authn-challenge.entity";
import { BaseEntity } from "src/common/entities/base.entity";
import { Gender } from "src/shared/constants/enums.constants";
import type { Relation } from "typeorm";
import { Column, Entity, Index, OneToMany, OneToOne } from "typeorm";
import { Doctor } from "../../doctor/entities/doctor.entity";
import { Patient } from "../../patient/entities/patient.entity";
import { UserDevice } from "../../user-device/entities/user-device.entity";

@Entity("user")
export class User extends BaseEntity {
	@Column()
	name!: string;

	@Column({ type: "enum", enum: Gender, nullable: true })
	gender!: Gender | null;

	@Column({ type: "int", nullable: true })
	age!: number | null;

	@Index("idx_user_email")
	@Column({ unique: true })
	email!: string;

	@Column()
	password!: string;

	@Column({ type: "varchar", length: 10, nullable: true })
	countryCode!: string | null;

	@Index("idx_user_mobile")
	@Column({ type: "varchar", nullable: true })
	mobile!: string | null;

	// ---- Relations ----
	@OneToOne(
		() => Patient,
		(patient: Patient) => patient.user,
	)
	patient!: Relation<Patient>;

	@OneToOne(
		() => Doctor,
		(doctor: Doctor) => doctor.user,
	)
	doctor!: Relation<Doctor>;

	@OneToMany(
		() => UserDevice,
		(device: UserDevice) => device.user,
	)
	devices!: Relation<UserDevice[]>;

	@OneToMany(
		() => Passkey,
		(passkey) => passkey.user,
	)
	passkeys!: Relation<Passkey[]>;

	@OneToMany(
		() => WebAuthnChallenge,
		(challenge: WebAuthnChallenge) => challenge.user,
	)
	webAuthnChallenges!: Relation<WebAuthnChallenge[]>;
}
