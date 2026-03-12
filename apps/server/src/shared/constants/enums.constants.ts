export enum Gender {
	MALE = "male",
	FEMALE = "female",
	OTHER = "other",
}

export enum BloodGroup {
	A_POSITIVE = "A+",
	A_NEGATIVE = "A-",
	B_POSITIVE = "B+",
	B_NEGATIVE = "B-",
	AB_POSITIVE = "AB+",
	AB_NEGATIVE = "AB-",
	O_POSITIVE = "O+",
	O_NEGATIVE = "O-",
}

export enum PatientStatus {
	ACTIVE = "active",
	INACTIVE = "inactive",
}

export enum TokenType {
	ACCESS = "access",
	REFRESH = "refresh",
	RESET_PASSWORD = "reset_password",
	VERIFY_EMAIL = "verify_email",
}

export enum WebAuthnChallengeType {
	REGISTER = "register",
	AUTHENTICATE = "authenticate",
}
